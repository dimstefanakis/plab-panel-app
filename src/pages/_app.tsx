import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import Layout from '@/flat/Layout';
import { store } from '@/store';

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config: config,
  components: {
    Input: {
      // baseStyle: {
      //   field: {
      //     borderColor: '#D3E8E6',
      //     borderWidth: 1,
      //     borderRadius: '12px' // here
      //   }
      // },
      variants: {
        outline: {
          field: {
            background: "inherit",
            border: "1px solid",
            borderColor: "#A8A8A8",
            _focus: {
              zIndex: 1,
              borderColor: "#ffffff",
              boxShadow: "0 0 0 1px #ffffff",
            },
            _hover: { borderColor: "gray.300" },
          },
        },
      },
    },
  },
  colors: {
    white: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      500: "#ffffff",
      900: "#ffffff",
    },
    withdrawButton: {
      50: "#00000033",
      100: "#00000033",
      200: "#00000033",
    },
    bg: {
      100: "#161C31",
      150: "#202744",
      200: "#283154",
    },
    skeleton: {
      100: "#202744",
      200: "#283154",
    },
    brand: {
      100: "#26CDBD",
      200: "#4663F6",
    },
    brandGreen: {
      100: "#03DAC6",
      200: "#03DAC6",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
