/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormanswerviewComponent } from './formanswerview.component';

describe('FormanswerviewComponent', () => {
  let component: FormanswerviewComponent;
  let fixture: ComponentFixture<FormanswerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormanswerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormanswerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
