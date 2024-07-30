import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
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

  constructor(public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router,
    public http: HttpClient, private platform: Platform, private geolocation: Geolocation,
    private alertController: AlertController, public commonService: CommonService,
    public formBuilder: FormBuilder) {

    this.alertboxComponent = new AlertboxComponent(this.alertController);

    this.formGroup = formBuilder.group({
      care_taker_email: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.pattern("^[^@]+@[^@]+\.[^@]+$"),
          Validators.required
        ])
      ],
      care_taker_password: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.pattern("^null|$"),
          //  Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
          Validators.required
        ])
      ],
      care_taker_hp: [
        "",
        Validators.compose([
          Validators.minLength(7),
          Validators.pattern("^(?:00|\\+)[0-9\\s.\\/-]{8,20}$"),
          Validators.required
        ])
      ]
    });

    this.kidFormGroup = formBuilder.group({
      care_taker_email: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.pattern("^null|$"),
          Validators.required
        ])
      ]
      ,
      kid_name: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.pattern("^null|$"),
          Validators.required
        ])
      ]
    });
  }

  ngOnInit(): void {
    this.care_taker_id = this.route.snapshot.paramMap.get("id");
    const isNumeric = (val: string): boolean => {
      return !isNaN(Number(val));
    }
    if (isNumeric(this.care_taker_id)) {
      this.getCareTakerByID(this.care_taker_id);
      this.isKid = false;
    }
    else {
      this.isKid = true;
      this.loginLocal = undefined;
      this.care_taker_id = undefined;
    }

    this.tryInit();
  }

  tryInit() {

    this.getGospel()
      .then((data) => {
        this.init()
          .then((data) => {
            this.getCareTakerMessageByID();
            this.getLocation();
          })
          .catch((error) => {
            console.log("getCareTakerMessageByID() and loadMap Promise rejected with " + error);
          });
      })
      .catch((error) => {
        console.log("this.getGospel() Promise rejected with " + error);
      });
  }

  initForm() {
    this.init();
  }

  store: any;
  async init() {
    const store = new Storage();
    this._storage = await store.create();
    //this._storage?.set('login', 'test');
    let value = this.getValue();
    return value;
  }

  async getValue() {

    let login = await this.getObject('login');

    if (login != undefined) {
      this.isKid = login.is_kid;
      this.kid_name = login.kid_name;
      this.care_taker_id = login.care_taker_id;
    }

    this.loginLocal = login;

    return login;
  }

  async removeStoredValue() {
    this._storage?.remove("login");

    this.getValue()
      .then((data) => {
      })
      .catch((error) => {
        console.log("Promise rejected with " + error);
      });
  }

  async storeStoredValue(data: any) {
    this.removeStoredValue();
    let result: any = data;

    this._storage?.set('login', result)
      .then((data) => {
        this.getValue();
      })
      .catch((error) => {
        console.log("Promise rejected with " + error);
      });

  }

  latitude: any;
  longitude: any;
  private _storage: Storage | undefined;

  async getLocationDetails() {
    var position = this.geolocation.getCurrentPosition;
    return position;
  }

  async getObject(key: string): Promise<any> {
    if (this._storage != undefined) {
      try {
        const result = await this._storage.get(key);
        if (result != null) {
          return result;
        }
        return null;
      } catch (reason) {
        console.log(reason);
        return null;
      }
    }//end if
  }

  async getLocation() {
    this.isLoading = true;
    this.addressURL = undefined;
    let addressURL = await this.loadMap();
    let returnSearchKey = await this.getAddress(this.addressURL);
    this.isLoading = false;
    return this.searchKey;
  }

  // return returnSearchKey (current location text)
  async loadMap() {
    let rxTime = new Date();
    let hour = rxTime.getHours() + ":" + rxTime.getMinutes();
   // let day = rxTime.getDate() + '-' + (rxTime.getMonth() + 1);
    this.currentDate = hour;
    console.log(this.currentDate);

    this.isLoading = true;
    this.searchKey = undefined;
    this.message = "---" + this.message + "--loadMap()---";

    await this.geolocation.getCurrentPosition().then(pos => {
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      this.message = "---" + this.message + "--loadMap()---lat=" + lat + " lat=" + lng + "--";
      this.addressURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=en&user_agent="pisangtech@gmail.com"`;
      return this.addressURL;
    })
      .catch(err => {
        console.log(err);
        this.message = "---" + this.message + "--loadMap() error----->" + JSON.stringify(err);
      }
      );
    }

  async getAddress(addressURL: any) {
    this.isLoading = true;

    let data = await this.http
      .get<any>(addressURL)
      .toPromise();
    this.addressComponent = data.address;
    this.searchKey = data.display_name;
    this.isLoading = false;
    return this.searchKey;
  }

  async refreshKidLocation() {
    this.isLoading = true;
    let searchKey = await this.getLocation().then(searchKey => {
    });

    let url = GlobalConstants.sayakURL + '/location/get?id=' + this.care_taker_id;
    let data = await this.http
    .get<any>(url)
    .toPromise();

    if (data.length > 0) {
      this.kidLocations = data;
      if (this.gospel == undefined) {
        this.displayMsgBox(GlobalConstants.MY_CARE_MSG);
      }
      else {
        this.displayMsgBox(this.gospel.message);
      }
    }
    else {
      this.displayMsgBox('No Update Yet.');
    }
    this.isLoading = false;
    if (this.searchKey) {
      this.onUpdateCareTaker();
    }
    else {
      this.alertboxComponent.displayMsgBox("Location not updated yet. Please retry");
    }

    return data;
  }

  updateCareTakerMsg(data: any) {
    if (this.isKid) {
      this.care_taker_msg = data.care_taker_msg;
    }
    else {
      this.care_taker_msg = 'No Worries.';
    }
  }
  async getCareTakerByID(id: any) {
    const isNumeric = (val: string): boolean => {
      return !isNaN(Number(val));
    }

    if (isNumeric(id)) {
      this.isLoading = true;
      await this.http.get(GlobalConstants.sayakURL + '/caretaker/get?id=' + id).subscribe((data: any) => {
        console.log('getCareTakerByID-->', JSON.stringify(data));
        this.loginDB = data;
        this.storeStoredValue(data);
        this.care_taker_id = data.care_taker_id;
        this.care_taker_email = data.care_taker_email;
        this.updateCareTakerMsg(data);
        return data;
      },
        (error: { error: { message: string; }; }) => {
          this.isLoading = false;
          this.displayMsgBox('Error Get CareTaker.' + JSON.stringify(error));
        })
    }
    this.isLoading = false;

  }

  async getCareTakerMessageByID() {

    this.isLoading = true;
    await this.http.get(GlobalConstants.sayakURL + '/caretaker/get?id=' + this.care_taker_id).subscribe((data: any) => {
      this.loginDB = data;
      this.care_taker_id = data.care_taker_id;
      this.care_taker_email = data.care_taker_email;
      this.updateCareTakerMsg(data);
      this.care_taker_date_time = data.datetime;
      return data;
    },
      (error: { error: { message: string; }; }) => {
        this.isLoading = false;
        this.displayMsgBox('Error Get CareTaker.' + JSON.stringify(error));
      })
    this.isLoading = false;
  }

  watcherClicked() {
    this.isWatcher = true;
  }

  parentClicked() {
    this.isWatcher = false;
  }

  async onSubmit() {
    this.isLoading = true;
    this.isKid = false;

    let serializedForm: any;
    serializedForm = JSON.stringify(this.formGroup.value);
    //serializedForm.fullName = serializedForm.fullName + "2";

    this.formGroup.patchValue(serializedForm);

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

    this.http.post(GlobalConstants.sayakURL + '/register', JSON.parse(serializedForm), { headers }

    ).subscribe((id: any) => {
      this.isRegistered = true;

      const isNumeric = (val: string): boolean => {
        return !isNaN(Number(val));
      }

      if (isNumeric(id)) {
        this.getCareTakerByID(id);
        this.alertboxComponent.displayMsgBox('User Registered Successfully'); 
      }
      else {
        this.alertboxComponent.displayMsgBox('User Registered unSuccessfully. Please check email or contact no.'); 
      }

    }
      ,
      (error: { error: { message: string; }; }) => {
        this.isLoading = false;
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error test get---";
        this.alertboxComponent.displayMsgBox('User Registered unSuccessfully. Please check email or contact no.' + JSON.stringify(error)); 
      }
    );

  }

  async onUpdateCareTaker() {
    this.isLoading = true;

    this.loginLocal.care_taker_msg = this.care_taker_msg;

    if (this.care_taker_update_location) {
      this.loginLocal.care_taker_msg = "I am  at " + this.searchKey + "." + this.loginLocal.care_taker_msg;
    }

    let serializedForm: any;
    serializedForm = JSON.stringify(this.loginLocal);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

    this.http.post(GlobalConstants.sayakURL + '/caretaker/update', JSON.parse(serializedForm), { headers }

    ).subscribe((id: any) => {
      this.isRegistered = true;
      this.care_taker_msg = 'No worries.';
      this.isLoading = false;
    }
      ,
      (error: { error: { message: string; }; }) => {
        this.isLoading = false;
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error onUpdateCareTaker---";
        this.displayMsgBox(JSON.stringify(error));
      }
    );

  }

  async onSubmitKid() {
    this.isLoading = true;
    this.isKid = true;
    let serializedForm: any;
    serializedForm = JSON.stringify(this.kidFormGroup.value);
    //serializedForm.fullName = serializedForm.fullName + "2";
    this.kidFormGroup.patchValue(serializedForm);

    this.isLoading = true;
    await this.http.get(GlobalConstants.sayakURL + '/kid/get?email=' + this.kidFormGroup.value.care_taker_email).subscribe((data: any) => {

      if (data.care_taker_hp == undefined) {
        this.displayMsgBox('Care Taker Email Not Found');
      }
      else {
        this.loginDB = data;
        data.is_kid = this.isKid;
        data.kid_name = this.kidFormGroup.value.kid_name;
        this.storeStoredValue(data);
        this.care_taker_id = data.care_taker_id;
        this.kid_name = this.kidFormGroup.value.kid_name;
        return data;
      }

    },
      (error: { error: { message: string; }; }) => {
        this.isLoading = false;
        this.displayMsgBox('Error Get Kids CareTaker.' + JSON.stringify(error));
      })

    this.isLoading = false;
  }

  async updateLocation(kidMessage: any): Promise<void> {
    this.isLoading = true;
    this.searchKey = undefined;
    await new Promise(f => setTimeout(f, 2000));
    const location = await this.loadMap();
    this.message = "---" + this.message + '--updateLocation--->' + location;
    this.loadMap().then(async (data) => {
      this.message = "---" + this.message + '--loadMap--->' + data;

      await this.getAddress(this.addressURL).then(async (location) => {
        this.message = "---" + this.message + '--getAddress--->' + location;
        this.onUpdate(kidMessage, this.searchKey);
        this.getCareTakerMessageByID();
      }
      );
    });
    this.isLoading = false;
  }

  async getGospel() {
    this.http.get(GlobalConstants.sayakURL + '/gospel/get',

    ).subscribe((data: any) => {
      this.gospel = data;
      this.message = "---" + this.message + '--' + data + "-- getPost()  data test get---";
      this.isInternetOK = true;
    }
      ,
      (error: { error: { message: string; }; }) => {
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error test get---";
      }
    );

    return this.gospel;
  }

  async onUpdate(kid_response: any, kid_location: any) {
    let kid = new Kid();
    kid.kid_location = kid_location;
    kid.kid_response = kid_response;
    kid.care_taker_id = this.care_taker_id;
    kid.kid_name = this.kid_name;

    let serializedForm: any;
    serializedForm = JSON.stringify(kid);
    console.log('serializedForm: ', serializedForm);

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
    this.message = "---" + this.message + '--before /update--->'
    this.http.post(GlobalConstants.sayakURL + '/update', JSON.parse(serializedForm), { headers }
    ).subscribe((data: any) => {
      this.message = "---" + this.message + '--after /update--->' + data;
      if (this.gospel == undefined) {
        this.displayMsgBox(GlobalConstants.MY_CARE_MSG);
      }
      else {
        this.displayMsgBox(this.gospel.message);
      }
    }
      ,
      (error: { error: { message: string; }; }) => {
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error test get---";
        console.log("error--->" + error);
        this.displayMsgBox(JSON.stringify(error));
      }
    );
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

  logout() {
    this.removeStoredValue();
    this.router.navigate(['/map/undefined'])
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

}

