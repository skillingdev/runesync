import '~/styles/global.css'

import { Providers } from "./providers"
import { Header } from './header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className='light' >
            <body className="min-h-screen">
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <div className="grow">{children}</div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}