import { Component, Input, OnInit } from "@angular/core";
import { CareTakerService } from "src/app/service/caretaker.service";
import { CommonService } from "src/app/service/common.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'caretaker-history',
    template: `

<div *ngIf="arrays">

<div *ngFor="let array of arrays">
  <div *ngFor="let data of array">
    <ion-item *ngIf="data.care_taker_msg">
    <b> {{data.datetime}}: </b> &nbsp;&nbsp;<ion-label color="medium">{{ data.care_taker_msg}}</ion-label>
    <url-extract [msg]="data.care_taker_msg"></url-extract>
    </ion-item>
    <p></p>
   </div>
</div>
</div>
`
})
export class CareTakerHistory implements OnInit {
    @Input() id: any;
    care_taker_history_accordion_expanded = false;
    arrays: any;
    constructor(private careTakerService: CareTakerService,private http: HttpClient,
                private commonService: CommonService
    ) {
    }

    ngOnInit() { this.getHistory('7'); }

    care_taker_lastupdate_toggle_accordion() {
        this.care_taker_history_accordion_expanded = this.care_taker_history_accordion_expanded === false;
      }

    public async getHistory(limit: any) {
          await this.careTakerService.getCareTakerHistory(this.id, limit)
          .then((data) => {
            this.arrays = data;
          })
          .catch((error) => {
            console.log("this.getHistory() Promise rejected with " + error);
          });
    }
}
