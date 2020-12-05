import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INew } from 'src/app/interfaces/new.interface';
import { NewsServiceService } from 'src/app/services/news-service/news-service.service';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss'],
})
export class NewTemplateComponent implements OnInit, OnDestroy {
  form: FormGroup; // Formulario

  params: Params; // Parámetros de la ruta
  paramsSubscriptions: Subscription;

  isNew: boolean; // Controlar el comportamiend dependiendo la ruta

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      featured: new FormControl(false, Validators.required),
      imageUrl: new FormControl(''),
    });

    this.paramsSubscriptions = this.activatedRoute.params.subscribe(async (params: Params) => {
      this.params = params;
      this.isNew = params.newsId === 'new';
      if (!this.isNew) {
        this.fetchData();
      }
    });
  }

  async fetchData(): Promise<void> {
    try {
      let newsReq = (
        await this.newsService.getNewsById(this.params.newsId).toPromise()
      ).data();
      this.form = new FormGroup({
        title: new FormControl(newsReq.title, Validators.required),
        description: new FormControl(newsReq.description, Validators.required),
        date: new FormControl(newsReq.date.split('T')[0], Validators.required),
        featured: new FormControl(newsReq.featured, Validators.required),
        imageUrl: new FormControl(newsReq.imageUrl),
      });
    } catch (error) {
      console.log('Failed fetching data ==========', error);
    }
  }

  async uploadNew() {
    if (this.form.valid) {
      if (this.isNew) {
        let news : INew = this.form.value;
        news.date = new Date(news.date).toISOString();
        await this.newsService.addNew(news);
        this.router.navigate(['/', 'home', news.featured? 'featured' : 'news'])
      } else {
        let news : INew = this.form.value;
        news.date = new Date(news.date).toISOString();
        await this.newsService.updateNew(this.params.newsId, news);
        this.router.navigate(['/', 'home', news.featured? 'featured' : 'news'])
      }
    } else {
      alert('Form inválido')
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscriptions.unsubscribe();
  }
}
