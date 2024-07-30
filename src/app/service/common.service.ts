import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    toggle_symbol(expanded: any, length: any) {
        if (length < 40) {
            return ""
        }
        if (expanded) {
            return ("[-]")
        }
        else {
            return ("[+]")
        }
    }

    public isFacebook(str: any): any {
        // console.log("isFacebook str-->" + str);
        if (str != undefined && str.includes('facebook')) {
        //    console.log("isFacebook ");
            return true
        }
        else {
            return false;
        }
    }

}
