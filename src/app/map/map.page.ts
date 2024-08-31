import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import "@angular/compiler";

@Component({
  selector: 'app-root',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  providers: [HttpClient]
})
export class MapPage implements OnInit {

  isGospelNews: any
  message: any;
  isInternetOK: any;

  constructor(public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router,
    public http: HttpClient, private platform: Platform, ) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id === "gospel") {
      this.isGospelNews = true
    }
    this.testInternet()
  }

  testInternet() {
    console.log("calling-https://eyebot.name.my/dev/location/get?id=1-" )
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/text');
    this.http.get('https://eyebot.name.my/dev/location/get?id=1', {
      headers: headers,
    }

    ).subscribe((data: any) => {
      this.isInternetOK = true;
    }
      ,
      (error: { error: { message: string; }; }) => {
        this.message = "---" + this.message + '--' + JSON.stringify(error) + "--error test get---";
      }
    );
  }
}

