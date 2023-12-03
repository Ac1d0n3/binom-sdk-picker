import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'bn-color-mode-switch',
  templateUrl: './mode-switch.component.html'
})
export class ModeSwitchComponent implements OnInit {

  curMode = 'rgba';

  @Input() enableToolTips:boolean = false;
  @Input() translateTag:string = '';

  @Output() mode = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setMode(mode:string){
    this.curMode = mode
    this.mode.emit(this.curMode)
  }
}
