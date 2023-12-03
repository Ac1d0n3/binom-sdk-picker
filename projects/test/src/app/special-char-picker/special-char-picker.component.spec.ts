import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCharPickerComponent } from './special-char-picker.component';

describe('SpecialCharPickerComponent', () => {
  let component: SpecialCharPickerComponent;
  let fixture: ComponentFixture<SpecialCharPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialCharPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialCharPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
