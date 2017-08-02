import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowsePokemonComponent } from './browse-pokemon/browse-pokemon.component';

import { PokemonService } from './pokemon.service';
import { SelectPromptComponent } from './browse-pokemon/select-prompt/select-prompt.component';
import { PokemonViewComponent } from './browse-pokemon/pokemon-view/pokemon-view.component';
import { PokemonProfileComponent } from './browse-pokemon/pokemon-view/pokemon-profile/pokemon-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BrowsePokemonComponent,
    SelectPromptComponent,
    PokemonViewComponent,
    PokemonProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
