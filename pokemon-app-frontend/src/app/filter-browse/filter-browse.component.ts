import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../pokemon.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-filter-browse',
  templateUrl: './filter-browse.component.html',
  styleUrls: ['./filter-browse.component.css']
})
export class FilterBrowseComponent implements OnInit {

  @Output() typeClicked = new EventEmitter<string>();

  firstList: string[] = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
      'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon',
      'Ghost', 'Dark', 'Steel', 'Fairy'];

  secondList: string[] = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
      'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon',
      'Ghost', 'Dark', 'Steel', 'Fairy'];

  type1: string = null;
  type2: string = null;

  pokemonSubscription: Subscription;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
      this.firstList.sort((a, b) => a > b ? 1 : -1)
      this.secondList.sort((a, b) => a > b ? 1 : -1)
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
      this.typeClicked.emit('go');
  }

  selectType2(type: string) {
      if (this.type2 == type) {
          this.type2 = null;
          this.pokemonService.showPokemonOfOneType(this.type1);
      } else {
          this.type2 = type;
          this.pokemonService.showPokemonOfTwoTypes(this.type1, this.type2);
      }
      this.typeClicked.emit('go');
  }

}
