/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServicedashboardpageComponent } from './servicedashboardpage.component';

describe('ServicedashboardpageComponent', () => {
  let component: ServicedashboardpageComponent;
  let fixture: ComponentFixture<ServicedashboardpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicedashboardpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicedashboardpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
