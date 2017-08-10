import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Pokemon } from '../pokemon-interface';

@Component({
  selector: 'app-browse-pokemon',
  templateUrl: './browse-pokemon.component.html',
  styleUrls: ['./browse-pokemon.component.css']
})
export class BrowsePokemonComponent implements OnInit, OnDestroy {

  visiblePokemon: Pokemon[] = []
  selectedPokemon = null;
  seeSearch: boolean = true;

  constructor(private pokemonService: PokemonService,
      private route: ActivatedRoute, private router: Router) { }

  pokemonSubscription: Subscription

  ngOnInit() {
      this.pokemonService.getAllPokemon().subscribe(
          (pokemon: Pokemon[]) => this.visiblePokemon = pokemon,
          (error) => console.log(error)
      )
      this.pokemonSubscription = this.pokemonService.pokemonEmitter.subscribe((data: Pokemon[]) => {
          this.visiblePokemon = data;
          this.selectedPokemon = null;
      })
  }

  ngOnDestroy() {
      this.pokemonSubscription.unsubscribe();
  }

  choosePokemon(pokemon: Pokemon) {
      console.log(pokemon);
      this.selectedPokemon = pokemon;
      this.router.navigate(['/browse', pokemon.id], { relativeTo: this.route })
  }

  backToBrowse() {
      this.router.navigate(['/browse'], { relativeTo: this.route });
  }

  showFilter() {
      this.seeSearch = false;
      this.backToBrowse();
  }

  showSearch() {
      this.seeSearch = true;
      this.backToBrowse();
  }
}
