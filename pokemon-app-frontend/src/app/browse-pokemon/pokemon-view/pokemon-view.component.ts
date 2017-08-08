import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PokemonService } from '../../pokemon.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Pokemon } from '../../pokemon-interface';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {


  currentPokemon: Pokemon;
  pokemonFormes: Pokemon[];
  subscription: Subscription;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
      /*this.subscription = this.pokemonService.singlePokemonEmitter.subscribe(
          (pokemon: Pokemon) => {
              this.currentPokemon = pokemon;
              this.pokemonFormes = this.pokemonService.getPokemonFormes(this.currentPokemon.ndex);
          }
      )*/
      this.route.params.subscribe(
          (params: Params) => {
              const id = +params['id'];
              this.currentPokemon = this.pokemonService.getOnePokemon(id);
              this.pokemonFormes = this.pokemonService.getPokemonFormes(this.currentPokemon.ndex);
          }
      )
  }


  selectPokemon(pokemon: Pokemon) {
      //this.pokemonService.singlePokemonEmitter.emit(pokemon);
      this.currentPokemon = pokemon;
  }

}
