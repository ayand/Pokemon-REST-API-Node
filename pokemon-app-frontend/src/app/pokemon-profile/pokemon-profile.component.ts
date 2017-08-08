import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon-interface';

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
