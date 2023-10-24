import { Suspense } from "react"
import { TopPlayers } from "./TopPlayers"
import { PlayersSearch } from "./PlayersSearch"

export default function Page() {
  return (
    <>
      <PlayersSearch />
      <Suspense>
        <TopPlayers />
      </Suspense >
    </>
  )
}
