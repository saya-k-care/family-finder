import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import "@angular/compiler";
import { CareTakerService } from '../service/caretaker.service';

@Component({
  selector: 'app-acc',
  templateUrl: './accor.component.html',
  styleUrls: ['./accor.component.scss'],
})
export class AccorComponent implements OnInit {
  @ViewChild('accordion', { read: ElementRef, static: false }) accordion: ElementRef;
  @Input() expanded = false;
  @Input() expandHeight: any;
  @Input() message: any;
  @Input() arrays: any;
  @Input() isLong: boolean = false;
  @Input() isKid: boolean = false;
  @Input() care_taker_id: any;

  care_taker_history_arrays: any;
  constructor(private careTakerService: CareTakerService) { }
  ngOnInit() {
    if (this.care_taker_id) {
      this.getHistory('7');
    }
  }

  public async getHistory(limit: any) {
    await this.careTakerService.getCareTakerHistory(this.care_taker_id, limit)
      .then((data) => {
        this.care_taker_history_arrays = data;
      })
      .catch((error) => {
        console.log("this.getHistory() Promise rejected with " + error);
      });

  }

  public async delHistory() {
    await this.careTakerService.delCareTakerHistory(this.care_taker_id)
      .then((data) => {
        this.getHistory('7');
      })
      .catch((error) => {
        console.log("this.delHistory() Promise rejected with " + error);
      });
  }

  substr(msg: any) {
    // console.log("msg-->" + msg);

    if (msg != undefined) {
      let returnMsg = msg.substring(0, 40) + "...";
      // console.log("returnMsg-->" + returnMsg);
      return returnMsg;
    }
    return msg;
  }

  substrLong(msg: any) {
    // console.log("msg-->" + msg);

    if (msg != undefined) {
      let returnMsg = msg.substring(0, 120) + "...";
      // console.log("returnMsg-->" + returnMsg);
      return returnMsg;
    }
    return msg;
  }

  getArrayLength() {
    if (this.arrays) {
      return this.arrays[0].length;
    }
    else {
      return undefined
    }
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
