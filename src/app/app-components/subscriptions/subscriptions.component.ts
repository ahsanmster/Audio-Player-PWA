import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  loading: boolean = false;
  subChannels: any;

  constructor(private apiService: ApiService, private dbService: DatabaseService) { }

  ngOnInit() {
    this.getSubChannels();
  }

  getSubChannels(): void {
    this.loading = true;
    this.dbService.getSubscriptionsList()
    .subscribe(
      channels => {
        this.subChannels = channels;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}
