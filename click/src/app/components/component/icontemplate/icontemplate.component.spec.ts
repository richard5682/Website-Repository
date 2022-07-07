/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IcontemplateComponent } from './icontemplate.component';

describe('IcontemplateComponent', () => {
  let component: IcontemplateComponent;
  let fixture: ComponentFixture<IcontemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcontemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcontemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
