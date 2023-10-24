"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Input,
    DropdownItem,
    DropdownMenu,
    Selection,
    Dropdown,
    DropdownTrigger,
    Button,
    Avatar
} from "@nextui-org/react"
import { useCallback, useMemo, useState } from "react"
import { UserEvent, UserEventType, userEventTypes } from "~/types"
import { FaChevronDown, FaSearch } from 'react-icons/fa'

const columns = [{ name: "Timestamp", uid: "timestamp" }, { name: "Event Type", uid: "type" }, { name: "Event Details", uid: "details" }]
const INITIAL_VISIBLE_COLUMNS = ["timestamp", "type", "details"]

const eventTypes = [{ name: "Loot", uid: "loot" }]

function showEvent(event: UserEvent): String {
    switch (event.type) {
        case 'Loot':
            return `${event.event.itemName} from ${event.event.sourceName}`
    }
}

export default function EventsTimeline({ events }: { events: UserEvent[] }) {
    const [filterValue, setFilterValue] = useState("")
    const [eventTypeFilter, setEventTypeFilter] = useState<Selection>("all")
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))

    const hasSearchFilter = Boolean(filterValue)

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
    }, [visibleColumns])

    const filteredEvents = useMemo(() => {
        let filteredEvents = [...events]

        filteredEvents = eventTypeFilter == "all" ? filteredEvents : filteredEvents.filter((event) => Array.from(eventTypeFilter).includes(event.type))

        if (hasSearchFilter) {
            filteredEvents = filteredEvents.filter((event) => {
                return showEvent(event).toLowerCase().includes(filterValue.toLowerCase())
            })
        }

        return filteredEvents.map((event, ix) => ({ ix, event }))
    }, [events, filterValue, eventTypeFilter])

    const renderCell = useCallback((event: UserEvent, columnKey: React.Key) => {
        switch (columnKey) {
            case "timestamp":
                switch (event.type) {
                    case 'Loot':
                        return (
                            <div>{event.event.timestamp.toLocaleString()}</div>
                        )
                }
            case "type":
                switch (event.type) {
                    case 'Loot':
                        return (
                            <div>Loot Received</div>
                        )
                }
            case "details":
                switch (event.type) {
                    case 'Loot':
                        return (
                            <div className="flex items-center">
                                <img className="h-8 w-8 mr-3" src={`https://static.runelite.net/cache/item/icon/${event.event.itemId}.png`} />
                                <span>{showEvent(event)}</span>
                            </div>
                        )
                }
            default:
                return <div></div>
        }
    }, [])

    const onSearchChange = useCallback((value: string) => {
        if (value) {
            setFilterValue(value)
        } else {
            setFilterValue("")
        }
    }, [])

    const onClear = useCallback(() => {
        setFilterValue("")
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by event details..."
                        startContent={<FaSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="sm:flex">
                                <Button endContent={<FaChevronDown className="text-small" />} variant="bordered">
                                    Event Type
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Event Types"
                                closeOnSelect={false}
                                selectedKeys={eventTypeFilter}
                                selectionMode="multiple"
                                onSelectionChange={setEventTypeFilter}
                            >
                                {userEventTypes.map((name) => (
                                    <DropdownItem key={name} className="capitalize">
                                        {name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="sm:flex">
                                <Button endContent={<FaChevronDown className="text-small" />} variant="bordered">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }, [
        filterValue,
        eventTypeFilter,
        visibleColumns,
        events.length,
        onSearchChange,
        hasSearchFilter,
    ])

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            isStriped
            topContent={topContent}
            topContentPlacement="outside"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={"start"}
                        allowsSorting={false}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No events found"} items={filteredEvents}>
                {(item) => (
                    <TableRow key={item.ix}>
                        {(columnKey) => <TableCell>{renderCell(item.event, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}