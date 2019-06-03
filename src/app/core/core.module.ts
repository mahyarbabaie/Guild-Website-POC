import { NgModule } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {HomeContentComponent} from './home/home-content/home-content.component';
import {AppRoutingModule} from '../app-routing-module';
import {SharedModule} from '../shared/shared.module';
import { HomeNewsComponent } from './home/home-content/home-news/home-news.component';
import { HomeRecruitmentComponent } from './home/home-content/home-recruitment/home-recruitment.component';
import { HomeRaidprogressComponent } from './home/home-content/home-raidprogress/home-raidprogress.component';
import {RaiderioService} from '../shared/raiderio.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeContentComponent,
    HomeNewsComponent,
    HomeRecruitmentComponent,
    HomeRaidprogressComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthService,
    RaiderioService
  ]
})

export class CoreModule {}
