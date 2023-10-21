import { Collection } from "mongodb"
import { Suspense, useState } from "react"
import clientPromise from "~/mongodb"
import { AccountEntry, LootEntry, LootEntryEvent, StatEntry } from "~/types"
import { Stats } from './stats';
import Events from "./events";

async function fetchStatsTimeline(displayName: String): Promise<StatEntry[]> {
    const client = await clientPromise
    const stats: Collection<StatEntry> = client.db("test").collection("stats")
    const userStats: StatEntry[] = await stats.find({ displayName }, { sort: { timestamp: 1 }, projection: { _id: 0 } }).toArray()

    return userStats
}

async function fetchLootTimeline(displayName: String): Promise<LootEntryEvent[]> {
    // Need to lookup accountHash by displayName, then aggregate loot
    const client = await clientPromise
    const accounts: Collection<AccountEntry> = client.db("test").collection("accounts")
    const matchingAccounts = await accounts.find({ displayName }).toArray()

    if (matchingAccounts.length != 1) {
        return []
    }

    const accountHash = matchingAccounts[0].accountHash

    const loots: Collection<LootEntry> = client.db("test").collection("loots")
    const lootEntries: LootEntryEvent[] = await loots.find({ accountHash }, { sort: { timestamp: 1 }, projection: { _id: 0, accountHash: 0 } }).toArray()

    return lootEntries
}

export default async function Page({ params }: { params: { user: string } }) {
    const statEntries = await fetchStatsTimeline(decodeURIComponent(params.user))
    const lootEntries = await fetchLootTimeline(decodeURIComponent(params.user))

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello {params.user}! This will be the users page!
            </h1>
            <Suspense fallback={"Loading..."}>
                <Stats statEntries={statEntries} />
            </Suspense>
            <Suspense fallback={"Loading..."}>
                <Events events={lootEntries.map((event) => ({ type: 'Loot', event }))} />
            </Suspense>
        </div>
    )
}
