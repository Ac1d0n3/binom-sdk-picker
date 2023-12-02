import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnEmojiPickerComponent } from './bn-emoji-picker.component';

describe('BnEmojiPickerComponent', () => {
  let component: BnEmojiPickerComponent;
  let fixture: ComponentFixture<BnEmojiPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BnEmojiPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BnEmojiPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
