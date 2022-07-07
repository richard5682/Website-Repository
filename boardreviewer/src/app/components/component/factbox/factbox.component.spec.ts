/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactboxComponent } from './factbox.component';

describe('FactboxComponent', () => {
  let component: FactboxComponent;
  let fixture: ComponentFixture<FactboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
