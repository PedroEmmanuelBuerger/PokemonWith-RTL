import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando componente de detalhes dos pokemons', () => {
  it('testa se ao entrar nos detalhes, todas as informações estão corretas', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const nameDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(nameDetails).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const sumary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(sumary).toBeInTheDocument();
    const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(paragraph).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
  });
  it(('verifica se existe um mapa contendo as localizações do pokemon em detalhe'), () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/25');
    });
    const mapDescription = screen.getByText(/Game Locations of Pikachu/i);
    expect(mapDescription).toBeInTheDocument();
    const allAltMaps = screen.getAllByAltText(/Pikachu location/i);
    expect(allAltMaps.length).toBe(2);
    expect(allAltMaps[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(allAltMaps[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    const kantoText = screen.getByText(/Kanto Viridian Forest/i);
    expect(kantoText).toBeInTheDocument();
    const celadonText = screen.getByText(/Kanto Power Plant/i);
    expect(celadonText).toBeInTheDocument();
  });
  it('verifica se tem o botão de favoritar e se esse botão funciona', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/25');
    });
    let favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorite).toBeInTheDocument();
    const label = screen.getByText(/Pokémon favoritado\?/i);
    expect(label).toBeInTheDocument();
    userEvent.click(favorite);
    expect(favorite).toBeChecked();
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoriteLink);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByText(/electric/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite);
    expect(favorite).not.toBeChecked();
  });
});
