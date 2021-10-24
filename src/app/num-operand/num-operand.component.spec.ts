import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { NumOperandComponent } from './num-operand.component';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestScheduler } from 'rxjs/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActionValue } from "./../models/numbers"
import { ApicallService } from "./../services/apicall.service"
import { of } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatListModule } from '@angular/material/list';

describe('NumOperandComponent', () => {
  let testScheduler: TestScheduler;
  let component: NumOperandComponent;
  let fixture: ComponentFixture<NumOperandComponent>;

  let appService: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NumOperandComponent
      ],
      providers: [
        MatSnackBar,
        Overlay,
        HttpClient,
        HttpHandler,
        OverlayModule,
        MatListModule,
        { provide: ApicallService }],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();



    fixture = TestBed.createComponent(NumOperandComponent);
    component = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(ApicallService);

    spyOn(service, "getAddJsonFileContent").and.callFake(() => {
      return Promise.resolve(5);
    });

    spyOn(service, "getMultiplyJsonFileContent").and.callFake(() => {
      return Promise.resolve(10);
    });

    spyOn(service, "getNumbers").and.callFake(() => {
      return of([
        {
          value: 1,
          action: "add",
          result: ""
        },
        {
          value: 2,
          action: "multiply",
          result: ""
        }
      ]);
    });

    fixture.detectChanges();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

  });

  it('generates the stream correctly', fakeAsync(() => {

    testScheduler.run((helpers) => {

      const {  expectObservable } = helpers;

      let values = {
        a: new ActionValue(
          1,
          "add",
          "1 + 5=6")
        ,
        b: new ActionValue(
          2,
          "multiply",
          "2 * 10=20")
        ,
        x: new ActionValue(
          1,
          "add",
          "1 + 5=6"),
        y: new ActionValue(
          2,
          "multiply",
          "2 * 10=20"
        )
      };

      flush();

      let coldObservable = testScheduler.createColdObservable('-ab', { a: values.a, b: values.b });
      appService = jasmine.createSpy("NumOperandComponent");
      appService.ProcessActionValues = coldObservable;
      expectObservable(appService.ProcessActionValues).toBe('-xy', { x: values.x, y: values.y });
    })
  })
  )
})






