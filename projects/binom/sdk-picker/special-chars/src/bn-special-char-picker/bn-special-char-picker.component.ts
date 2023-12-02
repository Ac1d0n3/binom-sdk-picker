import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component,AfterViewInit,OnInit,OnDestroy,NgZone, Input,Output, EventEmitter, ElementRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Subscription} from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { BnSpecialCharsDataService } from './bn-special-chars-data.service';
import { BnSpecialCharData } from './bn-special-chars-data.model';
import { BnSpecialChar } from './bn-special-chars-char.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { BnProgressContentComponent } from '@binom/sdk-core/progress-content';
import { BnIconComponent } from '@binom/sdk-core/icons';

@Component({
  selector: 'bn-special-char-picker',
  templateUrl: './bn-special-char-picker.component.html',
  standalone: true,
  imports: [BnIconComponent,BnProgressContentComponent,MatButtonModule,MatInputModule,TranslateModule,FormsModule, ReactiveFormsModule,CdkScrollableModule, ScrollingModule ]
})
export class BnSpecialCharPickerComponent implements OnInit, AfterViewInit,OnDestroy{
  constructor( 
    private dataSvc:BnSpecialCharsDataService,
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
  specialchars!:BnSpecialCharData;

  currentcategory='history';
  isloading:boolean = true;
  private sub!: Subscription;

  searchInput: string = '';
  searchResults: BnSpecialChar[] = [];

  currentchar!:BnSpecialChar;
  maxArrayLength:number = 10;
  history: Array<BnSpecialChar> = [];
  charTitlesList:any;
  wrapperOffset:number = 0;
  

  @ViewChild(CdkScrollable) scrollable?: CdkScrollable;
  @ViewChildren("charTitle") charTitles?: QueryList<ElementRef>;

  specialchars$!: any;
  ngOnInit(): void {
    this.sub = this.dataSvc.getData().subscribe((data: any[]) => this.loadData(data));
  }

  async loadData(data:any){
    this.specialchars$ = data
    this.specialchars$.then((result:any) => {
      this.specialchars = result;
      this.isloading = false;
      this.getcharHistory();
    })
  }
  

  ngAfterViewInit(): void {
    if (this.scrollable && this.charTitles) {
      this.scrollable.elementScrolled().subscribe(() => this.zone.run(() => this.onScroll()));
      this.charTitlesList = this.charTitles.toArray();
      this.charTitles.changes.subscribe(item => {
        if (this.charTitles?.toArray().length) {
          this.charTitlesList = this.charTitles.toArray();
        }
      });
    }
  }

  onScroll() {
    if(this.charTitlesList && this.scrollable){
      this.wrapperOffset = this.scrollable.getElementRef().nativeElement.getBoundingClientRect().top;
      this.charTitlesList.forEach((charGroup:ElementRef) => {
        const rect = charGroup.nativeElement.getBoundingClientRect();
        if (rect.top <= this.wrapperOffset ) {
          if(!this.clickScroll) 
            this.currentcategory = charGroup.nativeElement.innerText;
          if(this.currentcategory === charGroup.nativeElement.innerText){
            this.clickScroll = false;
          }
        }
      });
    }
  }
  
  searchspecialchars(): void {
    if (this.searchInput !== '' && this.searchInput.length > 1) {
      this.currentcategory = 'history';
      const searchTerm = this.searchInput.trim().toLowerCase();
      const allSpecialChars = Object.values(this.specialchars).flat();
      const filteredSpecialChars = allSpecialChars.filter((char: BnSpecialChar) =>
        char.name.toLowerCase().includes(searchTerm)
      );
      this.searchResults = filteredSpecialChars;
    }
  }

  private usechar(){
    this.getcharHistory();
    this.setcharHistory();
  }

  private getcharHistory(){
    const storedData = localStorage.getItem('bn-specialchars-history');
    if (storedData) { this.history = JSON.parse(storedData); } 
  }

  private setcharHistory(){
    let checkExists = this.history.findIndex((obj:BnSpecialChar)=> obj === this.currentchar)
    if(checkExists === -1){
      this.history.push(this.currentchar);
      if (this.history.length > this.maxArrayLength) { this.history.shift(); }
      localStorage.setItem('bn-specialchars-history', JSON.stringify(this.history));
    }
  }

  clickScroll:boolean = false;
  selectSpecialchar(category:string){
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
    this.usechar()
    this.action.emit({
      type: 'char',
      action: 'insert',
      values: this.currentchar
    })
  }

  cancel(){
    this.action.emit({
      type: 'char',
      action: 'cancel',
      values: null
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

