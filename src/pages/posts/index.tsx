import SEO from '../../components/SEO';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import styles from './posts.module.scss';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <div>
      <SEO title="Posts" />

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'pos')],
    {
      fetch: ['pos.title', 'pos.content'],
    },
  );

  const posts = response.results.map(post => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find(content => content.type === 'paragraph')?.text ??
      '',
    updateAt: format(
      new Date(post?.last_publication_date),
      "d 'de' MMMM 'de' yyyy",
      { locale: ptBR },
    ),
  }));

  return {
    props: { posts },
    revalidate: 60 * 60 * 12,
  };
};
