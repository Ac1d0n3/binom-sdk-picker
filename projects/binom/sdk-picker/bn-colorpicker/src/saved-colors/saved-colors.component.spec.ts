import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedColorsComponent } from './saved-colors.component';

describe('SavedColorsComponent', () => {
  let component: SavedColorsComponent;
  let fixture: ComponentFixture<SavedColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
