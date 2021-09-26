import { useRouter } from 'next/router';
import { HeaderLink } from '../HeaderLink';
import styles from './styles.module.scss';

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <img src="/logo.svg" alt="DevNews!" />
        <nav>
          <HeaderLink name="Home" href="/" currentPath={asPath} />
          <HeaderLink name="Posts" href="/posts" currentPath={asPath} />
        </nav>
      </div>
    </header>
  );
}
