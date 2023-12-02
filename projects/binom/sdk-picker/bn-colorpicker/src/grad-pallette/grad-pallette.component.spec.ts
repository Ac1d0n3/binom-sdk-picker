import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradPalletteComponent } from './grad-pallette.component';

describe('GradPalletteComponent', () => {
  let component: GradPalletteComponent;
  let fixture: ComponentFixture<GradPalletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradPalletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradPalletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
