import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnColorpickerComponent } from './bn-colorpicker.component';

describe('BnColorpickerComponent', () => {
  let component: BnColorpickerComponent;
  let fixture: ComponentFixture<BnColorpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BnColorpickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BnColorpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
