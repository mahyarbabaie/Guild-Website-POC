import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  guildLogo: string;
  guildName: string;
  allianceLogo: string;

  constructor() {
    this.guildLogo = '../assets/images/GuildLogo.png';
    this.guildName = 'Forever Forgotten';
    this.allianceLogo = '../assets/images/AllianceLogo.png';
  }

  ngOnInit() {
  }
}
