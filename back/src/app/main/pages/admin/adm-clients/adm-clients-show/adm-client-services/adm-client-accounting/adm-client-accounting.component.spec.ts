import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientAccountingComponent } from './adm-client-accounting.component';

describe('AdmClientAccountingComponent', () => {
  let component: AdmClientAccountingComponent;
  let fixture: ComponentFixture<AdmClientAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientAccountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
