/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablelistComponent } from './tablelist.component';

describe('TablelistComponent', () => {
  let component: TablelistComponent;
  let fixture: ComponentFixture<TablelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
