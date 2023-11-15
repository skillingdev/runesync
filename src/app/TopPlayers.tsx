import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Collection } from "mongodb"
import clientPromise from "~/mongodb"
import { TopPlayerEntry } from "~/types"
import { TopPlayersTable } from "./TopPlayersTable"

async function getTopPlayers() {
    const client = await clientPromise
    const topPlayers: Collection<TopPlayerEntry> = client.db("test").collection("topPlayers")

    const entries: TopPlayerEntry[] = await topPlayers.find({}, { sort: { leaguePoints: -1 }, projection: { _id: 0 } }).toArray()

    return entries
}

export async function TopPlayers() {
    const topPlayers = await getTopPlayers()

    return (
        <TopPlayersTable topPlayers={topPlayers} />
    )
}