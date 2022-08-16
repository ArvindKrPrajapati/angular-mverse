import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { DetailsComponent } from './details/details.component';
import { FembedComponent } from './fembed/fembed.component';
import { HindiComponent } from './hindi/hindi.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { PopularComponent } from './popular/popular.component';
import { SearchComponent } from './search/search.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { WatchNowComponent } from './watch-now/watch-now.component';

const routes: Routes = [
 
  {
    path:"search",
    component:SearchComponent
  },
  {
    path:"watch-now/:page",
    component:WatchNowComponent
  },
  {
    path:"all/:page",
    component:AllComponent
  },
  {
    path:"popular/:page",
    component:PopularComponent
  },
  {
    path:"top-rated/:page",
    component:TopRatedComponent
  },
  {
    path:"hindi-movies/:page",
    component:HindiComponent
  },
  {
    path:"details/:id",
    component:DetailsComponent
  },
  {
    path:"play/:id",
    component:PlayComponent
  },
  {
    path:"embed/:id",
    component:FembedComponent
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
