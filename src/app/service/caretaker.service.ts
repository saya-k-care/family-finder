import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from 'src/environments/GlobalConstants';


@Injectable({
  providedIn: 'root'
})
export class CareTakerService {

  constructor(private http: HttpClient,
  ) { }

  public async getCareTakerHistory(id: any, limit: any): Promise<any> {
    let data = await this.http
      .get<any>(GlobalConstants.sayakURL + '/caretaker/getmsgHistory?id=' + id + "&limit=" + limit)
      .toPromise();
    console.log("inside getHistory id --->" + data);

    return data;
  }

  public async delCareTakerHistory(id: any): Promise<any> {
    let data = await this.http
      .get<any>(GlobalConstants.sayakURL + '/caretaker/delAllWorries?id=' + id)
      .toPromise();
    console.log("inside getHistory id --->" + data);

    return data;
  }

}
