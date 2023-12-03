import { Component } from '@angular/core';
import { BnIconsPickerComponent } from '@binom/sdk-picker/icons-picker';

@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [BnIconsPickerComponent],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss'
})
export class IconPickerComponent {

}
