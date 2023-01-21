import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';
const moreDetails = 'More details';

describe('testando informações de cada card dos pokemons', () => {
  it('testando informações de cada pokemon', () => {
    renderWithRouter(<App />);
    const eletricbutton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(eletricbutton);
    const name = screen.getByTestId(pokemonName);
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const imgAlt = screen.getByAltText('Pikachu sprite');
    expect(imgAlt).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  it('verifica se cada card tem um link para details e se nele leva a pagina de detalhes com a url esperada', () => {
    const { history } = renderWithRouter(<App />);
    const eletricbutton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(eletricbutton);
    let pokemonsName = screen.getByTestId(pokemonName);
    expect(pokemonsName).toHaveTextContent('Pikachu');
    let details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    let { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
    pokemonsName = screen.getByTestId(pokemonName);
    expect(pokemonsName).toHaveTextContent('Pikachu');
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const firebutton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(firebutton);
    pokemonsName = screen.getByTestId(pokemonName);
    expect(pokemonsName).toHaveTextContent('Charmander');
    details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    pathname = history.location.pathname;
    expect(pathname).toBe('/pokemon/4');
    pokemonsName = screen.getByTestId(pokemonName);
    expect(pokemonsName).toHaveTextContent('Charmander');
  });
  it('teste se existe a estrela de favoritos dentro de cada card ao clicar', () => {
    renderWithRouter(<App />);
    const eletricbutton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(eletricbutton);
    const details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    const favorite = screen.getByRole('checkbox');
    const label = screen.getByText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    userEvent.click(favorite);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img.src).toContain('star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
//
