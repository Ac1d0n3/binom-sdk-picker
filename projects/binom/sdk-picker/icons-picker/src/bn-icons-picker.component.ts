import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component,OnInit,OnDestroy, Input,Output, EventEmitter} from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { BnIconsDataService } from './bn-icons-data.service';
import { BnIconsIcon } from './bn-icons-icon.model';
import { BnFaIconsData } from './fa-icons-data.model';
import { BnMatIcon } from './material-icon.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { BnIconComponent } from '@binom/sdk-core/icons'

import { BnProgressContentComponent } from '@binom/sdk-core/progress-content';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'bn-icons-picker',
  templateUrl: './bn-icons-picker.component.html',
  standalone: true,
  imports: [CommonModule,BnIconComponent,BnProgressContentComponent,MatButtonModule,MatInputModule,TranslateModule,FormsModule, ReactiveFormsModule,CdkScrollableModule, ScrollingModule ]
})
export class BnIconsPickerComponent implements OnInit, OnDestroy{
  constructor( private dataSvc:BnIconsDataService ) { }
  private sub!: Subscription;
  Object = Object;

  private _enableToolTips: boolean = false
  get enableToolTips():boolean {return this._enableToolTips}
  @Input() set enableToolTips(value:BooleanInput){ this._enableToolTips = coerceBooleanProperty(value); }

  private _cancelButton: boolean = false
  get cancelButton():boolean {return this._cancelButton}
  @Input() set cancelButton(value:BooleanInput){ this._cancelButton = coerceBooleanProperty(value); }

  @Input() translateTag:string = '';
  @Output() action = new EventEmitter<any>();


  materialicons!:BnMatIcon[];
  icons!:any;
  isloading:boolean = true;
  searchInput: string = '';
  searchResults: BnIconsIcon[] = [];
  currentBnIcon!:string;
  currentFont:string = 'fa';
  maxArrayLength:number = 60;
  history: Array<BnIconsIcon> = [];
  wrapperOffset:number = 0;

  private _onlyFa: boolean = false
  get onlyFa():boolean {return this._onlyFa}
  @Input() set onlyFa(value:BooleanInput){ this._onlyFa = coerceBooleanProperty(value); }

  ngOnInit(): void {
    this.sub = forkJoin(
      [this.dataSvc.getMaterialicons(), this.dataSvc.getFAicons()])
    .subscribe((data) => this.loadData(data[0],data[1]) );
  }

  async loadData(matIcons:any,faIcons:any){
    this.materialicons = await matIcons;
    this.icons  = await faIcons
    this.isloading = false;
  }

  searchBnIcons() {
    this.searchResults= [];
    if(this.searchInput !== ''){
   
      this.currentFont = 'history';
      for (let i = 0; i < this.icons.length; i++) {
        if (this.icons[i].includes(this.searchInput)) {
          this.searchResults.push( {type:'fa', icon: this.icons[i]});
        }
      }
      if(!this.onlyFa){
        for (let i = 0; i < this.materialicons.length; i++) {
          if (this.materialicons[i].name.includes( this.searchInput)) {
            this.searchResults.push( {type:'mat', icon: this.materialicons[i].name});
          }
        }
      }
     
    } else this.currentFont = 'fa';
  }
  
  private useBnIcon(){
    this.getBnIconHistory();
    this.setBnIconHistory();
  }

  private getBnIconHistory(){
    const storedData = localStorage.getItem('bn-icons-history');
    if (storedData) { this.history = JSON.parse(storedData); } 
  }

  private setBnIconHistory(){
    let curval= {type:this.currentFont,icon:this.currentIcon};
    let checkExists = this.history.findIndex((obj:any)=> obj.icon === this.currentIcon)
    if(checkExists === -1){
      this.history.push(curval);
      if (this.history.length > this.maxArrayLength) { this.history.shift(); }
      localStorage.setItem('bn-icons-history', JSON.stringify(this.history));
    }
  }

  currentIcon:string = '';

  selectBnIcon(icon:string){
    this.currentIcon = icon
    if(this.currentFont === 'fa'){
      this.currentBnIcon = '<i class="bn-button-fa '+icon+'"></i>'
    }
    if(this.currentFont === 'mat'){
      this.currentBnIcon = '<span class="material-icons-outlined">'+icon+'</span>'
    }
  }

  selectBnIconByType(icon:BnIconsIcon){
    this.currentIcon = icon.icon
    if(icon.type === 'fa'){
      this.currentBnIcon = '<i class="bn-button-fa '+icon.icon+'"></i>'
    }
    if(icon.type === 'mat'){
      this.currentBnIcon = '<span class="material-icons-outlined">'+icon.icon+'</span>'
    }

  }

  fireAction(){
  
    if(this.currentFont !== 'history') this.useBnIcon();
    this.action.emit({
      type: 'BnIcon',
      action: 'insert',
      values: this.currentBnIcon
    })
  }

  cancel(){
    this.action.emit({
      type: 'BnIcon',
      action: 'cancel',
      values: null
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

