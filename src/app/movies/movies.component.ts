import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  // @Input() title: any;
  title:any;
  data: any = []
  pageTitle: any;
  page: number = 1
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  loading: boolean = true
  url: string = "https://api.themoviedb.org/3"
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"
  type: string="movie";
  constructor(private _http: HttpClient, private _route: ActivatedRoute) {
    _route.paramMap.subscribe((p: any) => {
      if(window.location.href.split("/")[3]=="tv"){
        this.type="tv"
       }
       this.title=window.location.href.split("/")[4];
       
        this.page = Number(p.get("page"))
        this.handleChange()
    })
  }

  ngOnInit(): void { 
    
  }

  handleChange() {
    console.log(this.title);
    
    if (this.title == "popular") {
      this.pageTitle = "Popular "+this.type
      this.fetchData(this.url + "/"+this.type+"/popular?page=" + this.page)
    } else if (this.title == "top-rated") {
      this.pageTitle = "Top Rated "+this.type
      this.fetchData(this.url + "/"+this.type+"/top_rated?page=" + this.page)
    } else if (this.title == "hindi-movies") {
      this.pageTitle = "Hindi "+this.type
      const d = new Date(Date.now())
      let m = Number(d.getMonth()) + 1
      const dt = d.getFullYear() + "-" + ((m < 10) ? "0" + m : m) + "-" + d.getDate()
      this.fetchData(this.url + "/discover/"+this.type+"?with_original_language=hi&primary_release_date.lte=" + dt + "&sort_by=release_date.desc&page=" + this.page)
    } else if (this.title == "watch-now") {
      this.pageTitle = "Watch Now"
      this.loading = true
      this._http.get("https://api-shorts.herokuapp.com/v1/movie/all?page="+this.page)
        .subscribe((res: any) => {
          this.data = res.data
          this.loading = false
        })
    } else {
      this.pageTitle = "All "+this.type
      this.fetchData(this.url + "/discover/"+this.type+"?page=" + this.page)
    }
  }

  fetchData(url: any) {
    this.loading = true
    this._http.get(url, { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
        this.data = res.results
        this.loading = false
      })
  }

}
