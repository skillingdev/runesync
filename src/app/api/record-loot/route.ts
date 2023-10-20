import { Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "~/mongodb";
import { ApiRequestError, DbError, LootEntry, LootEntrySchema } from "~/types";

type ResponseData = {
    ok: boolean,
}

const RecordLootSchema = z.object({
    items: z.array(LootEntrySchema),
})

export async function POST(req: NextRequest): Promise<NextResponse<ApiRequestError | DbError | ResponseData>> {
    const body = await req.json()

    const request = RecordLootSchema.safeParse(body)

    if (!request.success) {
        const { errors } = request.error

        return NextResponse.json({ error: { message: "Invalid request", errors } }, { status: 400 })
    }

    try {
        const client = await clientPromise

        const loots: Collection<LootEntry> = client.db("test").collection("loots")

        await loots.insertMany(request.data.items)
    } catch (e) {
        return NextResponse.json({ error: "DB transaction failed" }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
}