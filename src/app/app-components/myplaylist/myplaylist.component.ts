import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.component.html',
  styleUrls: ['./myplaylist.component.css']
})
export class MyplaylistComponent implements OnInit {

  loading: boolean = false;
  playNow: string;
  playlist: any;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getPlaylist();
  }

  onPlay(url: string): void {
    this.playNow = url;
  }

  getPlaylist(): void {
    this.loading = true;
    this.dbService.getPlaylist()
    .subscribe(
      list => {
        this.playlist = list;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}
