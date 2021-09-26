import { render } from '@testing-library/react';
import { HeaderLink } from '../../components/HeaderLink';

describe('HeaderLink component tests', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <HeaderLink name="Home" href="/" currentPath="/posts" />,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('adds active class if href and currentPath are the same', () => {
    const { getByText } = render(
      <HeaderLink name="Home" href="/" currentPath="/" />,
    );

    expect(getByText('Home')).toHaveClass('active');
  });
});
