import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'test-new-post',
  title: 'Title for new post',
  content: '<p>Post execerpt</p>',
  updateAt: 'December 25, 2021',
};

jest.mock('../../services/prismic');

describe('Post page tests', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Post post={post} />);

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new Post' }],
          content: [{ type: 'paragraph', text: '<p>Post execerpt</p>' }],
        },
        last_publication_date: '12-25-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: 'test-new-post' },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'test-new-post',
            title: 'My new Post',
            content: '<p>Post execerpt</p>',
            updateAt: 'December 25, 2021',
          },
        },
      }),
    );
  });
});