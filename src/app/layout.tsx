import '~/styles/global.css'

import { Providers } from "./providers"
import { Header } from './header'
import { Sidebar } from './sidebar'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className='light' >
            <body>
                <Providers>
                    <div className="flex flex-col h-full">
                        <Header />
                        <div className="flex h-full max-h-full overflow-hidden">
                            <Sidebar />
                            <div className="grow basis-0 pr-[12rem] h-full">{children}</div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}