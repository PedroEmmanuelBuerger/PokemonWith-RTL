import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando as funcionalidades do componente e pagina "App"', () => {
  it('testar se existem os links de navegação Home, About, Favorite Pokemon', () => {
    renderWithRouter(<App />);
    const linkhome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(linkhome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });
  it('testa se ao clicar no link de navegação home, o redirecionamento é correto', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('testa se ao clicar no link de navegação About, o redirecionamento é correto', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('testa se ao clicar no link de navegação Pokemons favoritos, o redirecionamento é correto', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('testa se ao entrar em uma pagina não definada, aparece o NotFound', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-nao-existente');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/pagina-nao-existente');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
