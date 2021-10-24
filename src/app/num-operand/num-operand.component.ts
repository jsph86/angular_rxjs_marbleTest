import { Component, Injectable, OnInit } from '@angular/core';
import { ActionValue } from "./../models/numbers"
import { ApicallService } from "./../services/apicall.service"
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser'
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'num-operand',
  templateUrl: './num-operand.component.html',
  styleUrls: ['./num-operand.component.css']
})


export class NumOperandComponent implements OnInit {

  public finalListToShow: string[] = [];

  constructor(public commonModule: CommonModule, public browserModule: BrowserModule, public matListModule: MatListModule, public _snackBar: MatSnackBar, public apiService: ApicallService, public overlayModule: OverlayModule) {
  }


  ngOnInit(): void {
    this.GenerateListToShow();
  }

  GenerateListToShow() {
    this.apiService.getNumbers().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._snackBar.open("« Server Error »", "", {
            duration: 2000,
          });
        }
        return throwError(
          'Something bad happened; please try again later.');
      })
    ).subscribe
      (value => {
        this.ProcessActionValues(value).subscribe(ress => {
          ress.then((x) => {
            this.finalListToShow.push((x.result));
          })
        });
      })
  }


  ProcessActionValues(actionValues: ActionValue[]): Observable<Promise<ActionValue>> {
    return of(...actionValues).
      mergeMap(
        (value: ActionValue) =>
          of(this.DoCalc(value)).pipe(catchError((err, caught) => caught)),
      ).pipe(catchError((err, caught) => caught))
  }


  async DoCalc(actionValue: ActionValue): Promise<ActionValue> {
    let res = new ActionValue(actionValue.value, actionValue.action, "")
    if (actionValue.action == "add") {
      let add = await this.apiService.getAddJsonFileContent();
      if (add == -1) {
        res.result = actionValue.value + " + <MISSING DATA> = <MISSING DATA>";
      } else {
        res.result = actionValue.value + " + " + add + "=" + (actionValue.value + add);
      }
      return res;
    }

    if (actionValue.action == "multiply") {
      let multiply = await this.apiService.getMultiplyJsonFileContent();
      if (multiply == -1) {
        res.result = actionValue.value + " * <MISSING DATA> = <MISSING DATA>";
      } else {
        res.result = actionValue.value + " * " + multiply + "=" + (actionValue.value * multiply);
      }
      return res;
    }
    return new ActionValue(0, "", "");
  }
}
