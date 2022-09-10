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
  // for series
  {
    path:"tv",
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:"tv/details/:id",
    component:DetailsComponent
  },
  {
    path:"tv/all/:page",
    component:AllComponent
  },
  {
    path:"tv/popular/:page",
    component:PopularComponent
  },
  {
    path:"tv/top-rated/:page",
    component:TopRatedComponent
  },
  {
    path:"tv/hindi-movies/:page",
    component:HindiComponent
  },
  {
    path:"tv/search",
    component:SearchComponent
  },
  {
    path:"tv/embed/:id/:s/:e",
    component:FembedComponent
  },
//  for movies
  {
    path:"movie/search",
    component:SearchComponent
  },
  {
    path:"watch-now/:page",
    component:WatchNowComponent
  },
  {
    path:"movie/all/:page",
    component:AllComponent
  },
  {
    path:"movie/popular/:page",
    component:PopularComponent
  },
  {
    path:"movie/top-rated/:page",
    component:TopRatedComponent
  },
  {
    path:"movie/hindi-movies/:page",
    component:HindiComponent
  },
  {
    path:"movie/details/:id",
    component:DetailsComponent
  },
  {
    path:"play/:id",
    component:PlayComponent
  },
  {
    path:"movie/embed/:id",
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
