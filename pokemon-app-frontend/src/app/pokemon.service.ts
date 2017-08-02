import { EventEmitter } from '@angular/core';

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

export class PokemonService {
    private pokemon: Pokemon[] = [];
    pokemonEmitter = new EventEmitter<Pokemon[]>();
    singlePokemonEmitter = new EventEmitter<Pokemon>();

    setAllPokemon(allPokemon: Pokemon[]) {
        this.pokemon = allPokemon;
        this.pokemonEmitter.emit(allPokemon);
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

}
