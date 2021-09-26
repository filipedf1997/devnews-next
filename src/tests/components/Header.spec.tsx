import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

describe('Header component tests', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Header />);

    screen.logTestingPlaygroundURL();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
    expect(getByAltText('DevNews!')).toBeInTheDocument();
  });
});
