import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientsShowLayoutComponent } from './adm-clients-show-layout.component';

describe('AdmClientsShowLayoutComponent', () => {
  let component: AdmClientsShowLayoutComponent;
  let fixture: ComponentFixture<AdmClientsShowLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientsShowLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientsShowLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
