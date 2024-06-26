import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { matiIconComponent } from './mdi-icon.component';

describe('matiIconComponent', () => {
  let component: matiIconComponent;
  let fixture: ComponentFixture<matiIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ matiIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(matiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
