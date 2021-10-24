import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NumOperandComponent } from './num-operand/num-operand.component';

import { MatListModule } from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NumOperandComponent
      ],
      imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatListModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule
      ],
      providers: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatListModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'remote-job-start'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('remote-job-start');
  });

});
