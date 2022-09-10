import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
 @Input() data:any;
 imgUrl: string = "https://image.tmdb.org/t/p/w500"
  type: string="movie"

 constructor(private _route: ActivatedRoute) {
  _route.paramMap.subscribe((p:any)=>{
     if(window.location.href.split("/")[3]=="tv"){
      this.type="tv"
     }
   })  
 }

  ngOnInit(): void {
  
  }

}
