import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { BnTranslateSwitchMenuComponent } from '@binom/sdk-core/translate';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MatToolbarModule, 
    BnTranslateSwitchMenuComponent, TranslateModule, MatSidenavModule, MatButtonModule, MatExpansionModule],
  templateUrl: './app.component.html',

  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';
  constructor(private translate:TranslateService){
    this.translate.addLangs(['en-US', 'de-DE']);
    this.translate.setDefaultLang( 'en-US' );
    this.data.sort((a:any, b:any) => a.title.localeCompare(b.title));
    this.data.forEach((item:any) => {
      item.data.sort();
    });
  }

  data = [

    {
      title: 'components',
      data: ['bn-color-picker','bn-emoji-picker','bn-specialchars-picker','bn-icon-picker']
    },
  ]

 
  
  
}
