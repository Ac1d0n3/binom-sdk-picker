import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnSpecialcharPickerComponent } from './bn-specialchar-picker.component';

describe('BnSpecialcharPickerComponent', () => {
  let component: BnSpecialcharPickerComponent;
  let fixture: ComponentFixture<BnSpecialcharPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnSpecialcharPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnSpecialcharPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
