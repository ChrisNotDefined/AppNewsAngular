import { NewsServiceService } from './../../services/news-service/news-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { INew } from 'src/app/interfaces/new.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnDestroy {

  featured : INew[];
  featuredSubscription: Subscription;

  constructor(public newsService: NewsServiceService) { }

  ngOnInit(): void {
    this.featured = [];
    this.featuredSubscription = this.newsService.getFeaturedNews().subscribe((news: INew[])=> {
      this.featured = news;
    })
  }

  ngOnDestroy(): void {
    this.featuredSubscription.unsubscribe();
  }
}
