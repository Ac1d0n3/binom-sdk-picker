import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BnColor, BnColorsUtilsService } from '@binom/sdk-core/utils';


@Component({
  selector: 'bn-colorpicker-menu',
  //standalone: true,
 // imports: [BnColorpickerModule, MatMenuModule,MatButtonModule,TranslateModule,MatTooltipModule ],
  templateUrl: './bn-color-picker-menu.component.html',
  styleUrl: './bn-color-picker-menu.component.css'
})
export class BnColorpickerMenuComponent  {

  //public color!: any;

  @Input() enableToolTips:boolean = true;
  @Input() translateTag:string = '';
  @Input() editorButton:boolean = false;
  @Output() colorChange:EventEmitter<BnColor> = new EventEmitter<BnColor>();
  @Output() menuClose:EventEmitter<BnColor> = new EventEmitter<BnColor>();
  @Output() menuOpened:EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled:boolean = false;
  @Input() color!:BnColor;
  @Input() menuIcon:string = 'fa-fill-drip';
  @Input() bnTooltip:string = 'bnColorPicker.colorPicker';
  @Input() setClass:string = 'bneIco';

  constructor(private cu:BnColorsUtilsService) { }

  setColorChange(colorVals:any){
    this.color = colorVals;
    this.colorChange.emit(this.color)
  }

  closeEvent(){
 
    this.menuClose.emit(this.color)
  }

  menuOpenedEvent(event:any){
 
    this.menuOpened.emit(event)
  }
  

}
