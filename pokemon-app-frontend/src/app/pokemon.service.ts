import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Pokemon } from './pokemon-interface';

@Injectable()
export class PokemonService {
    private pokemon: Pokemon[] = [];
    pokemonEmitter = new EventEmitter<Pokemon[]>();

    constructor(private http: Http) {}

    setPokemon(allPokemon: Pokemon[]) {
        this.pokemonEmitter.emit(allPokemon);
    }

    showPokemonOfOneType(type: string) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return p.type1 == type || p.type2 == type;
        })
        relevantPokemon.sort((a, b) => {
            const ndexComparison = a.ndex - b.ndex;
            if (ndexComparison == 0) {
                return a.id - b.id;
            }
            return ndexComparison;
        })
        this.pokemonEmitter.emit(relevantPokemon);
    }

    showPokemonOfTwoTypes(type1: string, type2: string) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return (p.type1 == type1 && p.type2 == type2) || (p.type1 == type2 && p.type2 == type1)
        })
        relevantPokemon.sort((a, b) => {
            const ndexComparison = a.ndex - b.ndex;
            if (ndexComparison == 0) {
                return a.id - b.id;
            }
            return ndexComparison;
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
        relevantPokemon.sort((a, b) => {
            const ndexComparison = a.ndex - b.ndex;
            if (ndexComparison == 0) {
                return a.id - b.id;
            }
            return ndexComparison;
        })
        return relevantPokemon;
    }

    getOnePokemon(id: number) {
        const relevantPokemon = this.pokemon.filter((p) => {
            return p.id == id;
        })
        return relevantPokemon[0];
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

    searchPokemon(term: string) {
        const parsedTerm = term.replace(" " , "+");
        const queryString = 'http://localhost:3000/search/pokemon?term=' + parsedTerm;
        return this.http.get(queryString).map(
            (response: Response) => {
                const data = response.json() as Pokemon[];
                this.pokemonEmitter.emit(data);
                return data;
            }
        )
    }

    emitAllPokemon() {
        this.pokemonEmitter.emit(this.pokemon);
    }

}
