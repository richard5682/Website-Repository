/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillboardWideComponent } from './billboard-wide.component';

describe('BillboardWideComponent', () => {
  let component: BillboardWideComponent;
  let fixture: ComponentFixture<BillboardWideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillboardWideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillboardWideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
