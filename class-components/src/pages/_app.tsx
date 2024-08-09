import './style.css';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import ErrorBoundary from '../components/Errorboundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterApp from 'next-query-params/app';
import { Playfair_Display_SC } from 'next/font/google';
import Layout from '../components/Layout/layout';
import { ThemeContext } from '../contexts/theme';

const font = Playfair_Display_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: ['normal'],
});

export type PageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [theme, setTheme] = useState<string>('');
  const savedTheme: string | null =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  useEffect(() => {
    savedTheme === 'light' ? setTheme('dark') : setTheme('light');
  }, [savedTheme]);

  const handleThemeChange = () => {
    localStorage.setItem('theme', theme);
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryParamProvider adapter={NextAdapterApp}>
          <ThemeContext.Provider value={{ theme, handleThemeChange }}>
            <>
              <style jsx global>{`
                html {
                  font-family: ${font.style.fontFamily};
                }
              `}</style>
              <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            </>
          </ThemeContext.Provider>
        </QueryParamProvider>
      </Provider>
    </ErrorBoundary>
  );
}
