import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  data:any=[]
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  url: string = "https://api-shorts.herokuapp.com/v1/movie/all"
  loading: boolean = true
  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get(this.url)
      .subscribe((res: any) => {
        if(res.success){
          this.data=res.data
          this.loading=false
        }
      })
  }

}
