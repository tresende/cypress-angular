import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './core/theming.service';

export interface Repo {
  name: string;
  id: number;
  language: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  themingSubscription: Subscription;
  form: any = {};
  datasource: Repo[] = [];
  displayedColumns: string[];
  constructor(private theming: ThemingService) {
  }

  @HostBinding('class') public cssClass;

  ngOnInit() {
    this.themingSubscription = this.theming.theme.subscribe(theme => {
      this.cssClass = theme;
    });
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  async getData() {
    const response = await fetch('https://api.github.com/users/tresende/repos');
    const json = await response.json();
    this.displayedColumns = ['id', 'name', 'language'];
    this.datasource = json;

  }
}
