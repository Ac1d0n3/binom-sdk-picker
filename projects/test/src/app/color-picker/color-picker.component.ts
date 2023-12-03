import { Component } from '@angular/core';
import { BnColorpickerComponent, BnColorpickerModule } from '@binom/sdk-picker/bn-colorpicker';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [BnColorpickerModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {

}
