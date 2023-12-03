
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  HostListener,
} from '@angular/core'

import { BnColorsUtilsService } from '@binom/sdk-core/utils'; 

@Component({
  selector: 'bn-color-palette',
  templateUrl: './pallette.component.html',

})
export class PalletteComponent implements AfterViewInit, OnChanges {

  constructor(private cu:BnColorsUtilsService ){}

  @Input() hue: any = '';

  @Input() mode: string = 'rgba';
  @Input() valAlpha: number = 1;
  @Output() color: EventEmitter<any> = new EventEmitter(true)

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>

  private ctx!: CanvasRenderingContext2D

  private mousedown: boolean = false

  public selectedPosition!: { x: number; y: number }


 
  ngAfterViewInit() {
    this.draw()
  }

  draw() {
    if(this.canvas){


      if (!this.ctx) {
        let context = this.canvas.nativeElement.getContext('2d');
        if(context !== null && context !== undefined)
        this.ctx = context
      }
      const width = this.canvas.nativeElement.width
      const height = this.canvas.nativeElement.height

      this.ctx.fillStyle = this.hue? this.hue.use || 'rgba(255,255,255,1)' : 'rgba(255,255,255,1)';
      this.ctx.fillRect(0, 0, width, height)

      const whiteGrad = this.ctx.createLinearGradient(0, 0, width, 0)
      whiteGrad.addColorStop(0, 'rgba(255,255,255,1)')
      whiteGrad.addColorStop(1, 'rgba(255,255,255,0)')

      this.ctx.fillStyle = whiteGrad
      this.ctx.fillRect(0, 0, width, height)

      const blackGrad = this.ctx.createLinearGradient(0, 0, 0, height)
      blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
      blackGrad.addColorStop(1, 'rgba(0,0,0,1)')

      this.ctx.fillStyle = blackGrad
      this.ctx.fillRect(0, 0, width, height)

      if (this.selectedPosition) {
        this.ctx.strokeStyle = 'white'
        this.ctx.fillStyle = 'white'
        this.ctx.beginPath()
        this.ctx.arc(
          this.selectedPosition.x,
          this.selectedPosition.y,
          6,
          0,
          2 * Math.PI
        )
        this.ctx.lineWidth = 2
        this.ctx.stroke()
        this.ctx.strokeStyle = 'black'
        this.ctx.fillStyle = 'black'
        this.ctx.beginPath()
        this.ctx.arc(
          this.selectedPosition.x,
          this.selectedPosition.y,
          7,
          0,
          2 * Math.PI
        )
        this.ctx.lineWidth = 1
        this.ctx.stroke()
      }
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue']) {
      this.draw()
      const pos = this.selectedPosition
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y))
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true
    this.selectedPosition = { x: evt.offsetX, y: evt.offsetY }
    this.draw()
    this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY))
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: evt.offsetX, y: evt.offsetY }
      this.draw()
      this.emitColor(evt.offsetX, evt.offsetY)
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y)
    this.color.emit(rgbaColor)
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data
    if(imageData)
    return this.cu.allValsFromRgb( imageData[0],imageData[1],imageData[2],this.valAlpha, this.mode  )
    else return this.cu.allValsFromRgb( 0,0,0,this.valAlpha, this.mode )
  }
}
