import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientInfoComponent } from './adm-client-info.component';

describe('AdmClientInfoComponent', () => {
  let component: AdmClientInfoComponent;
  let fixture: ComponentFixture<AdmClientInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
