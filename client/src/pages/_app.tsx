import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "./layout";
import { StateProvider } from "@/app/stateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </RootLayout>
  );
}
