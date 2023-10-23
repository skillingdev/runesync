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
        <html lang="en" className="light">
            <body className=" min-h-screen overflow-auto">
                <Providers>
                    <Header />
                    <div className="flex">
                        <Sidebar />
                        <div className="grow basis-0 pr-[12rem]">{children}</div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}