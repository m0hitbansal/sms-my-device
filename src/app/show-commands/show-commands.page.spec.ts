import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCommandsPage } from './show-commands.page';

describe('ShowCommandsPage', () => {
  let component: ShowCommandsPage;
  let fixture: ComponentFixture<ShowCommandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCommandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
