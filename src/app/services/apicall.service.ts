import { ActionValue  } from "./../models/numbers"
import { AddParameter  } from "./../models/add"
import { MultiplyParameter  } from "./../models/multiply"
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ApicallService {

  constructor(public httpClient: HttpClient) { }


  public getNumbers(): Observable<ActionValue[]> {
    return this.httpClient.get<ActionValue[]>('assets\\numbers.json');
  }


  callHttpClientAdd() {
   return this.httpClient.get<AddParameter>('assets\\add.json')
   .pipe(
       catchError(error => {
           if (error.error instanceof ErrorEvent) {

            //   this.errorMsg = `Error: ${error.error.message}`;

           } else {

            //   this.errorMsg = `Error: ${error.message}`;

           }

           let faildToRead : AddParameter  = new AddParameter();
           faildToRead.value = -1;

           return of(faildToRead);

       })

   ).toPromise()
}

async getAddJsonFileContent() {
  let httpData = await this.callHttpClientAdd();  
 return httpData.value
}


callHttpClientMultiply() {
  return this.httpClient.get<MultiplyParameter>('assets\\multiply.json').pipe(
    catchError(error => {
        if (error.error instanceof ErrorEvent) {
         //   this.errorMsg = `Error: ${error.error.message}`;
        } else {
         //   this.errorMsg = `Error: ${error.message}`;
        }
        let faildToRead : MultiplyParameter  = new MultiplyParameter();
        faildToRead.value = -1;
        return of(faildToRead);
    })
).toPromise()
}

async getMultiplyJsonFileContent() {
 let httpData = await this.callHttpClientMultiply();  
return httpData.value
}

}

