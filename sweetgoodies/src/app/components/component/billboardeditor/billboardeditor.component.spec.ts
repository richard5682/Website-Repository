/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillboardeditorComponent } from './billboardeditor.component';

describe('BillboardeditorComponent', () => {
  let component: BillboardeditorComponent;
  let fixture: ComponentFixture<BillboardeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillboardeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillboardeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
