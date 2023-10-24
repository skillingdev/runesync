import { Button } from "@nextui-org/button"
import { Suspense } from "react"
import { TopPlayers } from "./TopPlayers"

export default function Page() {
  return (
    <>
      <Suspense>
        <TopPlayers />
      </Suspense >
    </>
  )
}
