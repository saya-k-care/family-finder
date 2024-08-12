import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import "@angular/compiler";
import { AlertboxComponent } from 'src/alertbox/alertbox.component';
import { HelloComponent } from './hello.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formGroup: FormGroup;
  alertboxComponent: any;
  name: any = "testing...."

  constructor(
 // public helloComponent: HelloComponent,
    public formBuilder: FormBuilder, private alertController: AlertController, public http: HttpClient, private router: Router,) {
    this.formGroup = formBuilder.group({
      care_taker_email: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.pattern("^null|$"),
          Validators.required
        ])
      ],
      care_taker_password: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.pattern("^null|$"),
          Validators.required
        ])
      ]
    });
    this.alertboxComponent = new AlertboxComponent(this.alertController);  
  }

  onSubmit(formData: any) {
    console.log(formData);
    try { 

    let url = GlobalConstants.sayakURL + '/login?care_taker_email=' + formData.care_taker_email + "&care_taker_password=" + formData.care_taker_password;
    this.http.get(url).subscribe((data: any) => {
      console.log('login result-->' + JSON.stringify(data));
      if (data == undefined) {
        this.alertboxComponent.displayMsgBox('Login Failed. Please try again'); 
      }
      else {
        this.router.navigate(['/map/' + data.care_taker_id])
      }
    }
    ,
    (error: { error: { message: string; }; }) => {
      console.log("error--->" + error.error);  
      this.alertboxComponent.displayMsgBox('Login Failed. Please try again'); 
    }
  )

  } catch (error) {
    console.log(error);
    this.alertboxComponent.displayMsgBox("Login Failed. Please try again");

    //let helloComponent = new HelloComponent();  
    //helloComponent.returnSomething();
    }
  }

  register() {
    this.router.navigate(['/map/undefined'])
  }
}
