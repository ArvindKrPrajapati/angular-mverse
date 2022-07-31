import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @Input() title: any;
  data: any = []
  pageTitle: any;
  page: number = 1
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  loading: boolean = true
  url: string = "https://api.themoviedb.org/3"
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"
  constructor(private _http: HttpClient, private _route: ActivatedRoute) {
    _route.paramMap.subscribe((p: any) => {
      this.page = Number(p.get("page"))
      if (this.page > 1) {
        this.handleChange()
      }
    })
  }

  ngOnInit(): void {
    if (this.page == 1) {
      this.handleChange()
    }
  }

  handleChange() {
    if (this.title == "popular") {
      this.pageTitle = "Popular Movies"
      this.fetchData(this.url + "/movie/popular?page=" + this.page)
    } else if (this.title == "top-rated") {
      this.pageTitle = "Top Rated Movies"
      this.fetchData(this.url + "/movie/top_rated?page=" + this.page)
    } else if (this.title == "hindi-movies") {
      this.pageTitle = "Hindi Movies"
      const d = new Date(Date.now())
      let m = Number(d.getMonth()) + 1
      const dt = d.getFullYear() + "-" + ((m < 10) ? "0" + m : m) + "-" + d.getDate()
      this.fetchData(this.url + "/discover/movie?with_original_language=hi&primary_release_date.lte=" + dt + "&sort_by=release_date.desc&page=" + this.page)
    } else if (this.title == "watch-now") {
      this.pageTitle = "Watch Now"
      this.loading = true
      this._http.get("https://api-shorts.herokuapp.com/v1/movie/all?page="+this.page)
        .subscribe((res: any) => {
          this.data = res.data
          this.loading = false
        })
    } else {
      this.pageTitle = "All Movies"
      this.fetchData(this.url + "/discover/movie?page=" + this.page)
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
