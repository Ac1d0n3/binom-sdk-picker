import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BnColorpickerComponent } from './bn-colorpicker.component';
import { PalletteComponent } from './pallette/pallette.component';
import { SliderComponent } from './slider/slider.component';
import { SavedColorsComponent } from './saved-colors/saved-colors.component';
import { ValueSliderComponent } from './value-slider/value-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { ModeSwitchComponent } from './mode-switch/mode-switch.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsComponent } from './settings/settings.component';
import { GradPalletteComponent } from './grad-pallette/grad-pallette.component';
import { FixedPalletteComponent } from './fixed-pallette/fixed-pallette.component';

@NgModule({
  declarations: [
    BnColorpickerComponent,
    PalletteComponent,
    SliderComponent,
    SavedColorsComponent,
    ValueSliderComponent,
    ModeSwitchComponent,
    SettingsComponent,
    GradPalletteComponent,
    FixedPalletteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [
    BnColorpickerComponent
  ]
})
export class BnColorpickerModule { }
