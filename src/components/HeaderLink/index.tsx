import Link, { LinkProps } from 'next/link';
import styles from './styles.module.scss';

interface HeaderLinkProps extends LinkProps {
  name: string;
  href: string;
  currentPath: string;
}

export function HeaderLink({ name, href, currentPath }: HeaderLinkProps) {
  return (
    <Link href={href}>
      <a
        className={`
        ${styles.link} 
        ${currentPath === href ? styles.active : ''}`}
      >
        {name}
      </a>
    </Link>
  );
}
