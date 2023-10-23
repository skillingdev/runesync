import { Suspense } from "react"
import { Stats } from "./stats"
import { LootTimeline } from "./events"

export default function Page({ params }: { params: { user: string } }) {
    const user = decodeURIComponent(params.user)

    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold underline">
                {user}
            </h1>
            <Suspense fallback={"Loading stats..."}>
                <Stats user={user} />
            </Suspense>
            <Suspense fallback={"Loading loot timeline..."}>
                <LootTimeline user={user} />
            </Suspense>
        </div>
    )
}
