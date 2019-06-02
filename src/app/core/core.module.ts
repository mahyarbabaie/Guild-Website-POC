import { NgModule } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {HomeContentComponent} from './home/home-content/home-content.component';
import {AppRoutingModule} from '../app-routing-module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeContentComponent
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
    AuthService
  ]
})

export class CoreModule {}
