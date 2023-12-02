import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bn-color-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  @Input() enableToolTips:boolean = false;
  @Input() translateTag:string = '';

  @Output() compact = new EventEmitter(false);
  @Output() pallette = new EventEmitter();

  @Input() compactMode:boolean = false;

  constructor() { }

  ngOnInit(): void {}

  setCompact(){
    this.compactMode = !this.compactMode
    this.compact.emit(this.compactMode)
  }

  setPallette(value:string){
    this.pallette.emit(value)
  }

}
