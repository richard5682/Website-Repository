/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillboardComponent } from './billboard.component';

describe('BillboardComponent', () => {
  let component: BillboardComponent;
  let fixture: ComponentFixture<BillboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
