import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa a funcionalidade de favoritar pokemons', () => {
  it('testa se ir para a pagina de favoritos sem favoritar, ela aparece vazia', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const title = screen.getByRole('heading', { name: 'Favorite Pokémon' });
    const notFound = screen.getByText('No favorite Pokémon found');
    expect(notFound).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('testa se ao favoritar, ira aparecer apenas os pokemons favoritados na tela de favorites', () => {
    renderWithRouter(<App />);
    const text = 'More details';
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    const details = screen.getByRole('link', { name: text });
    userEvent.click(details);
    const favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const PoisonButton = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(PoisonButton);
    const details2 = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details2);
    const favorite2 = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite2);
    const favoritesPokemons = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoritesPokemons);
    const firename = screen.getByText('Charmander');
    const fireType = screen.getByText('Fire');
    const poisonName = screen.getByText('Ekans');
    const poisonType = screen.getByText('Poison');
    expect(firename).toBeInTheDocument();
    expect(fireType).toBeInTheDocument();
    expect(poisonName).toBeInTheDocument();
    expect(poisonType).toBeInTheDocument();
    const totalLinks = screen.getAllByRole('link', { name: text });
    expect(totalLinks.length).toBe(2);
  });
});
