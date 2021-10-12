
import { ActionValue  } from "./../models/numbers"
import { AddParameter  } from "./../models/add"
import { MultiplyParameter  } from "./../models/multiply"
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as Rx from "rxjs/Rx";
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  public getNumbers(): Observable<ActionValue[]> {
    return this.httpClient.get<ActionValue[]>('assets\\numbers.json');
  }

  getAdd() {
    return this.httpClient.get<AddParameter>('assets\\add.json');
  }

  getMultiply() {
    return this.httpClient.get<MultiplyParameter>('assets\\multiply.json');
  }

}

