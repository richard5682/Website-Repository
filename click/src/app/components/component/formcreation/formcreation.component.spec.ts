/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormcreationComponent } from './formcreation.component';

describe('FormcreationComponent', () => {
  let component: FormcreationComponent;
  let fixture: ComponentFixture<FormcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
