import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnIconsPickerComponent } from './bn-icons-picker.component';

describe('BnIconsPickerComponent', () => {
  let component: BnIconsPickerComponent;
  let fixture: ComponentFixture<BnIconsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BnIconsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BnIconsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
