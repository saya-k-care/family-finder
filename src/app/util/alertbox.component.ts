import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'hello',
  template: `<h1>AlertBox</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class AlertboxComponent  implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {}
  public async displayMsgBox(msg:any) {
    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: '',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  public async showAdsBox(msg: string, isKid: boolean, gospel: any) {
    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: '',
      message: msg,
      buttons: [
        {
          text: 'Skip',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('User cancelled');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Take Me There');
            this.getAds(gospel);
          }
        }
      ]
    });
    
    if (!isKid) {
      await alert.present();
    }
  }

  getAds(gospel: any) {
    console.log("this.gospel--->" + gospel)
    if (gospel == undefined) {
      window.open('https://www.malaysiancare.org/');
    }
    else {
      window.open(gospel.url);
    }
  }

  public openURL(url: any) {
    console.log("this.url--->" + url)
      window.open(url);
  }
}
