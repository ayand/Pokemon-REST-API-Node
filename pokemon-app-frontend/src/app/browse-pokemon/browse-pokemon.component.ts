import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

interface Pokemon {
        id: number;
        ndex: number;
        forme: string;
        species: string;
        type1: string;
        type2: string;
        ability1: string;
        ability2: string;
        abilityH: string;
        hp: number;
        attack: number;
        defense: number;
        spattack: number;
        spdefense: number;
        speed: number;
        eggGroup1: string;
        eggGroup2: string;
}

@Component({
  selector: 'app-browse-pokemon',
  templateUrl: './browse-pokemon.component.html',
  styleUrls: ['./browse-pokemon.component.css']
})
export class BrowsePokemonComponent implements OnInit, OnDestroy {

  firstList: string[] = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
      'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon',
      'Ghost', 'Dark', 'Steel', 'Fairy'];

  secondList: string[] = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
      'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon',
      'Ghost', 'Dark', 'Steel', 'Fairy'];

  type1: string = null;
  type2: string = null;

  httpSubscription: Subscription;
  pokemonSubscription: Subscription;

  visiblePokemon: Pokemon[] = []

  pokemonSelected: boolean;
  selectedPokemon = null;

  constructor(private pokemonService: PokemonService,
      private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.firstList.sort((a, b) => a > b ? 1 : -1)
      this.secondList.sort((a, b) => a > b ? 1 : -1)

      this.pokemonService.getAllPokemon().subscribe(
          (pokemon: Pokemon[]) => this.visiblePokemon = pokemon,
          (error) => console.log(error)
      )
      this.pokemonSubscription = this.pokemonService.pokemonEmitter.subscribe((data: Pokemon[]) => {
          this.visiblePokemon = data;
      })
      this.pokemonSelected = false;
  }

  ngOnDestroy() {
      //this.httpSubscription.unsubscribe();
      this.pokemonSubscription.unsubscribe();
  }

  selectType1(type: string) {
      if (this.type1 == type) {
          this.type1 = null;
          this.secondList.push(type);
          this.secondList.sort((a, b) => a > b ? 1 : -1);
          this.pokemonService.showAllPokemon();
      } else {
          const color = this.type1;
          this.type1 = type;
          const index = this.secondList.indexOf(type);
          if (index > -1) {
              console.log('Removing');
              this.secondList.splice(index, 1);
          }
          if (color != null) {
              this.secondList.push(color);
              this.secondList.sort((a, b) => a > b ? 1 : -1);
          }
          this.pokemonService.showPokemonOfOneType(type);
      }
      this.type2 = null;
      this.pokemonSelected = false;
      this.selectedPokemon = null;
      this.router.navigate(['/browse'], { relativeTo: this.route })
      console.log('navigated');
  }

  selectType2(type: string) {
      if (this.type2 == type) {
          this.type2 = null;
          this.pokemonService.showPokemonOfOneType(this.type1);
      } else {
          this.type2 = type;
          this.pokemonService.showPokemonOfTwoTypes(this.type1, this.type2);
      }
      this.pokemonSelected = false;
      this.selectedPokemon = null;
      this.router.navigate(['/browse'], { relativeTo: this.route })
      console.log('navigated');
  }

  choosePokemon(pokemon: Pokemon) {
      console.log(pokemon);
      this.pokemonService.singlePokemonEmitter.emit(pokemon);
      this.pokemonSelected = true;
      this.selectedPokemon = pokemon;
      this.router.navigate(['/browse', pokemon.id], { relativeTo: this.route })
  }
}
