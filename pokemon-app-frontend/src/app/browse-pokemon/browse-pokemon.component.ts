import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-pokemon',
  templateUrl: './browse-pokemon.component.html',
  styleUrls: ['./browse-pokemon.component.css']
})
export class BrowsePokemonComponent implements OnInit {

  firstList: string[] = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
      'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon',
      'Ghost', 'Dark', 'Steel', 'Fairy'];

  secondList: string[] = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
      'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon',
      'Ghost', 'Dark', 'Steel', 'Fairy'];

  type1: string = null;
  type2: string = null;

  constructor() { }

  ngOnInit() {
      this.firstList.sort((a, b) => a > b ? 1 : -1)
      this.secondList.sort((a, b) => a > b ? 1 : -1)
  }

  selectType1(type: string) {
      if (this.type1 == type) {
          this.type1 = null;
          this.secondList.push(type);
          this.secondList.sort((a, b) => a > b ? 1 : -1);
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
      }
      this.type2 = null;
  }

  selectType2(type: string) {
      if (this.type2 == type) {
          this.type2 = null;
      } else {
          this.type2 = type;
      }
  }
}
