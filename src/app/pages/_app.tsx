// pages/_app.tsx
import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle'; // Adjust the path if necessary

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
