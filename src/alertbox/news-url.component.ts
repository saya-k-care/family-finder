import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CareTakerService } from "src/app/service/caretaker.service";
import { CommonService } from "src/app/service/common.service";

@Component({
    selector: 'url-news',
    template: `
  <style>
.button {
    padding: 0;
    border: none;
    background: none;
}
</style>
<div *ngIf="this.getURL(this.msg) && this.commonService.isFacebook(this.msg)">
    <a href="#" class="button" (click)="processMsg()">Open Link</a>
</div>

<div *ngIf="this.getURL(this.msg) && !commonService.isFacebook(this.msg)">

 <iframe *ngIf="this.enableFrame == true"  [src]="sanitizer.bypassSecurityTrustResourceUrl(this.addHTTPs(this.msg))" allow="autoplay;"
            frameborder="0" style='width: 100%;' height="300"
            ></iframe>
            <a href="#" class="button" (click)="processMsg()">Open Link</a>
</div>
`


})
export class URLNewsComponent implements OnInit {
    @Input() msg: any;
    @Input() url: any;
    @Input() enableFrame: boolean = true;
    isURL: boolean;
    localMessage: any;
    testMsg: any ="https://www.biblegateway.com/passage/?search=%E9%A6%AC%20%E5%A4%AA%20%E7%A6%8F%20%E9%9F%B3%2021%3A43-45%2CMatthew%2021%3"
    constructor(public sanitizer: DomSanitizer, public commonService: CommonService) {
    }
    windowFeatures = [
        // "toolbar=no",
        // "location=no",
        // "directories=no",
        // "status=no",
        // "menubar=no",
        // "scrollbars=no",
        // "resizable=no",
        // "copyhistory=no",
        // "chrome=on"
    ];
    openWindow() {

    }

    ngOnInit() { }

    public processMsg() {
        if (this.msg != undefined) {

            let url = this.getURL(this.msg);

            if (this.url != undefined) {
                url = this.getURL(this.url);
            }
            if (url != undefined) {
                this.isURL = true;
                window.open(
                    "https://" + url,
                    "Independent Window",
                    this.windowFeatures.join()
                );
            }
        }
    }

    public getURL(str: any): any {
        if (str != undefined || str != null) {
            var urlRegex = /(https?:\/\/[^ ]*)/;
            try {
                var res = str.match(urlRegex)[1];

                res = res.replace('https://', '');
                res = res.replace('http://', '');
                //console.log("The extracted URL from given string is: " + res);
                if (res != undefined || res != null) {
                    return res;
                }
                else {
                    return undefined;
                }
            } catch (e) {
                console.log('error=>' + e);
            }
        }
        else {
            return undefined;
        }
    }

    public addHTTPs(str: any) {
        return "https://" + this.getURL(str);
    }


}
