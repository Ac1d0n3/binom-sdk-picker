import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPalletteComponent } from './fixed-pallette.component';

describe('FixedPalletteComponent', () => {
  let component: FixedPalletteComponent;
  let fixture: ComponentFixture<FixedPalletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedPalletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPalletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
