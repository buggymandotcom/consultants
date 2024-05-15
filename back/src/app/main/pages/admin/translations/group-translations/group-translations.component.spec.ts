import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTranslationsComponent } from './group-translations.component';

describe('GroupTranslationsComponent', () => {
  let component: GroupTranslationsComponent;
  let fixture: ComponentFixture<GroupTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
