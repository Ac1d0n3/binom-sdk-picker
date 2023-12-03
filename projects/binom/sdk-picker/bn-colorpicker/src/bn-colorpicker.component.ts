import { Component, OnInit, Input, Output, EventEmitter ,OnDestroy, ViewEncapsulation} from '@angular/core';
import { BnColorsUtilsService, BnColor } from '@binom/sdk-core/utils';


import { Subscription,Subject  } from 'rxjs';

import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'bn-colorpicker',
  templateUrl: './bn-colorpicker.component.html',
  styleUrl:  './bn-colorpicker.component.css',
  encapsulation:ViewEncapsulation.None
})
export class BnColorpickerComponent implements OnInit,OnDestroy {

  public hue!: BnColor|null;
  @Input() color!: BnColor;
  public mode!: string;

  @Input() enableToolTips:boolean = false;
  @Input() translateTag:string = '';
  @Output() colorChange = new EventEmitter<BnColor>();

  @Input() compact:boolean = true;
  pallette:string = 'pallette1';
  valAlpha:number = 1;

  searchColor:string = '';

  @Input() debounceTime:number = 500;
  debouncer = new Subject<BnColor>();
  subs = new Array<Subscription>();

  constructor(private cu:BnColorsUtilsService) { }

  ngOnInit(): void {
    this.subs.push(this.debouncer.pipe(debounceTime(this.debounceTime)).subscribe(
      (value: BnColor) => {  this.colorChange.emit(value) },
      (error:any) => { console.log(error); }
    ));
  
  }

  setColorChange(colorVals:any){
    this.color = colorVals
   
    this.debouncer.next(this.color);
  }

  setColorChangeUpdate(colorVals:any){
    this.color = colorVals
    this.searchColor = colorVals.use
    console.log(this.searchColor)
    this.debouncer.next(this.color);
  }

  setMode(mode:string){
    this.mode = mode
    this.color.output = this.cu.setOutput(this.mode, this.color)
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  
}


