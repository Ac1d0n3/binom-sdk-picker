import { Component } from '@angular/core';
import { BnEmojiDataService, BnEmojiPickerComponent } from '@binom/sdk-picker/emoji';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  imports: [BnEmojiPickerComponent],
  providers:[BnEmojiDataService],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss'
})
export class EmojiPickerComponent {

}
