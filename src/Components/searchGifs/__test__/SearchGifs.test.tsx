import { render, screen, fireEvent } from '@testing-library/react';
import SearchGifs from '../SearchGifs';

describe('SearchGifs Component', () => {
  it('renders the search button and input field', () => {
    render(
      <SearchGifs
        query=""
        setQuery={jest.fn()}
        handleSearch={jest.fn()}
      />
    );

    const button = screen.getByTestId('search-gifs-btn');
    const input = screen.getByTestId('search-gifs-input');

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('disables the search button when query is empty', () => {
    render(
      <SearchGifs
        query=""
        setQuery={jest.fn()}
        handleSearch={jest.fn()}
      />
    );

    const button = screen.getByTestId('search-gifs-btn');
    expect(button).toBeDisabled();
  });

  it('enables the search button when query is not empty', () => {
    render(
      <SearchGifs
        query="Lorry"
        setQuery={jest.fn()}
        handleSearch={jest.fn()}
      />
    );

    const button = screen.getByTestId('search-gifs-btn');
    expect(button).not.toBeDisabled();
  });

  it('calls handleSearch when search button is clicked', () => {
    const mockHandleSearch = jest.fn();
    render(
      <SearchGifs
        query="Lorry"
        setQuery={jest.fn()}
        handleSearch={mockHandleSearch}
      />
    );

    const button = screen.getByTestId('search-gifs-btn');
    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });
});
