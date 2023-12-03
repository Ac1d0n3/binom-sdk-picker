import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnColorPickerMenuComponent } from './bn-color-picker-menu.component';

describe('BnColorPickerMenuComponent', () => {
  let component: BnColorPickerMenuComponent;
  let fixture: ComponentFixture<BnColorPickerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnColorPickerMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnColorPickerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
