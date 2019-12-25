import { Component, OnInit } from '@angular/core';
import {RaiderioService} from '../../../../shared/raiderio.service';

@Component({
  selector: 'app-home-raidprogress',
  templateUrl: './home-raidprogress.component.html',
  styleUrls: ['./home-raidprogress.component.scss']
})
export class HomeRaidprogressComponent implements OnInit {

  normalBodProgression: string;
  heroicBodProgression: string;
  mythicBodProgression: string;
  normalCosProgression: string;
  heroicCosProgression: string;
  mythicCosProgression: string;
  normalEpProgression: string;
  heroicEpProgression: string;
  mythicEpProgression: string;

  constructor(private raiderioService: RaiderioService) {}

  ngOnInit() {
    this.retrieveNormalBodRaidProgress();
    this.retrieveHeroicBodRaidProgress();
    this.retrieveMythicBodRaidProgress();
    this.retrieveNormalCosRaidProgress();
    this.retrieveHeroicCosRaidProgression();
    this.retrieveMythicCosRaidProgression();
    this.retrieveNormalEpRaidProgression();
    this.retrieveHeroicEpRaidProgression();
    this.retrieveMythicEpRaidProgression();
  }

  retrieveNormalBodRaidProgress() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.normalBodProgression = res.raid_progression['battle-of-dazaralor']['normal_bosses_killed'];
        this.normalBodProgression = this.normalBodProgression + '/9N';
      });
  }

  retrieveHeroicBodRaidProgress() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
       this.heroicBodProgression = res.raid_progression['battle-of-dazaralor']['heroic_bosses_killed'];
        this.heroicBodProgression = this.heroicBodProgression + '/9H';
      });
  }

  retrieveMythicBodRaidProgress() {
    return this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.mythicBodProgression = res.raid_progression['battle-of-dazaralor']['mythic_bosses_killed'];
        this.mythicBodProgression = this.mythicBodProgression + '/9M';
      });
  }

  retrieveNormalCosRaidProgress() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.normalCosProgression = res.raid_progression['crucible-of-storms']['normal_bosses_killed'];
        this.normalCosProgression = this.normalCosProgression + '/2N';
      });
  }

  retrieveHeroicCosRaidProgression() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.heroicCosProgression = res.raid_progression['crucible-of-storms']['heroic_bosses_killed'];
        this.heroicCosProgression =  this.heroicCosProgression + '/2H';
      });
  }

  retrieveMythicCosRaidProgression() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.mythicCosProgression = res.raid_progression['crucible-of-storms']['mythic_bosses_killed'];
        this.mythicCosProgression = this.mythicCosProgression + '/2M';
      });
  }

  retrieveNormalEpRaidProgression() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.normalEpProgression = res.raid_progression['the-eternal-palace']['normal_bosses_killed'];
        this.normalEpProgression = this.normalEpProgression + '/8N';
      });
  }
  retrieveHeroicEpRaidProgression() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.heroicEpProgression = res.raid_progression['the-eternal-palace']['heroic_bosses_killed'];
        this.heroicEpProgression = this.heroicEpProgression + '/8H';
      });
  }
  retrieveMythicEpRaidProgression() {
    this.raiderioService.getRaidProgression()
      .subscribe((res) => {
        this.mythicEpProgression = res.raid_progression['the-eternal-palace']['mythic_bosses_killed'];
        this.mythicEpProgression = this.mythicEpProgression + '/8M';
      });
  }
}
