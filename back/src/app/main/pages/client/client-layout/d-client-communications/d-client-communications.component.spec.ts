import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DClientCommunicationsComponent } from './d-client-communications.component';

describe('DClientCommunicationsComponent', () => {
  let component: DClientCommunicationsComponent;
  let fixture: ComponentFixture<DClientCommunicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DClientCommunicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DClientCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
