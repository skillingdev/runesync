import { NavItems } from "./nav-items"

export function Sidebar() {
    return (
        <nav className="hidden flex-col w-[8rem] sm:flex px-6 pt-2 h-full">
            <NavItems />
        </nav>
    )
}