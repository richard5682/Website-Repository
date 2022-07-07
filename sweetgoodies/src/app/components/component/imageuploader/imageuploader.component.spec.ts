/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageuploaderComponent } from './imageuploader.component';

describe('ImageuploaderComponent', () => {
  let component: ImageuploaderComponent;
  let fixture: ComponentFixture<ImageuploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageuploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
