import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-embed-video',
  templateUrl: './embed-video.component.html',
  styleUrls: ['./embed-video.component.css']
})
export class EmbedVideoComponent implements OnInit {

  id: any;
  data: any;
  s: Number = 1
  e: Number = 1
  season: Number = 1
  loading: boolean = true
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  url: string = "https://api.themoviedb.org/3/"
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"
  src: any;
  type: string = "movie";
  e_loading: boolean = true;
  episodes: any;
  constructor(private _route: ActivatedRoute, private _http: HttpClient, public sanitizer: DomSanitizer) {
    _route.paramMap.subscribe((p: any) => {
      this.id = p.get("id")
      if (window.location.href.split("/")[3] == "tv") {
        this.type = "tv"
        this.s = p.get("s")
        this.e = p.get("e")
        this.fetchEpisodes()
      }

    })
  }

  ngOnInit(): void {
    this.fetchData()

  }
  fetchData() {
    this.loading = true
    let src = "https://vidsrc.me/embed/" + this.id
    if (this.type = "tv") {
      src = "https://vidsrc.me/embed/" + this.id + "/" + this.s + "-" + this.e
    }
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this._http.get(this.url + this.type + "/" + this.id, { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
        this.data = res
        this.season = res.number_of_seasons;
        this.loading = false
      })
  }
  fetchEpisodes() {
    this.e_loading = true
    this._http.get(this.url + this.type + "/" + this.id + "/season/" + this.s, { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
        this.episodes = res.episodes
        console.error(res)
        this.e_loading = false
      })
  }


}
