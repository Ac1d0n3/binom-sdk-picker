import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BnColorsUtilsService, BnColor } from '@binom/sdk-core/utils'; 

@Component({
  selector: 'bn-saved-colors',
  templateUrl: './saved-colors.component.html'
})
export class SavedColorsComponent implements OnInit {

  @Input() enableToolTips:boolean = false;
  @Input() translateTag:string = '';
  @Input() color:any;
  @Output() colorChange:EventEmitter<BnColor> = new EventEmitter<BnColor>();

  saveMode:boolean = false;

  savedColors = [
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},

    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},
    {color: {use: 'white'}},



  ]

  constructor(private cu:BnColorsUtilsService ){}

  ngOnInit(): void {
    let savedColors = localStorage.getItem('bnSavedColors');
    if(savedColors)
    this.savedColors = JSON.parse(savedColors)
  }

  saveColor(slot:number){
    if(this.color){
      this.savedColors[slot].color = this.color
      localStorage.setItem('bnSavedColors', JSON.stringify(this.savedColors));
    }
  }

  clearColor(){
    this.colorChange.emit({rgba: [],
      hsla: [],
      hex: 'null',
      use: 'null',
      output: 'null'})
  }

  setSaveColor(slot:number){
    if(this.saveMode){
      this.saveColor(slot)
      this.saveMode = false
    } else {
      if(this.savedColors[slot].color.use !== 'white'){
        this.colorChange.emit(this.savedColors[slot].color)
      }
    }
  }

  setSaveMode(){
    this.saveMode = true
  }

}
