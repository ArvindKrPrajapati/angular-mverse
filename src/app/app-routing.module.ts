import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
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
