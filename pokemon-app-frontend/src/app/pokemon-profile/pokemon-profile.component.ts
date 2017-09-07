import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from '../pokemon-interface';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit, OnChanges {

  @Input() pokemon: Pokemon;
  currentRating: number;

  constructor(private ratingService: RatingService) { }

  ngOnInit() {
      //this.currentRating = 3;
      this.ratingService.getRating(this.pokemon.id).subscribe(
          (response) => this.currentRating = response.rating,
          (error) => console.log(error)
      )
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['pokemon']) {
          const id = changes.pokemon.currentValue.id;
          this.ratingService.getRating(id).subscribe(
              (response) => this.currentRating = response.rating,
              (error) => console.log(error)
          )
      }
  }

  getPokemonImage() {
      return "assets/images/pokemonImages/pokemon" + this.pokemon.id + ".png";
  }

}
