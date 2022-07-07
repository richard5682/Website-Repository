/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Question_uploadComponent } from './question_upload.component';

describe('Question_uploadComponent', () => {
  let component: Question_uploadComponent;
  let fixture: ComponentFixture<Question_uploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Question_uploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Question_uploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
