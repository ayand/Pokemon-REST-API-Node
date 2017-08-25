import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { BrowsePokemonComponent } from './browse-pokemon/browse-pokemon.component';
import { SelectPromptComponent } from './browse-pokemon/select-prompt/select-prompt.component';
import { PokemonViewComponent } from './browse-pokemon/pokemon-view/pokemon-view.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'browse', component: BrowsePokemonComponent, children: [
        { path: '', component: SelectPromptComponent },
        { path: ':id', component: PokemonViewComponent }
    ] },
    { path: 'home', component: UserHomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
