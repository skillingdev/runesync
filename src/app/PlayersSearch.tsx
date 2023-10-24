"use client"

import { Button, Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export function PlayersSearch() {
    const router = useRouter()
    const [search, setSearch] = useState<string>("")

    const handleSearch = () => {
        router.push(`/users/${search}`)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (search.length > 0) {
            router.push(`/users/${search}`)
        }
    }

    return (
        <form className="mb-3 flex w-full gap-3" onSubmit={handleSubmit}>
            <Input radius="none" placeholder="Search by display name" value={search} onValueChange={setSearch} isClearable onClear={() => setSearch("")} />
            <Button className="disabled:cursor-not-allowed" variant="light" radius='none' disabled={search.length == 0} onClick={handleSearch}>Find User</Button>
        </form>
    )
}