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
            <body className="min-h-screen overflow-y-auto overflow-x-hidden w-full">
                <Providers>
                    <Header />
                    <div className="grow basis-0 px-8 w-full sm:px-32 pb-4">{children}</div>
                </Providers>
            </body>
        </html >
    )
}