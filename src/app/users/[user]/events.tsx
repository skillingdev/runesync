import { Collection } from "mongodb"
import clientPromise from "~/mongodb"
import { AccountEntry, LootEntry, LootEntryEvent, UserEvent } from "~/types"
import EventsTable from "./events-table"

async function fetchLootTimeline(displayName: String): Promise<UserEvent[]> {
    // Need to lookup accountHash by displayName, then aggregate loot
    const client = await clientPromise
    const accounts: Collection<AccountEntry> = client.db("test").collection("accounts")
    const matchingAccounts = await accounts.find({ displayName }).toArray()

    if (matchingAccounts.length != 1) {
        return []
    }

    const accountHash = matchingAccounts[0].accountHash

    const loots: Collection<LootEntry> = client.db("test").collection("loots")
    const lootEntries: LootEntryEvent[] = await loots.find({ accountHash }, { sort: { timestamp: -1 }, projection: { _id: 0, accountHash: 0 }, limit: 100 }).toArray()

    return lootEntries.map((event) => ({ type: 'Loot', event }))
}

export async function LootTimeline({ user }: { user: String }) {
    const lootEntries = await fetchLootTimeline(user)

    return (
        <EventsTable events={lootEntries} />
    )
}