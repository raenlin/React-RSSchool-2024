// CardDetails.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CardDetails from '../pages/planets/[CardDetail]';
import { vi } from 'vitest';
import { ThemeContext } from '../contexts/theme';

const mockUseGetPlanetsQuery = vi.fn();
vi.mock('../store/planetsApi', () => ({
  planetsApi: {
    useGetPlanetsQuery: () => mockUseGetPlanetsQuery(),
  },
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactNode, { route = '/planets/1' } = {}) => {
  const mockThemeContext = {
    theme: 'light',
    handleThemeChange: () => {},
  };
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={mockThemeContext}>{ui}</ThemeContext.Provider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('CardDetails', () => {
  beforeEach(vi.clearAllMocks);

  it('renders loading state', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    renderWithProviders(<CardDetails />);
  });

  it('renders error state', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
    });

    renderWithProviders(<CardDetails />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders planet details', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      data: {
        results: [
          {
            name: 'Tatooine',
            diameter: '10465',
            rotation_period: '23',
            orbital_period: '304',
            climate: 'arid',
            terrain: 'desert',
            gravity: '1',
            population: '200000',
            surface_water: '1',
            created: '2014-12-09T13:50:49.641000Z',
          },
        ],
      },
      error: null,
      isLoading: false,
    });

    renderWithProviders(<CardDetails />);

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Diameter: 10465')).toBeInTheDocument();
    expect(screen.getByText('Rotation-period: 23')).toBeInTheDocument();
    expect(screen.getByText('Orbital-period: 304')).toBeInTheDocument();
    expect(screen.getByText('Climate: arid')).toBeInTheDocument();
    expect(screen.getByText('Terrain: desert')).toBeInTheDocument();
    expect(screen.getByText('Gravity: 1')).toBeInTheDocument();
    expect(screen.getByText('Population: 200000')).toBeInTheDocument();
    expect(screen.getByText('Surface-water: 1')).toBeInTheDocument();
    expect(screen.getByText('Created: 2014-12-09T13:50:49.641000Z')).toBeInTheDocument();
  });

  it('navigates to home on Close button click', () => {
    mockUseGetPlanetsQuery.mockReturnValue({
      data: {
        results: [
          {
            name: 'Tatooine',
            diameter: '10465',
            rotation_period: '23',
            orbital_period: '304',
            climate: 'arid',
            terrain: 'desert',
            gravity: '1',
            population: '200000',
            surface_water: '1',
            created: '2014-12-09T13:50:49.641000Z',
          },
        ],
      },
      error: null,
      isLoading: false,
    });

    renderWithProviders(<CardDetails />);

    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);
  });
});
