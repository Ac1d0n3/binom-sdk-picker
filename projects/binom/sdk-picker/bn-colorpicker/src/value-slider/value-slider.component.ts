import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BnColorsUtilsService,BnColor } from '@binom/sdk-core/utils'; 

@Component({
  selector: 'bn-color-value-slider',
  templateUrl: './value-slider.component.html',
  encapsulation:ViewEncapsulation.None
})
export class ValueSliderComponent implements OnInit {

  constructor(private cu: BnColorsUtilsService) { }

  @Input() enableToolTips:boolean = false;
  @Input() translateTag:string = '';

  label1: string = 'R';
  label2: string = 'G';
  label3: string = 'B';

  val1:number = 0;
  val2:number = 0;
  val3:number = 0;
  stepWidth1:number = 1;
  stepWidth2:number = 1;

  _color:any;
  get color():any {
    return this._color;
  }

  @Output() colorChange:EventEmitter<BnColor|null> = new EventEmitter<BnColor|null>();

  @Input() set color(value:BnColor) {
    this._color = value;
    this.setOutput(this.mode)
  }

  @Input() valAlpha:number = 0;
  @Input() compact:boolean = false;

  max1:number = 255;
  max2:number = 255;

  hasAlpha:boolean = true;

  private _mode:string = 'rgba';
  get mode():string{
    return this._mode;
  }

  @Input() set mode(value:string){
    this._mode = value;

    if(this.mode === undefined) this.mode = 'rgba'
    this.setOutput(this.mode)
  }



  valueChange(){
    if(this.mode=== 'rgba' || this.mode === 'rgb'){
      this.colorChange.emit(this.cu.allValsFromRgb(this.val1,this.val2,this.val3,this.valAlpha, this.mode))
    }
    if(this.mode=== 'hsla' || this.mode === 'hsl'){
      //this.colorChange.emit(this.cu.allValuesFromHsl(this.val1,this.val2,this.val3,this.valAlpha, this.mode))
    }

  }

  setOutput(mode:string){
    this.valAlpha = 1;
    if(mode=== 'rgba' || mode === 'rgb'){
      this.label1 = 'R';
      this.label2 = 'G';
      this.label3 = 'B';
      this.max1 = 255;
      this.stepWidth1 = 1;
      this.max2 = 255;
      this.stepWidth2 = 1;
      if(this.color){
        this.val1 = this.color.rgba[0]
        this.val2 = this.color.rgba[1]
        this.val3 = this.color.rgba[2]
      }

    }
    if(mode=== 'hsla' || mode === 'hsl'){
      this.label1 = 'H';
      this.label2 = 'S';
      this.label3 = 'L';
      if(this.color){
        this.val1 = this.color.hsla[0]
        this.val2 = this.color.hsla[1]
        this.val3 = this.color.hsla[2]
      }
      this.max1 = 360;
      this.stepWidth1 = 1;
      this.max2 = 100;
      this.stepWidth2 = 1;
    }

    if(mode === 'rgba' || mode === 'hsla'){
      this.hasAlpha = true;
    } else {
      this.hasAlpha = false;

    }


  }

  alphaChange(){
    console.log(this.valAlpha)
    this.valueChange()
  }

  ngOnInit(): void {

  }

}
