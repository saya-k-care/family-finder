import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import "@angular/compiler";
import { CareTakerService } from '../service/caretaker.service';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() expanded = false;
  @Input() expandHeight: any;
  @Input() message: any;
  @Input() arrays: any;
  is_gospel: any = false;
  is_sport: any = true;
  headline: any = "https://paris2024.rtm.gov.my/pingat"
  tv: any = "https://olympics.bwfbadminton.com/results/4752/paris-2024-olympic-games-badminton-competition/2024-07-30"
  news_arrays: any;
  bible_example_accordion_expanded: any = false

  constructor(private newsService: NewsService) { }
  ngOnInit() {
    this.getNews(true);
  }

  toggle_sport() {
    if (this.is_sport == true) {
      this.is_sport = false;
    }
    else {
      this.is_sport = true;
    }
  }

  toggle_gospel() {
    if (this.is_gospel == true) {
      this.is_gospel = false;
    }
    else {
      this.is_gospel = true;
    }
  }
  public async getNews(is_positive: any) {
    await this.newsService.getNews(is_positive)
      .then((data) => {
        this.news_arrays = data;
      })
      .catch((error) => {
        console.log("this.getNews() Promise rejected with " + error);
      });

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

  toggle_accordion() {
    this.bible_example_accordion_expanded = this.bible_example_accordion_expanded === false;
  }

}
