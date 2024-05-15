import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAccountingComponent } from './services-accounting.component';

describe('ServicesAccountingComponent', () => {
  let component: ServicesAccountingComponent;
  let fixture: ComponentFixture<ServicesAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAccountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
