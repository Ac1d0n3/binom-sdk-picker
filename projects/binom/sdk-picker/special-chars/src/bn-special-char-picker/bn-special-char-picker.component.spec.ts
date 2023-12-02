import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnSpecialCharPickerComponent } from './bn-special-char-picker.component';

describe('BnSpecialCharPickerComponent', () => {
  let component: BnSpecialCharPickerComponent;
  let fixture: ComponentFixture<BnSpecialCharPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BnSpecialCharPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BnSpecialCharPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
