import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnIconPickerComponent } from './bn-icon-picker.component';

describe('BnIconPickerComponent', () => {
  let component: BnIconPickerComponent;
  let fixture: ComponentFixture<BnIconPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnIconPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnIconPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
