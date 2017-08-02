import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

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

@Injectable()
export class PokemonService implements OnInit {
    private pokemon: Pokemon[] = [];
    pokemonEmitter = new EventEmitter<Pokemon[]>();
    singlePokemonEmitter = new EventEmitter<Pokemon>();

    constructor(private http: Http) {}

    setAllPokemon(allPokemon: Pokemon[]) {
        this.pokemon = allPokemon;
        this.pokemonEmitter.emit(allPokemon);
    }

    ngOnInit() {

    }



    showPokemonOfOneType(type: string) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return p.type1 == type || p.type2 == type;
        })
        this.pokemonEmitter.emit(relevantPokemon);
    }

    showPokemonOfTwoTypes(type1: string, type2: string) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return (p.type1 == type1 && p.type2 == type2) || (p.type1 == type2 && p.type2 == type1)
        })
        this.pokemonEmitter.emit(relevantPokemon);
    }

    showAllPokemon() {
        this.pokemonEmitter.emit(this.pokemon);
    }

    getPokemonFormes(ndex: number) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return p.ndex == ndex;
        })
        return relevantPokemon;
    }

    getOnePokemon(id: number) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return p.id == id;
        })
        return relevantPokemon[0];
    }

    emitPokemon(pokemon: Pokemon) {
        this.singlePokemonEmitter.emit(pokemon);
    }

    getAllPokemon() {
      return this.http.get('http://localhost:3000/pokemon')
        .map(
            (response: Response) => {
                const data = response.json() as Pokemon[];
                  this.pokemon = data;
                  return this.pokemon;
            }
        )
        .catch((error: Response) => {
            return Observable.throw('Something went wrong');
        })
    }

}
