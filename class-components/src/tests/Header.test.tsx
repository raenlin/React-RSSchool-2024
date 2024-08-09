import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeContext } from '../contexts/theme';
import Header from '../components/Header/header';

describe('Header Component', () => {
  const mockHandleThemeChange = vi.fn();

  const renderHeader = (theme = 'light', name = 'Test Header') => {
    render(
      <ThemeContext.Provider value={{ theme, handleThemeChange: mockHandleThemeChange }}>
        <Header name={name} />
      </ThemeContext.Provider>
    );
  };

  it('renders the header with the correct name', () => {
    renderHeader();
    const headerElement = screen.getByRole('heading', { name: /test header/i });
    expect(headerElement).toBeInTheDocument();
  });

  it('displays the correct initial theme', () => {
    renderHeader();
    const buttonElement = screen.getByRole('button', { name: /light/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls handleThemeChange when the button is clicked', () => {
    renderHeader();
    const buttonElement = screen.getByRole('button', { name: /light/i });
    fireEvent.click(buttonElement);
    expect(mockHandleThemeChange).toHaveBeenCalled();
  });

  it('renders with dark theme styles', () => {
    renderHeader('dark');
    const headerElement = screen.getByRole('heading', { name: /test header/i });
    const buttonElement = screen.getByRole('button', { name: /dark/i });

    expect(headerElement).toHaveClass('heading');
    expect(headerElement).not.toHaveClass('heading-dark');
    expect(buttonElement).toHaveClass('theme-button');
    expect(buttonElement).not.toHaveClass('theme-button__dark');
  });
});
