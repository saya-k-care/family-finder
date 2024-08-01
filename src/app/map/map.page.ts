import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Kid } from '../model/kid.model';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import "@angular/compiler";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AlertboxComponent } from 'src/alertbox/alertbox.component';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  providers: [HttpClient]
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: false }) mapContainer: ElementRef | undefined;
  searchKey: any;

  isKid: boolean = false;
  map: any;
  segment = 0;
  places = [];
  isMarkerSet: boolean = false;
  message: any;
  isWatcher: any;
  addressComponent: any;
  formGroup: FormGroup;
  kidFormGroup: FormGroup;
  isDisabled: any;
  addressURL: any;
  loginLocal: any;
  isLoading: boolean = false;
  gospel: any = undefined;
  default_youtube: any = GlobalConstants.default_youtube;
  isInternetOK: boolean = false;
  currentDate: any;

  //utility
  alertboxComponent: AlertboxComponent;

  //parent area
  kidLocations: any;
  loginDB: any;
  care_taker_msg: any;
  care_taker_date_time: string | undefined;
  care_taker_update_location: any | undefined;

  // parent/kids area
  isRegistered: boolean = false;
  care_taker_id: any = '1';
  care_taker_email: any = 'FAMILY FINDER';
  kid_name: any = undefined;
  inAppBrowser: any;
  isGospelNews: any
  constructor(public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router,
    public http: HttpClient, private platform: Platform, private geolocation: Geolocation,
    private alertController: AlertController, public commonService: CommonService,
    public formBuilder: FormBuilder) {


  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id === "gospel") {
      this.isGospelNews = true
    }
    this.getGospel()
    this.getUnicode() 
  }

  async getGospel() {
    this.http.get('http://219.93.129.18:8880/finder/gospel/get',

    ).subscribe((data: any) => {
      this.gospel = data;
      this.message = "---" + this.message + '--' + data + "-- getPost()  data test get---";
      this.isInternetOK = true;
      console.log("gospel-----" + data)
    }
      ,
      (error: { error: { message: string; }; }) => {
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error test get---";
      }
    );

    return this.gospel;
  }


  async displayMsgBox(msg: any) {
    this.isLoading = true;
    console.log("gospel  before ");

    this.getGospel()
      .then((data: any) => {
        console.log("gospel  data return--> " + data);
        this.isLoading = false;
      })
      .catch((error) => {
        console.log("Promise rejected with " + error);
      });
    console.log("gospel finished--> ");

    await new Promise(f => setTimeout(f, 2000));

    if (this.gospel) {
      msg = this.gospel.message;
    }
    this.alertboxComponent.showAdsBox(msg, this.isKid, this.gospel);
  }

  getAds() {
    if (this.gospel == undefined) {
      window.open('https://www.malaysiancare.org/');
    }
    else {
      window.open(this.gospel.url);
    }
  }

  getURL(str: any): any {
    if (str != undefined || str != null) {
      var urlRegex = /(https?:\/\/[^ ]*)/;
      try {
        var res = str.match(urlRegex)[1];

        res = res.replace('https://', '');
        res = res.replace('http://', '');
        console.log("The extracted URL from given string is: " + res);
        if (res != undefined || res != null) {
          return res;
        }
        else {
          return undefined;
        }
      } catch (e) {
        console.error(e);
      }
    }
    else {
      return undefined;
    }
  }

  login() {
    this.router.navigate(['/home'])
  }


  resizeIframe(obj: any) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }

  current_location_accordion_expanded = false;
  care_taker_lastupdate_accordion_expanded = false;
  kidLocations_accordion_expanded = false;
  gospel_message_accordion_expanded = false;
  care_taker_history_accordion_expanded = false;

  toggle_accordion() {
    this.current_location_accordion_expanded = this.current_location_accordion_expanded === false;
  }

  care_taker_history_toggle_accordion() {
    this.care_taker_history_accordion_expanded = this.care_taker_history_accordion_expanded === false;
  }

  care_taker_lastupdate_toggle_accordion() {
    this.care_taker_lastupdate_accordion_expanded = this.care_taker_lastupdate_accordion_expanded === false;
  }

  kidLocations_toggle_accordion() {
    this.kidLocations_accordion_expanded = this.kidLocations_accordion_expanded === false;
  }

  gospel_message_toggle_accordion() {
    this.gospel_message_accordion_expanded = this.gospel_message_accordion_expanded === false;
  }

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


  unicode: any
  getUnicode() {
    console.log("calling-----" )
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/text');
    this.http.get('http://localhost:8880/finder/nginx/file/get', {
      headers: headers,
    }

    ).subscribe((data: any) => {
      this.unicode = data;
      console.log("unicode-----" + data)
    }
      ,
      (error: { error: { message: string; }; }) => {
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error test get---";
      }
    );

    return this.gospel;
  }
}

