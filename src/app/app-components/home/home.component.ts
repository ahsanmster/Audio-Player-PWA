import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  channels: Array<any>;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    // this.getChannels();
  }

  // getChannels(): any {
  //   this.apiService.getAllChannels()
  //   .subscribe(
  //     data => {
  //       this.channels = data;
  //       console.log(this.channels);
  //     },
  //     err => {

  //     }
  //   );
  // }

}
