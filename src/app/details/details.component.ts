import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any;
  data: any = []
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  url: string = "https://api-shorts.herokuapp.com/v1/movie?id="
  loading: boolean = true
  constructor(private _route: ActivatedRoute, private _http: HttpClient) {
    this.id = _route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this._http.get(this.url + this.id)
      .subscribe((res: any) => {
        if (res.success && res.data) {
          this.data = res.data
          this.loading = false
        }
      })
  }

}
