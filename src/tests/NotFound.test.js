import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { NotFound } from '../pages';

describe('testa as funcionalidades da pagina notFound', () => {
  it('testa se a pagina contem um h2 com o texto page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-nao-existente');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/pagina-nao-existente');
    const notFound = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFound).toBeInTheDocument();
  });
  it('testa se a pagina mostra a imagem referente ao pageNotFound', () => {
    renderWithRouter(<NotFound />);
    const altImg = screen.getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(altImg).toBeInTheDocument();
    const img = (screen.getByRole('img'));
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
