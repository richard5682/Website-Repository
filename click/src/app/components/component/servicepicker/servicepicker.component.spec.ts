/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServicepickerComponent } from './servicepicker.component';

describe('ServicepickerComponent', () => {
  let component: ServicepickerComponent;
  let fixture: ComponentFixture<ServicepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
