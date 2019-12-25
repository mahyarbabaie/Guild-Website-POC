import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {

  guildRanksImage: string;

  constructor() {
    this.guildRanksImage = '../assets/images/GuildRanks.png';
  }

  ngOnInit() {
  }

}
