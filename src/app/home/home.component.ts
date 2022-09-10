import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild,OnInit } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popular: any = []
  top_rated: any = []
  hindi: any = []

  imgUrl: string = "https://image.tmdb.org/t/p/w500"
  url: string = "https://api.themoviedb.org/3"
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"

  loading: boolean = true
  constructor(private _http: HttpClient) { }

  images:any = []
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  carouselData:any=[]
  @ViewChild('carousel', {static : true}) carousel: any;
  ngOnInit(): void {
    this.getdata(this.url+"/movie/popular","popular")
    this.getdata(this.url+"/movie/top_rated","top_rated")
    const d = new Date(Date.now())
    let m = Number(d.getMonth()) + 1
    const dt = d.getFullYear() + "-" + ((m < 10) ? "0" + m : m) + "-" + d.getDate()
    this.getdata(this.url + "/discover/movie?with_original_language=hi&primary_release_date.lte="+dt+"&sort_by=release_date.desc","hindi")
  }
  getdata(url:string,type:string) {
    this._http.get(url, { headers: new HttpHeaders({ "Authorization": this.token }) })
      .subscribe((res: any) => {
        if(type=="popular"){
          this.popular=res.results.slice(6,19)
          this.carouselData=res.results.slice(0,6)
          this.images=res.results.map((n:any) => this.imgUrl+n.backdrop_path).slice(0,6);
          
          this.loading=false
        }else if(type=="top_rated"){
          this.top_rated=res.results
        }if(type=="hindi"){
          this.hindi=res.results
        }
      
      })
  }


  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
