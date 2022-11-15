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
  active = "vidsrc"
  tv_imdb = ""
  constructor(private _route: ActivatedRoute, private _http: HttpClient, public sanitizer: DomSanitizer) {
    _route.paramMap.subscribe((p: any) => {
      this.id = p.get("id")
      if (window.location.href.split("/")[3] == "tv") {
        this.type = "tv"
        this.s = p.get("s")
        this.e = p.get("e")
        this.active = "vidsrc"
        let src = "https://vidsrc.me/embed/" + this.id + "/" + this.s + "-" + this.e
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        this.fetchEpisodes()
      } else {
        let src = "https://vidsrc.me/embed/" + this.id
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
      }

    })
  }

  ngOnInit(): void {
    this.fetchData()

  }
  fetchData() {
    this.loading = true
    this._http.get(this.url + this.type + "/" + this.id, { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
        this.data = res
        this.season = res.number_of_seasons;
        this.loading = false
      }, (err: any) => {
        // alert(this.type)
      })
    if (this.type == "tv") {
      this._http.get(this.url + "tv/" + this.id + "/external_ids", { headers: new HttpHeaders({ "Authorization": this.token }) })
        .subscribe((res: any) => {
          this.tv_imdb = res.imdb_id;

        }, (err: any) => {
          // alert(this.type)
        })
    }
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
  changeServer(name: string) {
    switch (name) {
      case "gdrive":
        this.active = "gdrive"
        let src = "http://database.gdriveplayer.us/player.php?imdb="
        if (this.type == "tv") {
          src += this.tv_imdb + "&type=series&season=" + this.s + "&episode=" + this.e
          this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        } else {
          this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src + this.data.imdb_id);
        }
        break;

      default:
        this.active = "vidsrc"
        let s = "https://vidsrc.me/embed/"
        if (this.type == "tv") {
          this.src = this.sanitizer.bypassSecurityTrustResourceUrl(s + this.id + "/" + this.s + "-" + this.e);
        } else {
          this.src = this.sanitizer.bypassSecurityTrustResourceUrl(s + this.id);
        }
        break;
    }
  }

}
