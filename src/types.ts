import { Long } from "mongodb";
import { z } from "zod";

export const UsernameEntrySchema = z.object({
    displayName: z.string(),
})

export type UsernameEntry = z.infer<typeof UsernameEntrySchema>

export const AccountEntrySchema = z.object({
    accountHash: z.string(),
    displayName: z.string(),
})

export type AccountEntry = z.infer<typeof AccountEntrySchema>

export type ApiRequestError = {
    error: {
        message: string,
        errors: z.ZodIssue[],
    }
}

export type DbError = {
    error: string,
}