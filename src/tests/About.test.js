import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';

import renderWithRouter from '../renderWithRouter';

describe('testa os funcionamentos da pagina pokedex', () => {
  it('testa se existem o Heading na pagina com o texto esperado', () => {
    renderWithRouter(<About />);
    const subtitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(subtitle).toBeInTheDocument();
  });
  it('testa se existem dois paragrafos de informação da pokedex', () => {
    renderWithRouter(<About />);
    const text1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const text2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });
  it('testa se a pagina contem imagens da pokedex', () => {
    renderWithRouter(<About />);
    const alttextImg = screen.getByAltText('Pokédex');
    expect(alttextImg).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
