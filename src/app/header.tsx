import { Link } from "@nextui-org/react"

export function Header() {
    return (
        <nav className="flex">
            <div className="flex-none w-14 h-14">
                01
            </div>
            <div className="grow h-14">
                02
            </div>
            <div className="flex-none w-14 h-14">
                03
            </div>
        </nav>
    )
}