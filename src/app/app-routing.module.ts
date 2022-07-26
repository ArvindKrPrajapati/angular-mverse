import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { PlayComponent } from './play/play.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
 
  {
    path:"search",
    component:SearchComponent
  },
  {
    path:"all",
    component:MoviesComponent
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
