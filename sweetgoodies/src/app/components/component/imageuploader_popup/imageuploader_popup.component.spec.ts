/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Imageuploader_popupComponent } from './imageuploader_popup.component';

describe('Imageuploader_popupComponent', () => {
  let component: Imageuploader_popupComponent;
  let fixture: ComponentFixture<Imageuploader_popupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Imageuploader_popupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Imageuploader_popupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
