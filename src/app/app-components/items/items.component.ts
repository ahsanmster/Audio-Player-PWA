import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiService } from '../../providers/api.service';
import { DatabaseService } from '../../providers/database.service';
import { AuthService } from '../../providers/auth.service';
import { MatSnackBar } from '@angular/material'
import { Router } from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  loading: boolean = false;
  channels: Array<any> = [];
  subChannels: Array<any> = [];
  subscribe: Array<boolean>;
  user: any;
  perPage: number = 10;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private dbService: DatabaseService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { 
      this.user = this.authService.getCurrentUser();
    }

  ngOnInit() {
    this.getChannels();
  }

  getChannels(): void {
    this.getApiChannels();
    this.getSubscribedChannels();
  }

  getApiChannels(): any {
    this.loading = true;
    this.apiService.getAllChannels(this.perPage)
    .subscribe(
      data => {
        this.channels = data;
        console.log(this.channels);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubscribe(id: number, desc: string, name: string, link: string): void {

    if(this.authService.getCurrentUser()) {
      this.dbService.addSubscription(id, desc, name, link)
      .then(_ => {
        console.log('success');
        this.showToast('SUBSCRIBED');
      })
      .catch(err => console.log(err, 'You do not have access!'))
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  onUnsubscribe(): void {
    this.dbService.unsubscribe()
    .then(_ => {
      console.log('success');
      this.showToast("UNSUBSCRIBED");
    })
    .catch(err => console.log(err, 'You do not have access!'))
  }

  getSubscribedChannels(): void {

    this.loading = true;
    this.dbService.getSubscriptionsList()
    .subscribe(
      subs => {
        this.subChannels = subs;
        console.log(this.subChannels);
      },
      err => {
        console.log(err);
      }
    );
  }

  get channelsList(): any {
    this.loading = false;
    if(this.channels.length > 0 && this.subChannels.length > 0) {
      this.loading = false;

      for(let i=0; i < this.subChannels.length; i++) {
        for(let j=0; j < this.channels.length; j++) { 
          if(this.subChannels[i].id == this.channels[j].id) {
            this.channels[j].status = 1;
          }
        }
      }
    }
    return this.channels;
  }
  showToast(msg: string): void {
    this.snackBar.open( msg, "", {
      duration: 2000,
    });
  }

  get checkAuth(): boolean {
    if(this.authService.getCurrentUser) {
      return true;
    } else {
      return false;
    }
  }

  onViewMore(page): void {
    this.loading = true;
    this.perPage += page;
    this.apiService.getAllChannels(this.perPage)
    .subscribe(
      data => {
        this.channels = data;

      },
      err => {
        console.log(err);
      }
    );
  }

}
