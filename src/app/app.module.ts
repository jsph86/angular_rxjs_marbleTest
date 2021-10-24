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

@NgModule({
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
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

 }
