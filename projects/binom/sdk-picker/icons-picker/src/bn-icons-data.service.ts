import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

import { BnFaIconsData } from './fa-icons-data.model';
import { BnMatIcon } from './material-icon.model';
import { BnJSONloaderService } from '@binom/sdk-core/data-loader';

@Injectable({
  providedIn: 'root'
})
export class BnIconsDataService {
  private materialicons$!: Observable<BnMatIcon[]>;
  private faicons$!: Observable<BnFaIconsData>;
  constructor(private jsonSvc: BnJSONloaderService) {}

  getMaterialicons(): Observable<BnMatIcon[]> {
    if (this.materialicons$) {
      return this.materialicons$;
    } else {
      this.materialicons$ = this.jsonSvc.getData("./assets/sdk-picker/material-icons.data.json").pipe(
        catchError((error: any) => {
       
          return of(null);
        }),
        shareReplay(1)
      );
      return this.materialicons$;
    }
  } 

  getFAicons(): Observable<BnFaIconsData> {
    if (this.faicons$) {
      return this.faicons$;
    } else {
      this.faicons$ = this.jsonSvc.getData("./assets/sdk-picker/fontawesome.data.json").pipe(
        catchError((error: any) => {
          return of(null);
        }),
        
        shareReplay(1)
      );
      return this.faicons$;
    }
  } 
}




