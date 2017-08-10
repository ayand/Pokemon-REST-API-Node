import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon-interface';

@Component({
  selector: 'app-pokemon-search-browse',
  templateUrl: './pokemon-search-browse.component.html',
  styleUrls: ['./pokemon-search-browse.component.css']
})
export class PokemonSearchBrowseComponent implements OnInit {

  @ViewChild('searchTerm') searchInputRef: ElementRef;
  @Output() searchEntered = new EventEmitter<string>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  search() {
      if (this.searchInputRef.nativeElement.value != '') {
          console.log('Executing');
          const term = this.searchInputRef.nativeElement.value;
          this.pokemonService.searchPokemon(term).subscribe(
              (pokemon: Pokemon[]) => {
                  this.searchEntered.emit('go');
              },
              (error) => console.log(error)
          )
      } else {
          console.log('Not executing');
      }
  }

}
