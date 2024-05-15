import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumComponent } from './thum.component';

describe('ThumComponent', () => {
  let component: ThumComponent;
  let fixture: ComponentFixture<ThumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
