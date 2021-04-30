import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCommandsPage } from './set-commands.page';

describe('SetCommandsPage', () => {
  let component: SetCommandsPage;
  let fixture: ComponentFixture<SetCommandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCommandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCommandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
