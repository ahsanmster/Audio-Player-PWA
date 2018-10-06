import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { HttpResponse } from 'selenium-webdriver/http';
import { DatabaseService } from '../../providers/database.service';
import { AuthService } from '../../providers/auth.service';
import {MatSnackBar} from '@angular/material';
import { audios } from '../../providers/models/audio';
import { Router } from '@angular/router';

// import { convert } from 'xml-to-json-promise';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.css']
})
export class PlaysComponent implements OnInit {

  loading: boolean = false;
  plays: any[] = [];
  favPlays: Array<any> = [];
  watchLaterPlays: Array<any> = [];
  playNow: string;

  constructor(
    private apiService: ApiService,
    private dbService: DatabaseService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.getPlays();
  }

  onPlay(url: string): void {
    this.playNow = url;
    console.log(this.playNow);
  }

  onAddFav(url: string, title: string, subtitle: string): void {
    if(this.authService.getCurrentUser()) {
      this.dbService.addFavourite(url, title, subtitle)
    .then(_ => {
      console.log('success');
      this.showToast("ADDED TO FAVOURITES");
    })
    .catch(err => console.log(err, 'You do not have access!'))
    } else {
      this.router.navigate(['/login']);
    }
  }

  onAddPlaylist(url: string, title: string, subtitle: string): void{
    if(this.authService.getCurrentUser()) {
      this.dbService.addToPlaylist(url, title, subtitle)
    .then(_ => {
      console.log('success');
      this.showToast("ADDED TO PLAYLIST");
    })
    .catch(err => console.log(err, 'You do not have access!'))
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  onAddWatchLater(url: string, title: string, subtitle: string): void {
    if(this.authService.getCurrentUser()) {
      this.dbService.addWatchLater(url, title, subtitle)
    .then(_ => {
      console.log('success');
      this.showToast("ADDED TO WATCH LATER");
    })
    .catch(err => console.log(err, 'You do not have access!'))
    } else {
      this.router.navigate(['/login']);
    }
  }

  getPlays(): void {
    this.getApiPlays();
    this.getFavPlays();
    this.getWatchLater();
  }

  getFavPlays(): void {
    this.loading = true;
    this.dbService.getFavouritesList()
    .subscribe(
      subs => {
        this.favPlays = subs;
        console.log(this.favPlays);
      },
      err => {
        console.log(err);
      }
    );
  }

  getWatchLater(): void {
    this.loading = true;
    this.dbService.getWatchLaterList()
    .subscribe(
      subs => {
        this.watchLaterPlays = subs;
        console.log(this.watchLaterPlays);
      },
      err => {
        console.log(err);
      }
    );
  }

  getApiPlays(): void {
    this.loading = true;
    var parseString = require('xml2js').parseString;
    
    // var fs = require('fs'),
    // xml2js = require('xml2js');
 
    let url = localStorage.getItem('playUrl');
    this.apiService.getPlaylistPlays(url).subscribe(
      (res) => {
      },
      err => {
        const xml = err.error.text;
        parseString(xml, (err, result) => {
            const audioData = result.rss.channel[0].item;
            console.log(audioData)

            audioData.forEach( element => {
              let obj = {
                title: '',
                subtitle: '',
                category: '',
                pubDate: '',
                name: ''

              };
              for (let property in element) {
                if (property == 'itunes:subtitle') {
                  obj.subtitle = element[property][0];
                };
              }
              obj.name = element.category[0];
              obj.title = element.title.toString();
              obj.category = element.category[1];
              obj.pubDate = element.pubDate[0];
              this.plays.push({
                info: obj,
                audio: element.enclosure[0].$
              });
            });
        });
        console.log(">>>>>>");
        console.log(this.plays);
      }
    );
  }

  get playlist(): any {
    this.loading = false;
    if(this.favPlays.length > 0 && this.plays.length > 0 && this.watchLaterPlays.length > 0) {
      this.loading = false;

      for(let i=0; i < this.favPlays.length; i++) {
        for(let j=0; j < this.plays.length; j++) { 
          let favTitle = this.favPlays[i].title.replace(/[^A-Z0-9]/ig, "_");
          let playsTitle = this.plays[j].info.title.replace(/[^A-Z0-9]/ig, "_");
          if(favTitle == playsTitle) {
            this.plays[j].info.fav = true;
          }
        }
      }

      for(let i=0; i < this.watchLaterPlays.length; i++) {
        for(let j=0; j < this.plays.length; j++) { 
          let watchLaterTitle = this.watchLaterPlays[i].title.replace(/[^A-Z0-9]/ig, "_");
          let playsTitle = this.plays[j].info.title.replace(/[^A-Z0-9]/ig, "_");
          if(watchLaterTitle == playsTitle) {
            this.plays[j].info.watchlater = true;
          }
        }
      } 
    }
    return this.plays;
  }

  showToast(msg: string): void {
    this.snackBar.open( msg, "", {
      duration: 2000,
    });
  }

}
