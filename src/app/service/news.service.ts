import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient,
  ) { }

  public async getNews(isPositive: any): Promise<any> {
    let data = await this.http
      .get<any>(GlobalConstants.sayakURL + '/new/get?date=' + formatDate(new Date(), 'yyyy-MM-dd', 'en') + "&is_positive=" + isPositive)
      .toPromise();
    console.log("inside getNews --->" + data);
    console.log("inside getNews title--->" + data.title);

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
