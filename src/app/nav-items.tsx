import { Link } from "@nextui-org/react"

export function NavItems() {
    return (
        <>
            <Link
                className="w-full"
                href="/"
            >
                Home
            </Link>
            <Link
                className="w-full"
                href="/users"
            >
                Users
            </Link>

        </>
    )
}