import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, shareReplay } from 'rxjs/operators';
import { BnEmojiData } from './bn-emoji-data.model';
import { BnJSONloaderService } from '@binom/sdk-core/data-loader';
@Injectable({
  providedIn: 'root'
})
export class BnEmojiDataService {

  private emojis$!: Observable<BnEmojiData>;

  constructor(private jsonSvc: BnJSONloaderService) {}

  getData(): Observable<any> {
    if (this.emojis$) {
      // if data is already loaded, return it as an observable
      return this.emojis$;
    } else {
      // if data is not loaded, load it using the JsonDataService
      this.emojis$ = this.jsonSvc.getData("./assets/sdk-picker/emoji.data.json").pipe(
        catchError((error: any) => {
          console.error('Error loading emojis', error);
          return of(null);
        }),
        shareReplay(1)
      );
      return this.emojis$;
    }
  } 
}
