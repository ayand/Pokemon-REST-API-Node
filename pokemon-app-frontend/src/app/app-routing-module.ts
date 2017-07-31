import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { BrowsePokemonComponent } from './browse-pokemon/browse-pokemon.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'browse', component: BrowsePokemonComponent },
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
