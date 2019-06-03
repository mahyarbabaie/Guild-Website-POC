import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaiderioService {

  constructor(private https: HttpClient) { }

  getRaidProgression() {
    return this.https.get(
      'https://raider.io/api/v1/guilds/profile?region=us&realm=proudmoore&name=forever%20forgotten&fields=raid_progression')
      .pipe(
        map(
          (data) => {
            const responseJson = JSON.parse(JSON.stringify(data));
            if (responseJson === null) {
              console.log('Failed to retrieve raid progression data from raider.io');
            } else {
              return responseJson;
            }
          }
        )
      );
  }
}
