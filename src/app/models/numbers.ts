export class ActionValue {

    value!: number;
    action!: string;
    result!:string;

    constructor(value: number,action: string,result:string) {
       this.value=value;
       this.action=action;
       this.result=result;
}

}