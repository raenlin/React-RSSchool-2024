import styles from './layout.module.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const savedTheme: string | null =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  return (
    <div className={`${savedTheme === 'light' ? styles.wrapper : styles['wrapper-dark']}`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
