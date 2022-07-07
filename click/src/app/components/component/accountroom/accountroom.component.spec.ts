/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountroomComponent } from './accountroom.component';

describe('AccountroomComponent', () => {
  let component: AccountroomComponent;
  let fixture: ComponentFixture<AccountroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
