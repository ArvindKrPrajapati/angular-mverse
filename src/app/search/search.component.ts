import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class SearchComponent implements OnInit {

  title = 'MVerse';
  data: any = []
  linksLoading: boolean = false
  link = {
    p_320: "", p_480: "", p_720: "", p_1080: ""
  }
  saving: boolean = false
  selectedmovie: any;
  url: string = "https://api.themoviedb.org/3/search/movie/?query="
  imgUrl: string = "https://image.tmdb.org/t/p/w300"
  addUrl: string = "https://api-shorts.herokuapp.com/v1/movie"
  loading: boolean = false
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"
  constructor(private _http: HttpClient, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any, d: any) {
    this.linksLoading = true
    this.selectedmovie = d
    this.modalService.open(content);
    this._http.get(this.addUrl + "?id=" + d.id)
      .subscribe((res: any) => {
        this.linksLoading = false

        if (res.data) {
          console.log(res.data.links);

          this.link = {
            p_1080: res.data.links[res.data.links.length - 1].p_1080,
            p_320: res.data.links[res.data.links.length - 1].p_320,
            p_480: res.data.links[res.data.links.length - 1].p_480,
            p_720: res.data.links[res.data.links.length - 1].p_720
          }
        }
      })

  }

  searchMovie(e: any) {
    const text = e.target.value;
    this.loading = true
    this._http.get(this.url + text, { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
        this.loading = false
        this.data = res.results;
      })
  }

  save() {
    if (!this.linksLoading) {
      const d = { ...this.selectedmovie, links: this.link }
      this.saving = true
      this._http.post(this.addUrl + "/add", d)
        .subscribe((res: any) => {
          if (res.success) {
            this.saving = false
            this.link = { p_1080: "", p_320: "", p_480: "", p_720: "" }
            this.modalService.dismissAll()
          }
        })
    }
  }
  parsefloat(rating: any) {
    return parseFloat(rating).toFixed(2)
  }

  ngOnInit(): void {
  }

}
