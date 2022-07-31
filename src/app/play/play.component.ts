import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  id: any;
  data: any = []
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  url: string = "https://api-shorts.herokuapp.com/v1/movie?id="
  loading: boolean = true
  constructor(private _route: ActivatedRoute, private _http: HttpClient) {
    this.id = _route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this._http.get(this.url+this.id)
    .subscribe((res: any) => {
     this.data=res.data
     this.loading=false
    })
  }

}
