"use client"

import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react"
import { TopPlayerEntry } from "~/types"

const columns = [
    {
        key: "displayName",
        name: "Name",
    },
    {
        key: "leaguePoints",
        name: "League Points"
    }
]

export function TopPlayersTable({ topPlayers }: { topPlayers: TopPlayerEntry[] }) {
    return (
        <Table
            aria-label="Table containing all top player info"
            radius="none"
            fullWidth
            removeWrapper
            isStriped
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        align={"start"}
                        allowsSorting={false}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No players found. Is the league started yet?"} items={topPlayers}>
                {(item) => (
                    <TableRow key={item.displayName}>
                        {(columnKey) => columnKey == "displayName" ? <TableCell><Link href={`/users/${getKeyValue(item, columnKey)}`}>{getKeyValue(item, columnKey)}</Link></TableCell> : <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}