import { Component, OnInit, Input } from '@angular/core';

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
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit() {
  }

  getPokemonImage() {
      return "assets/images/pokemonImages/pokemon" + this.pokemon.id + ".png";
  }

}
