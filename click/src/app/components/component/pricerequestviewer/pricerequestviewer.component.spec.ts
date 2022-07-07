/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PricerequestviewerComponent } from './pricerequestviewer.component';

describe('PricerequestviewerComponent', () => {
  let component: PricerequestviewerComponent;
  let fixture: ComponentFixture<PricerequestviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricerequestviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricerequestviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
