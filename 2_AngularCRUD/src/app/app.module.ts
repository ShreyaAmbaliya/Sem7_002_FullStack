import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { ListComponent } from './components/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import{RouterModule,Routes} from '@angular/router';
import {CountryService} from './shared/country.service';
import{HttpClientModule} from '@angular/common/http';
import{FormsModule} from '@angular/forms';
const appRoutes:Routes=[
  {path:'',component:ListComponent},
  {path:'createUpdate',component:CreateUpdateComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CreateUpdateComponent,
    ListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
