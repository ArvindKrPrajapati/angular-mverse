import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  type: string="movie";

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
