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
  recom: any = []
  similar: any = []
  credits: any = []
  imgUrl: string = "https://image.tmdb.org/t/p/w500"
  loading: boolean = true
  recom_loading: boolean = true
  credits_loading: boolean = true
  similar_loading: boolean = true
  url: string = "https://api.themoviedb.org/3/movie/"
  token: string = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw"
  constructor(private _route: ActivatedRoute, private _http: HttpClient) {
   _route.paramMap.subscribe((p:any)=>{
    this.id=p.get("id")
   this.callFn()
    })  
  }
   callFn():void{
    this.fetchRecomendated()
    this.fetchSimilar()
   this.fetchDetails()
   this.fetchCredits()
   }
  ngOnInit(): void {
   
  }
  fetchDetails():void{
    this.loading=true
    this._http.get(this.url+this.id , { headers: new HttpHeaders({ "Authorization": this.token }) })
    .subscribe((res: any) => {
     this.data=res
     this.loading=false
    })
  }
  
  fetchRecomendated():void{
    this.recom_loading=true
    this._http.get(this.url+this.id +"/recommendations", { headers: new HttpHeaders({ "Authorization": this.token }) })
    .subscribe((res: any) => {
     this.recom=res.results
     this.recom_loading=false
    })
  }
  fetchSimilar():void{
    this.similar_loading=true
    this._http.get(this.url+this.id +"/similar", { headers: new HttpHeaders({ "Authorization": this.token }) })
    .subscribe((res: any) => {
     this.similar=res.results
     this.similar_loading=false
    })
  }

  fetchCredits():void{
    this.credits_loading=true
    this._http.get(this.url+this.id +"/credits", { headers: new HttpHeaders({ "Authorization": this.token }) })
    .subscribe((res: any) => {
     this.credits=res.cast
     this.credits_loading=false
    })
  }
}
