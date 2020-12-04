import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INew } from 'src/app/interfaces/new.interface';
import { NewsServiceService } from 'src/app/services/news-service/news-service.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit, OnDestroy {

  others : INew[];
  othersSubscription: Subscription;


  constructor(
    public newsService: NewsServiceService
  ) { }

  ngOnInit(): void {
    this.others= [];
    this.othersSubscription = this.newsService.getOtherNews().subscribe((news: INew[])=> {
      this.others = news;
    })
  }

  ngOnDestroy(): void {
    this.othersSubscription.unsubscribe();
  }

}
