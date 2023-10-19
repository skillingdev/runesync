import { LineChart, CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts'

import { Collection } from "mongodb"
import { Suspense } from "react"
import clientPromise from "~/mongodb"
import { StatEntry } from "~/types"

async function fetchStatsTimeline(displayName: String) {
    console.log("starting.... for " + displayName)

    const client = await clientPromise
    const stats: Collection<StatEntry> = client.db("test").collection("stats")
    const userStats: StatEntry[] = await stats.find({ displayName }, { sort: { timestamp: 1 } }).toArray()

    console.log(userStats)

    return userStats
}

function Stats({ statEntries }: { statEntries: StatEntry[] }) {
    const listDates = statEntries.map((stat, ix) => <li key={ix}>{stat.timestamp.toLocaleString()}</li>)
    console.log(statEntries)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={statEntries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Line type="monotone" dataKey={(val) => val.stats.activites.leaguePoints} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
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
