import { Collection } from "mongodb"
import { Suspense, useState } from "react"
import clientPromise from "~/mongodb"
import { StatEntry } from "~/types"
import { Stats } from './chart';

async function fetchStatsTimeline(displayName: String) {
    const client = await clientPromise
    const stats: Collection<StatEntry> = client.db("test").collection("stats")
    const userStats: StatEntry[] = await stats.find({ displayName }, { sort: { timestamp: 1 }, projection: { _id: 0 } }).toArray()

    return userStats
}

export default async function Page({ params }: { params: { user: string } }) {
    const statEntries = await fetchStatsTimeline(decodeURIComponent(params.user))

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello {params.user}! This will be the users page!
            </h1>
            <Suspense fallback={"Loading..."}>
                <Stats statEntries={statEntries} />
            </Suspense>
        </div>
    )
}
