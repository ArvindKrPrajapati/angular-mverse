import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  imgUrl: string = "https://image.tmdb.org/t/p/w500"
  loading: boolean = true
  url: string = "https://api.themoviedb.org/3/movie/"
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"
  constructor(private _route: ActivatedRoute, private _http: HttpClient) {
    this.id = _route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this._http.get(this.url+this.id , { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
       this.data=res
       this.loading=false
      })
  }

}
