import { Component, ReactNode } from 'react';

interface Pokemon {
  url: number;
  name: string;
}

export class Result extends Component {
  state = {
    pokemons: [] as Pokemon[],
  };

  async fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemonsData = await response.json();
    console.log(pokemonsData);
    this.setState({ pokemons: pokemonsData.results });
  }

  async componentDidMount() {
    await this.fetchPokemons();
  }

  render(): ReactNode {
    const { pokemons } = this.state;
    return (
      <div className="result card">
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name} className="pokemon">
              {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
