/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServicepictureComponent } from './servicepicture.component';

describe('ServicepictureComponent', () => {
  let component: ServicepictureComponent;
  let fixture: ComponentFixture<ServicepictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicepictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicepictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
