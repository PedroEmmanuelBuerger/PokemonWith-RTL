import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando componente de detalhes dos pokemons', () => {
  it('testa se entra no card de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const eletricbutton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(eletricbutton);
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('testa se as informações do pokemon estão corretas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/25');
    });
    const nameDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(nameDetails).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
  });
});
