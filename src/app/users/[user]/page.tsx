import { Suspense } from "react"
import { Stats } from "./stats"
import { LootTimeline } from "./events"
import { StatsLoading } from "./stats-chart"

export default function Page({ params }: { params: { user: string } }) {
    const user = decodeURIComponent(params.user)

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                {user}
            </h1>
            <Suspense fallback={<StatsLoading />}>
                <Stats user={user} />
            </Suspense>
        </>
    )
}

/* 
            <Suspense>
                <LootTimeline user={user} />
            </Suspense>
*/
