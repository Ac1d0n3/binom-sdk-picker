import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnColorPickerComponent } from './bn-color-picker.component';

describe('BnColorPickerComponent', () => {
  let component: BnColorPickerComponent;
  let fixture: ComponentFixture<BnColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnColorPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
