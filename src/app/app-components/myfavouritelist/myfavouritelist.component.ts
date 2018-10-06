import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-myfavouritelist',
  templateUrl: './myfavouritelist.component.html',
  styleUrls: ['./myfavouritelist.component.css']
})
export class MyfavouritelistComponent implements OnInit {

  loading: boolean = false;
  favList: any;
  playNow: string;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.getFavList();
  }

  onPlay(url: string): void {
    this.playNow = url;
  }

  getFavList(): void {
    this.loading = true;
    this.dbService.getFavouritesList()
    .subscribe(
      list => {
        this.favList = list;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}
