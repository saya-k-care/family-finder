import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import "@angular/compiler";
import { CareTakerService } from '../service/caretaker.service';

@Component({
  selector: 'app-acc-box',
  templateUrl: './accor-box.component.html',
  styleUrls: ['./accor-box.component.scss'],
})
export class AccorBoxComponent implements OnInit {
  @ViewChild('accordion', { read: ElementRef, static: false }) accordion: ElementRef;
  @Input() expanded = false;
  @Input() expandHeight: any;
  @Input() message: any;
  @Input() isBlue: any;
  @Input() isRed: any;
  @Input() isGreen: any;
  constructor() { }
  ngOnInit() {

  }

  substr(msg: any) {
    // console.log("msg-->" + msg);
    try {
      if (msg != undefined) {
        let returnMsg = msg.substring(0, 40) + "...";
        // console.log("returnMsg-->" + returnMsg);
        return returnMsg;
      }
    } catch (e) {
      console.error("substr(msg: any)-->" + e);
    }


    return msg;
  }

  substrLong(msg: any) {
    // console.log("msg-->" + msg);

    try {
      if (msg != undefined) {
        let returnMsg = msg.substring(0, 120) + "...";
        // console.log("returnMsg-->" + returnMsg);
        return returnMsg;
      }
    } catch (e) {
      console.error("substrLong(msg: any)-->" + e);
    }
    return msg;
  }

  async copy(value: string) {
    let aux = document.createElement("input");
    aux.setAttribute("value", value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }
}
