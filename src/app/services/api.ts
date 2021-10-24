import axios from "axios"
import { AddParameter } from "../models/add";
import { Numbers } from "./../models/numbers"


export function getNumbers  () : string[] {
  
    axios.get('assets\\numbers.json')
    .then((response) => {

        let n = new Numbers();
            console.log(response);
        return response.data;
        }
    );
   return [""]
}


export function getAdd () : AddParameter{
    axios.get('assets\\add.json')
    .then((response) => {
       return response;
    }
    );
    return new AddParameter;
}



export function getMultiply (){
    axios.get('assets\\multiply.json')
    .then((response) => {
        console.log(response);
    }
    );

}
