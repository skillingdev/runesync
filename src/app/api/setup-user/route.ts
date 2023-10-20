import { Collection } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '~/mongodb'
import { AccountEntry, UsernameEntry, ApiRequestError, AccountEntrySchema, DbError } from '~/types'

type ResponseData = {
    ok: boolean,
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiRequestError | DbError | ResponseData>> {
    const body = await req.json()

    const request = AccountEntrySchema.safeParse(body)

    if (!request.success) {
        const { errors } = request.error

        return NextResponse.json({ error: { message: "Invalid request", errors } }, { status: 400 })
    }

    try {
        const client = await clientPromise
        await client.withSession(async (session) => {
            await session.withTransaction(async (session) => {
                const account: AccountEntry = request.data;
                const username: UsernameEntry = { displayName: account.displayName }

                const accounts: Collection<AccountEntry> = client.db("test").collection("accounts")
                const usernames: Collection<UsernameEntry> = client.db("test").collection("usernames")

                const accountQuery = { accountHash: account.accountHash }
                const usernameQuery = { displayName: username.displayName }

                await usernames.replaceOne(usernameQuery, username, { session, upsert: true });
                let old = await accounts.findOneAndReplace(accountQuery, account, { session, upsert: true })

                if (old != null && old.displayName != account.displayName) {
                    // Delete old usernames entry - it is no longer used by the account it was used by
                    await usernames.deleteOne({ displayName: old.displayName }, { session })

                    // TODO: Handle migrating stats table
                }
            })
        })
    } catch (e) {
        return NextResponse.json({ error: "DB transaction failed" }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
}