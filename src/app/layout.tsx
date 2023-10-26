import '~/styles/global.css'

import { Providers } from "./providers"
import { Header } from './header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="light">
            <head>
                <title>RuneSync</title>
                <link rel="icon" type="image/x-icon" href="/Rune_Sync_Very_Small.png" />
            </head>
            <body className="min-h-screen overflow-y-auto overflow-x-hidden w-full">
                <Providers>
                    <Header />
                    <div className="grow basis-0 px-8 w-full sm:px-32 pb-4">{children}</div>
                </Providers>
            </body>
        </html >
    )
}