import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Output() pause: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  playlists: any;
  playerShow: string;
  plays: Array<any> = [];
  selectedPlays: number;
  playNow: string = null;
  showProgress: boolean = false;
  playToggle: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getPlaylist();
  }

  onPlay(url: string): void {
    this.playToggle = true;
    this.showProgress = true;
    this.playNow = url;
    console.log(this.playNow);
  }

  onPause(): void {
    this.pause.emit();
  }

  getPlaylist(): void {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getPlaylistsByChannel(id).subscribe(
      data => {
        console.log(data);
        this.playlists = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  onPlaylist( link: string, id): void {
    this.loading = true;
    this.plays = [];
    this.selectedPlays = id;
    var parseString = require('xml2js').parseString;
    
    // var fs = require('fs'),
    // xml2js = require('xml2js');
 
    // let url = localStorage.getItem('playUrl');
    this.apiService.getPlaylistPlays(link).subscribe(
      (res) => {
        this.loading = false;
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
                name: '',
                id: id
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
        console.log(this.plays);
        this.loading = false;
        this.onPlay(this.plays[0].audio.url);
      }
    );
  }

}
