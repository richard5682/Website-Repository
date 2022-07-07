/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductblockComponent } from './productblock.component';

describe('ProductblockComponent', () => {
  let component: ProductblockComponent;
  let fixture: ComponentFixture<ProductblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
