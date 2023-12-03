import { Component } from '@angular/core';
import { BnSpecialCharPickerComponent } from '@binom/sdk-picker/special-chars';

@Component({
  selector: 'app-special-char-picker',
  standalone: true,
  imports: [BnSpecialCharPickerComponent],
  templateUrl: './special-char-picker.component.html',
  styleUrl: './special-char-picker.component.scss'
})
export class SpecialCharPickerComponent {

}
