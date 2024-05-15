import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientServicesComponent } from './adm-client-services.component';

describe('AdmClientServicesComponent', () => {
  let component: AdmClientServicesComponent;
  let fixture: ComponentFixture<AdmClientServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
