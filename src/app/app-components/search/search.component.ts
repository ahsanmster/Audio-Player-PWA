import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  search(): void {
  }

}
