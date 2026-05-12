import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Layout} from '../components/layout/layout';

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
      fonts: {
         sans: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      }
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
      fonts: {
         sans: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      }
   },
});

function MyApp({Component, pageProps}: AppProps) {
   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <Head>
            <title>AgriDoc Classification</title>
         </Head>
         <NextUIProvider>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
