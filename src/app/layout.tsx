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
            <body className="">
                <Providers>
                    <div className="flex flex-col">
                        <Header />
                        <div className="flex">
                            <Sidebar />
                            <div className="grow">{children}</div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}