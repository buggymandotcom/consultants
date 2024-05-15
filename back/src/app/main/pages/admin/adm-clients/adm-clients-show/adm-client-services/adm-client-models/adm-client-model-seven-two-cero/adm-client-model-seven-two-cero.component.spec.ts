import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientModelSevenTwoCeroComponent } from './adm-client-model-seven-two-cero.component';

describe('AdmClientModelSevenTwoCeroComponent', () => {
  let component: AdmClientModelSevenTwoCeroComponent;
  let fixture: ComponentFixture<AdmClientModelSevenTwoCeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmClientModelSevenTwoCeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmClientModelSevenTwoCeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
