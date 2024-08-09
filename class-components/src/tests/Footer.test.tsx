import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/footer';

describe('Footer Component', () => {
  it('renders the footer with correct inner content', () => {
    render(<Footer />);

    const headerElement = screen.getByRole('heading', { name: /raenlin/i });
    expect(headerElement).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /raenlin/i });
    expect(linkElement).toHaveAttribute('href', 'https://github.com/raenlin/');
  });

  it('opens the link in a new tab', () => {
    render(<Footer />);

    const linkElement = screen.getByRole('link', { name: /raenlin/i });
    expect(linkElement).toHaveAttribute('target', 'blank');
  });
});
