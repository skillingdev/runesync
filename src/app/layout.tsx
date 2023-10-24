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
            <body className=" min-h-screen overflow-y-auto overflow-x-hidden w-full ">
                <Providers>
                    <Header />
                    <div className="flex">
                        <Sidebar />
                        <div className="grow basis-0 px-[2rem] w-full sm:pr-[8rem] sm:pl-0 pb-4">{children}</div>
                    </div>
                </Providers>
            </body>
        </html >
    )
}