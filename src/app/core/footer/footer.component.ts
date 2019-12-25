import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  facebookLogo: string;
  twitterLogo: string;
  twitchLogo: string;
  youtubeLogo: string;
  discordLogo: string;

  recruitmentMessage: string;

  constructor() {
    this.facebookLogo = 'assets/images/facebookIcon.png';
    this.twitterLogo = 'assets/images/twitterIcon.png';
    this.twitchLogo = 'assets/images/twitchIcon.png';
    this.youtubeLogo = 'assets/images/youtubeIcon.png';
    this.discordLogo = 'assets/images/discordIcon.png';
  }

  ngOnInit() {
    this.recruitmentMessage = '<Forever Forgotten> We are a weekend raiding guild recruiting all kinds of players. ' +
      'Our raid times are Fri & Sat 8PM-11PM PST. We do Mythic+, pvp, and other fun activities. We also welcome casual players too.';
  }

}
