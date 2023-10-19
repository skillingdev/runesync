import { Collection } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '~/mongodb'
import { AccountEntry, UsernameEntry, ApiRequestError, AccountEntrySchema, DbError } from '~/types'

type ResponseData = {
  ok: boolean,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ApiRequestError | DbError>
) {
  const { method, body } = req

  if (method != 'POST') {
    res.setHeader("Allow", "POST");
    res.status(405).end();
  }

  const request = AccountEntrySchema.safeParse(body);

  if (!request.success) {
    const { errors } = request.error;

    return res.status(400).json({ error: { message: "Invalid request", errors } })
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
    res.status(400).json({ error: "DB transaction failed" })
  }

  res.status(200).json({ ok: true })
}