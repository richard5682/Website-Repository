/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Servicepicker2Component } from './servicepicker2.component';

describe('Servicepicker2Component', () => {
  let component: Servicepicker2Component;
  let fixture: ComponentFixture<Servicepicker2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Servicepicker2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Servicepicker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
