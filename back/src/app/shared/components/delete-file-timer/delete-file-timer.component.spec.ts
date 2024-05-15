import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFileTimerComponent } from './delete-file-timer.component';

describe('DeleteFileTimerComponent', () => {
  let component: DeleteFileTimerComponent;
  let fixture: ComponentFixture<DeleteFileTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFileTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFileTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
