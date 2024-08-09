import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import Search from '../components/Search/search';

vi.mock('../../utils/localStorageHook', () => ({
  useSearchQuery: vi.fn().mockReturnValue(['', vi.fn(), vi.fn()]),
}));

describe('Search Component', () => {
  const mockOnSearch = vi.fn();
  const mockSetQuery = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} setquery={mockSetQuery} />
      </MemoryRouter>
    );
  });

  test('renders Search component', () => {
    expect(screen.getByPlaceholderText('Type planet to search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const input = screen.getByPlaceholderText<HTMLInputElement>('Type planet to search...');

    fireEvent.change(input, { target: { value: 'Tatooine' } });

    expect(input.value).toBe('Tatooine');
  });

  test('calls onSearch and navigates on button click', () => {
    const input = screen.getByPlaceholderText('Type planet to search...');
    fireEvent.change(input, { target: { value: 'Tatooine' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Tatooine');
  });
});
