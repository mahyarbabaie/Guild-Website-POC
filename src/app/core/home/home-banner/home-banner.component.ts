import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  guildLogo: string;
  guildName: string;

  constructor() {
    this.guildLogo = 'assets/images/GuildLogo.png';
    this.guildName = 'Forever Forgotten';
  }

  ngOnInit() {
  }
}
