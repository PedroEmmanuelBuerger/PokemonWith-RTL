import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('teste o funcionamento do componente pokedex ', () => {
  it('testa se na pagina existe um h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(title).toBeInTheDocument();
  });
  it('testa as funcionalidades do botão proximo pokemon, e se ele renderiza o esperado', () => {
    renderWithRouter(<App />);
    const nextbutton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    let namepokemon = screen.getByText(/Pikachu/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Charmander/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Caterpie/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Ekans/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Alakazam/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Mew/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Rapidash/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Snorlax/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Dragonair/i);
    expect(namepokemon).toBeInTheDocument();
    userEvent.click(nextbutton);
    namepokemon = screen.getByText(/Pikachu/i);
    expect(namepokemon).toBeInTheDocument();
  });
  it('verifica se existem botões de filtro por tipo, e se eles funcionam', () => {
    renderWithRouter(<App />);
    const allpokemonsbutton = screen.getByRole('button', { name: 'All' });
    expect(allpokemonsbutton).toBeVisible();
    const alltypes = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const namespokemon = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Snorlax', 'Dragonair'];
    for (let i = 0; i < alltypes.length; i += 1) {
      expect(alltypes[i]).toBeVisible();
    }
    for (let i = 0; i < alltypes.length; i += 1) {
      expect(alltypes[i]).toHaveTextContent(types[i]);
    }
    for (let i = 0; i < alltypes.length; i += 1) {
      userEvent.click(alltypes[i]);
      const namepokemon = screen.getByText(namespokemon[i]);
      expect(namepokemon).toBeInTheDocument();
    }
    expect(allpokemonsbutton).toBeVisible();
  });
  it('verifica se a pokedex tem um botão de resetar o filtro(Botão ALL)', () => {
    renderWithRouter(<App />);
    const firebutton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(firebutton);
    const allpokemonsNames = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    const nextbutton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const allpokemonsbutton = screen.getByRole('button', { name: 'All' });
    expect(allpokemonsbutton).toBeVisible();
    userEvent.click(allpokemonsbutton);
    for (let i = 0; i < allpokemonsNames.length; i += 1) {
      const namepokemon = screen.getByText(allpokemonsNames[i]);
      expect(namepokemon).toBeInTheDocument();
      userEvent.click(nextbutton);
    }
  });
});
