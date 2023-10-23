import { Collection } from "mongodb"
import clientPromise from "~/mongodb"
import { StatEntry } from "~/types"
import { StatsChart } from './stats-chart'

async function fetchStatsTimeline(displayName: String): Promise<StatEntry[]> {
    const client = await clientPromise
    const stats: Collection<StatEntry> = client.db("test").collection("stats")
    const userStats: StatEntry[] = await stats.find({ displayName }, { sort: { timestamp: 1 }, projection: { _id: 0 } }).toArray()

    return userStats
}

export async function Stats({ user }: { user: string }) {
    const statEntries = await fetchStatsTimeline(decodeURIComponent(user))

    return (
        <StatsChart statEntries={statEntries} />
    )
}