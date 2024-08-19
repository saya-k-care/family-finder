import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../environments/GlobalConstants';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private newsService: NewsService) {
    // constructor
  }

  ngOnInit(): void {
    // init
  }

  getIsAbout() {
    return GlobalConstants.isAbout
  }

  toggle_chinese() {
    if (GlobalConstants.isChinese == true) {
      GlobalConstants.isChinese = false;
      GlobalConstants.isBahasa = false;
    }
    else {
      GlobalConstants.isChinese = true;
      GlobalConstants.isBahasa = false;
    }
  }

  toggle_sport() {
    if (GlobalConstants.is_sport == true) {
      GlobalConstants.is_sport = false;
    }
    else {
      GlobalConstants.is_sport = true;
    }
  }

  toggle_gospel() {
    if (GlobalConstants.is_gospel == true) {
      GlobalConstants.is_gospel = false;
      GlobalConstants.isBahasa = false;
    }
    else {
      GlobalConstants.is_gospel = true;
      GlobalConstants.isBahasa = false;
    }
  }

  toggle_bahasa() {
    if (GlobalConstants.isBahasa == true) {
      GlobalConstants.isBahasa = false;
      GlobalConstants.is_gospel = false;
      GlobalConstants.isChinese = false;
    }
    else {
      GlobalConstants.isBahasa = true;
      GlobalConstants.is_gospel = false;
      GlobalConstants.isChinese = false;
    }
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

  public async getNews(is_positive: any) {

    if (!is_positive) {
      GlobalConstants.isFiltered = true;
    }
    else {
      GlobalConstants.isFiltered = false;
    }
    await this.newsService.getNews(is_positive)
      .then((data) => {
        GlobalConstants.news_arrays = data;
      })
      .catch((error) => {
        console.log("this.getNews() Promise rejected with " + error);
      });

  }

  public async getNewsSports() {
    await this.newsService.getNewsSports()
      .then((data) => {
        GlobalConstants.news_sport_arrays = data;
      })
      .catch((error) => {
        console.log("this.getNews() Promise rejected with " + error);
      });
  }

}
