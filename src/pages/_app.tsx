import type { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react";

import '~/styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <Component {...pageProps} />
        </NextUIProvider>
    )
}