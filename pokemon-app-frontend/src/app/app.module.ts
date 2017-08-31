import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowsePokemonComponent } from './browse-pokemon/browse-pokemon.component';

import { PokemonService } from './pokemon.service';
import { AuthService } from './auth.service';
import { SelectPromptComponent } from './browse-pokemon/select-prompt/select-prompt.component';
import { PokemonViewComponent } from './browse-pokemon/pokemon-view/pokemon-view.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';
import { FilterBrowseComponent } from './filter-browse/filter-browse.component';
import { PokemonSearchBrowseComponent } from './pokemon-search-browse/pokemon-search-browse.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BrowsePokemonComponent,
    SelectPromptComponent,
    PokemonViewComponent,
    PokemonProfileComponent,
    FilterBrowseComponent,
    PokemonSearchBrowseComponent,
    SigninComponent,
    SignupComponent,
    UserHomeComponent,
    AuthFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [PokemonService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
