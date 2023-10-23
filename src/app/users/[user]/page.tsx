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
            <Suspense>
                <Stats user={user} />
            </Suspense>
            <Suspense>
                <LootTimeline user={user} />
            </Suspense>
        </div>
    )
}
