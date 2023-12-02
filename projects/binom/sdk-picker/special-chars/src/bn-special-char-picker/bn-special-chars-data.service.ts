import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';

import { BnSpecialCharData } from './bn-special-chars-data.model';
import { BnJSONloaderService } from '@binom/sdk-core/data-loader';

@Injectable({
  providedIn: 'root'
})
export class BnSpecialCharsDataService {
  private specialchars$!: Observable<BnSpecialCharData>;

  constructor(private jsonSvc: BnJSONloaderService) {}

  getData(): Observable<any> {
    if (this.specialchars$) {
      return this.specialchars$;
    } else {
      this.specialchars$ = this.jsonSvc.getData("./assets/sdk-picker/specialchars.data.json").pipe(
        catchError((error: any) => {
       
          return of(null);
        }),
        shareReplay(1)
      );
      return this.specialchars$;
    }
  } 
}