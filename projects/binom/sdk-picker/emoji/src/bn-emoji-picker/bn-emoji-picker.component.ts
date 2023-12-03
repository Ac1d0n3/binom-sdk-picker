import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component,AfterViewInit,OnInit,OnDestroy,NgZone, Input,Output, EventEmitter, ElementRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Subscription} from 'rxjs';
import { BnEmojiDataService } from './bn-emoji-data.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { BnEmojiData } from './bn-emoji-data.model';
import { BnEmojiCategory } from './bn-emoji-cat.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { BnProgressContentComponent } from '@binom/sdk-core/progress-content';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'bn-emoji-picker',
  templateUrl: './bn-emoji-picker.component.html',
  standalone: true,
  imports:[CommonModule, MatButtonModule,MatInputModule,TranslateModule,FormsModule, ReactiveFormsModule,CdkScrollableModule, ScrollingModule,BnProgressContentComponent, MatFormFieldModule ]
})
export class BnEmojiPickerComponent implements OnInit, AfterViewInit,OnDestroy{
  constructor( 
    private dataSvc:BnEmojiDataService,
    private zone : NgZone
    ) { }

  private _enableToolTips: boolean = false
  get enableToolTips():boolean {return this._enableToolTips}
  @Input() set enableToolTips(value:BooleanInput){ this._enableToolTips = coerceBooleanProperty(value); }

  private _cancelButton: boolean = false
  get cancelButton():boolean {return this._cancelButton}
  @Input() set cancelButton(value:BooleanInput){ this._cancelButton = coerceBooleanProperty(value); }

  @Input() translateTag:string = '';
  @Output() action = new EventEmitter<any>();

  Object = Object;
  emojis!:BnEmojiData;
  categories:any = [];
  currentcategory='history';
  isloading:boolean = true;
  private sub!: Subscription;

  searchInput: string = '';
  searchResults: BnEmojiCategory[] = [];

  currentEmoji!:BnEmojiCategory;
  maxArrayLength:number = 10;
  history: Array<BnEmojiCategory> = [];
  emojiTitlesList:any;
  wrapperOffset:number = 0;
  

  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;
  @ViewChildren("emojiTitle") emojiTitles!: QueryList<ElementRef>;

  emojis$!: any;
  ngOnInit(): void {
    this.sub = this.dataSvc.getData().subscribe((data: any[]) => this.loadData(data));
  }

  async loadData(data:any){
    this.emojis$ = data
    this.emojis$.then((result:any) => {
      this.emojis = result;
      this.isloading = false;
      this.getEmojiHistory();
    })
  }
  

  ngAfterViewInit(): void {

    this.scrollable.elementScrolled().subscribe(() => this.zone.run(()=>this.onScroll()));
    this.emojiTitlesList = this.emojiTitles.toArray()
    this.emojiTitles.changes.subscribe(item => {
      if(this.emojiTitles.toArray().length) {
        this.emojiTitlesList = this.emojiTitles.toArray()
      }
    })
  }

  onScroll() {
    if(this.emojiTitlesList){
      this.wrapperOffset = this.scrollable.getElementRef().nativeElement.getBoundingClientRect().top;
      this.emojiTitlesList.forEach((emojiGroup:ElementRef) => {
        const rect = emojiGroup.nativeElement.getBoundingClientRect();
        if (rect.top <= this.wrapperOffset ) {
          if(!this.clickScroll) 
            this.currentcategory = emojiGroup.nativeElement.innerText;
          if(this.currentcategory === emojiGroup.nativeElement.innerText){
            this.clickScroll = false;
          }
        }
      });
    }
  }
  
  searchEmojis(): void {
    if(this.searchInput !== ''){
      this.currentcategory = 'history';
      const searchTerms = this.searchInput.split(' ');
      let results: any[] = [];
      for (const category in this.emojis) {
        if (this.emojis.hasOwnProperty(category)) {
          const emojis = this.emojis[category];
          const filteredEmojis = emojis.filter((emoji:BnEmojiCategory) => {
            for (const term of searchTerms) {
              const searchRegex = new RegExp(term, 'i');
              if (searchRegex.test(emoji.name)) {
                return true;
              }
            }
            return false;
          });
          results = results.concat(filteredEmojis);
        }
      }
      this.searchResults = results;
    }
    
  }

  private useEmoji(){
    this.getEmojiHistory();
    this.setEmojiHistory();
  }

  private getEmojiHistory(){
    const storedData = localStorage.getItem('bn-emojis-history');
    if (storedData) { this.history = JSON.parse(storedData); } 
  }

  private setEmojiHistory(){
    let checkExists = this.history.findIndex((obj:BnEmojiCategory)=> obj === this.currentEmoji)
    if(checkExists === -1){
      this.history.push(this.currentEmoji);
      if (this.history.length > this.maxArrayLength) { this.history.shift(); }
      localStorage.setItem('bn-emojis-history', JSON.stringify(this.history));
    }
  }

  clickScroll:boolean = false;
  selectEmoji(category:string){
    if ( this.scrollable) {
      this.scrollable.getElementRef().nativeElement.scrollTop = 0
    }
    this.clickScroll = true;
    this.currentcategory = category
    const element = document.getElementById(category.toLowerCase().replace(' ', '_'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  fireAction(){
    this.useEmoji()
    this.action.emit({
      type: 'emoji',
      action: 'insert',
      values: this.currentEmoji
    })
  }

  cancel(){
    this.action.emit({
      type: 'emoji',
      action: 'cancel',
      values: null
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

