import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.pokemons = await this.pokemonService.getPokemons();
    this.filteredPokemons = this.pokemons;
    console.log(this.pokemons);
  }

  getPokemonImage(index: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
  }

  getTypeClass(pokemon: any) {
    if (pokemon.types && pokemon.types.length > 0) {
      const type = pokemon.types[0].type.name;
      return {
        'grass': type === 'grass',
        'fire': type === 'fire',
        'water': type === 'water',
        'bug': type === 'bug',
        'normal': type === 'normal',
        'poison': type === 'poison',
        'electric': type === 'electric',
        'ground': type === 'ground',
        'fairy': type === 'fairy',
        'fighting': type === 'fighting',
        'psychic': type === 'psychic',
        'rock': type === 'rock',
        'ghost': type === 'ghost',
        'ice': type === 'ice',
        'dragon': type === 'dragon',
        'dark': type === 'dark',
        'steel': type === 'steel',
        'flying': type === 'flying'
      };
    }
    return {};
  }

  filterPokemons() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon => {
      const nameMatch = pokemon.name.toLowerCase().includes(term);
      const typeMatch = pokemon.types?.some((type: { type: { name: string; }; }) => type.type.name.toLowerCase().includes(term));
      const abilityMatch = pokemon.abilities?.some((ability: { ability: { name: string; }; }) => ability.ability.name.toLowerCase().includes(term));
      const idMatch = pokemon.url.split('/')[6] === term;
      return nameMatch || typeMatch || abilityMatch || idMatch;
    });
  }
}
