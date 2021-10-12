import { Component, OnInit } from '@angular/core';
import { ActionValue } from "./../models/numbers"
import { ApicallService } from "./../services/apicall.service"
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { AddParameter } from '../models/add';
import { MultiplyParameter } from '../models/multiply';
import { HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, Subject, throwError } from 'rxjs';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-num-operand',
  templateUrl: './num-operand.component.html',
  styleUrls: ['./num-operand.component.css']
})
export class NumOperandComponent implements OnInit {

  finalListToShow: string[] = [];


  constructor(public _snackBar: MatSnackBar, public apiService: ApicallService) { }


  ngOnInit(): void {
    this.GenerateListToShow();
  }

  GenerateListToShow() {
    this.apiService.getNumbers().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open("«Server Error»", "", {
            duration: 2000,
          });
        }
        return throwError(
          'Something bad happened; please try again later.');
      })
    ).subscribe(value => { 
       this.ProcessActionValues(value); });
  }






  ProcessActionValues(actionValues:ActionValue[]) {
    from(actionValues).
      mergeMap(
        (value: ActionValue) =>
          of(this.DoCalc(value))
      )
      .subscribe(value => (value.subscribe(
        result => this.finalListToShow.push(result)
      )
      )
      );
  }



  DoCalc(actionValue: ActionValue): Observable<string> {
    var subject = new Subject<string>();
    if (actionValue.action == "add") {
      this.apiService.getAdd()
        .subscribe(
          (data: AddParameter) => {
            subject.next(actionValue.value + " + " + data.value + "=" + (actionValue.value + data.value));
          }
          ,
          (error) => {
            subject.next(actionValue.value + " + <MISSING DATA> = 0");
          }
        )
    }

    if (actionValue.action == "multiply") {
      this.apiService.getMultiply()
        .subscribe(

          (data: MultiplyParameter) => {
            subject.next( actionValue.value + " * " + data.value + "=" + (actionValue.value * data.value));
          }
          ,
          (error) => {
            subject.next(actionValue.value + " * <MISSING DATA> = 0");
          }

        )
    }

    return subject.asObservable();
  }

}
