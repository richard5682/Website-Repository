/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PricepickerComponent } from './pricepicker.component';

describe('PricepickerComponent', () => {
  let component: PricepickerComponent;
  let fixture: ComponentFixture<PricepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
