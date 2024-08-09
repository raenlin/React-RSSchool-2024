import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '../components/Main/main';
import { Planet } from '../utils/types';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { vi } from 'vitest';
import { selectItem } from '../store/cardsSlice';

describe('Main component', () => {
  const mockItems: Planet[] = [];
  const pages = [1, 2, 3, 4, 5, 6];

  test('renders Card components for each item', () => {
    const setup = (items = mockItems) => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Main items={items} pages={pages} setquery={vi.fn()} query={1} />
          </MemoryRouter>
        </Provider>
      );
    };
    setup();

    mockItems.forEach((item) => {
      const cardElement = screen.getByText(item.name);
      expect(cardElement).toBeInTheDocument();
    });
    pages.forEach((page) => {
      const element = screen.getByText(page);
      expect(element).toBeInTheDocument();
    });
  });

  test('renders CardDetail components for each item', async () => {
    const mockItems = [
      {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        created: '2014-12-09T13:50:49.641000Z',
      },
    ];
    const pages = [1, 2, 3, 4, 5, 6];
    const setup = (items = mockItems) => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Main items={items} pages={pages} setquery={vi.fn()} query={1} />
          </MemoryRouter>
        </Provider>
      );
    };
    setup();
    const card = screen.getByText('Tatooine');
    fireEvent.click(card);
    screen.findByText('desert').then((desertText) => {
      expect(desertText).toBeInTheDocument();
    });
  });

  test('does not render popup when selectedCards is empty', () => {
    const mockItems = [
      {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        created: '2014-12-09T13:50:49.641000Z',
      },
    ];
    const pages = [1, 2, 3, 4, 5, 6];
    const setup = (items = mockItems) => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Main items={items} pages={pages} setquery={vi.fn()} query={1} />
          </MemoryRouter>
        </Provider>
      );
    };
    setup();
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });
  test('renders popup when selectedCards has items', async () => {
    store.dispatch(
      selectItem({
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        created: '2014-12-09T13:50:49.641000Z',
      })
    );
    const mockItems = [
      {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        created: '2014-12-09T13:50:49.641000Z',
      },
    ];
    const setup = (items = mockItems) => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Main items={items} pages={pages} setquery={vi.fn()} query={1} />
          </MemoryRouter>
        </Provider>
      );
    };
    setup();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});
