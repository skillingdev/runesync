import { Collection } from "mongodb"
import { Suspense, useState } from "react"
import clientPromise from "~/mongodb"
import { AccountEntry, LootEntry, LootEntryEvent, StatEntry } from "~/types"
import { StatsChart } from './stats-chart'
import EventsTable from "./events-table"

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

export async function LootTimeline({ user }: { user: String }) {
    const lootEntries = await fetchLootTimeline(user)

    return (
        <EventsTable events={lootEntries.map((event) => ({ type: 'Loot', event }))} />
    )
}