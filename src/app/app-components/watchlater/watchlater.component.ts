import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../providers/database.service';


@Component({
  selector: 'app-watchlater',
  templateUrl: './watchlater.component.html',
  styleUrls: ['./watchlater.component.css']
})
export class WatchlaterComponent implements OnInit {

  loading: boolean = false;
  watchList: any;

  constructor(private dbService: DatabaseService) { }

  playNow: string;

  ngOnInit() {
    this.getWatchLater();
  }

  onPlay(url: string): void {
    this.playNow = url;
  }

  getWatchLater(): void {
    this.loading = true;
    this.dbService.getWatchLaterList()
    .subscribe(
      list => {
        this.watchList = list;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    )
  }


}
