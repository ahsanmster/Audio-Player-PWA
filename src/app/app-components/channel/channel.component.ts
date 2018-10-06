import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channel: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getChannelDetail();
  }

  getChannelDetail(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.apiService.getChannelById(id).subscribe(
      data => {
        this.channel = data;
      },
      err => {

      }
    );
  }

}
