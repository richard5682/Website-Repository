/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirclescoreComponent } from './circlescore.component';

describe('CirclescoreComponent', () => {
  let component: CirclescoreComponent;
  let fixture: ComponentFixture<CirclescoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclescoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
