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

export const HiscoreSkillEntrySchema = z.object({
    xp: z.number(),
    level: z.number(),
    rank: z.number(),
})

export type HiscoreSkillEntry = z.infer<typeof HiscoreSkillEntrySchema>

export const HiscoreActivityEntrySchema = z.object({
    rank: z.number(),
    score: z.number(),
})

export type HiscoreActivityEntry = z.infer<typeof HiscoreActivityEntrySchema>

export const HiscoreSkillsEntrySchema = z.object({
    overall: HiscoreSkillEntrySchema,
    attack: HiscoreSkillEntrySchema,
    strength: HiscoreSkillEntrySchema,
    defence: HiscoreSkillEntrySchema,
    hitpoints: HiscoreSkillEntrySchema,
    ranged: HiscoreSkillEntrySchema,
    prayer: HiscoreSkillEntrySchema,
    magic: HiscoreSkillEntrySchema,
    cooking: HiscoreSkillEntrySchema,
    woodcutting: HiscoreSkillEntrySchema,
    fletching: HiscoreSkillEntrySchema,
    fishing: HiscoreSkillEntrySchema,
    firemaking: HiscoreSkillEntrySchema,
    crafting: HiscoreSkillEntrySchema,
    smithing: HiscoreSkillEntrySchema,
    mining: HiscoreSkillEntrySchema,
    herblore: HiscoreSkillEntrySchema,
    agility: HiscoreSkillEntrySchema,
    thieving: HiscoreSkillEntrySchema,
    slayer: HiscoreSkillEntrySchema,
    farming: HiscoreSkillEntrySchema,
    runecraft: HiscoreSkillEntrySchema,
    hunter: HiscoreSkillEntrySchema,
    construction: HiscoreSkillEntrySchema,
})

export type HiscoreSkillsEntry = z.infer<typeof HiscoreSkillsEntrySchema>

export const HiscoreActivitiesEntrySchema = z.object({
    leaguePoints: HiscoreActivityEntrySchema.nullable(),
    clueScrollsAll: HiscoreActivityEntrySchema.nullable(),
    clueScrollsBeginner: HiscoreActivityEntrySchema.nullable(),
    clueScrollsEasy: HiscoreActivityEntrySchema.nullable(),
    clueScrollsMedium: HiscoreActivityEntrySchema.nullable(),
    clueScrollsHard: HiscoreActivityEntrySchema.nullable(),
    clueScrollsElite: HiscoreActivityEntrySchema.nullable(),
    clueScrollsMaster: HiscoreActivityEntrySchema.nullable(),
    soulWarsZeal: HiscoreActivityEntrySchema.nullable(),
    riftsClosed: HiscoreActivityEntrySchema.nullable(),
    abyssalSire: HiscoreActivityEntrySchema.nullable(),
    alchemicalHydra: HiscoreActivityEntrySchema.nullable(),
    artio: HiscoreActivityEntrySchema.nullable(),
    barrowsChests: HiscoreActivityEntrySchema.nullable(),
    bryophyta: HiscoreActivityEntrySchema.nullable(),
    callisto: HiscoreActivityEntrySchema.nullable(),
    calvarion: HiscoreActivityEntrySchema.nullable(),
    cerberus: HiscoreActivityEntrySchema.nullable(),
    chambersOfXeric: HiscoreActivityEntrySchema.nullable(),
    chambersOfXericChallengeMode: HiscoreActivityEntrySchema.nullable(),
    chaosElemental: HiscoreActivityEntrySchema.nullable(),
    chaosFanatic: HiscoreActivityEntrySchema.nullable(),
    commanderZilyana: HiscoreActivityEntrySchema.nullable(),
    corporealBeast: HiscoreActivityEntrySchema.nullable(),
    crazyArchaeologist: HiscoreActivityEntrySchema.nullable(),
    dagannothPrime: HiscoreActivityEntrySchema.nullable(),
    dagannothRex: HiscoreActivityEntrySchema.nullable(),
    dagannothSupreme: HiscoreActivityEntrySchema.nullable(),
    derangedArchaeologist: HiscoreActivityEntrySchema.nullable(),
    dukeSucellus: HiscoreActivityEntrySchema.nullable(),
    generalGraardor: HiscoreActivityEntrySchema.nullable(),
    giantMole: HiscoreActivityEntrySchema.nullable(),
    grotesqueGuardians: HiscoreActivityEntrySchema.nullable(),
    hespori: HiscoreActivityEntrySchema.nullable(),
    kalphiteQueen: HiscoreActivityEntrySchema.nullable(),
    kingBlackDragon: HiscoreActivityEntrySchema.nullable(),
    kraken: HiscoreActivityEntrySchema.nullable(),
    kreearra: HiscoreActivityEntrySchema.nullable(),
    krilTsutsaroth: HiscoreActivityEntrySchema.nullable(),
    mimic: HiscoreActivityEntrySchema.nullable(),
    nex: HiscoreActivityEntrySchema.nullable(),
    nightmare: HiscoreActivityEntrySchema.nullable(),
    phosanisNightmare: HiscoreActivityEntrySchema.nullable(),
    obor: HiscoreActivityEntrySchema.nullable(),
    phantomMuspah: HiscoreActivityEntrySchema.nullable(),
    sarachnis: HiscoreActivityEntrySchema.nullable(),
    scorpia: HiscoreActivityEntrySchema.nullable(),
    skotizo: HiscoreActivityEntrySchema.nullable(),
    spindel: HiscoreActivityEntrySchema.nullable(),
    tempoross: HiscoreActivityEntrySchema.nullable(),
    theGauntlet: HiscoreActivityEntrySchema.nullable(),
    theCorruptedGauntlet: HiscoreActivityEntrySchema.nullable(),
    theLeviathan: HiscoreActivityEntrySchema.nullable(),
    theWhisperer: HiscoreActivityEntrySchema.nullable(),
    theatreOfBlood: HiscoreActivityEntrySchema.nullable(),
    theatreOfBloodHardMode: HiscoreActivityEntrySchema.nullable(),
    thermonuclearSmokeDevil: HiscoreActivityEntrySchema.nullable(),
    tombsOfAmascut: HiscoreActivityEntrySchema.nullable(),
    tombsOfAmascutExpertMode: HiscoreActivityEntrySchema.nullable(),
    tzkalZuk: HiscoreActivityEntrySchema.nullable(),
    tztokJad: HiscoreActivityEntrySchema.nullable(),
    vardorvis: HiscoreActivityEntrySchema.nullable(),
    venenatis: HiscoreActivityEntrySchema.nullable(),
    vetion: HiscoreActivityEntrySchema.nullable(),
    vorkath: HiscoreActivityEntrySchema.nullable(),
    wintertodt: HiscoreActivityEntrySchema.nullable(),
    zalcano: HiscoreActivityEntrySchema.nullable(),
    zulrah: HiscoreActivityEntrySchema.nullable(),
})

export type HiscoreActivitiesEntry = z.infer<typeof HiscoreActivitiesEntrySchema>

export const HiscoreEntrySchema = z.object({
    skills: HiscoreSkillsEntrySchema,
    activities: HiscoreActivitiesEntrySchema,
})

export type HiscoreEntry = z.infer<typeof HiscoreEntrySchema>

export const StatEntrySchema = z.object({
    timestamp: z.date(),
    displayName: z.string(),
    stats: HiscoreEntrySchema,
})

export type StatEntry = z.infer<typeof StatEntrySchema>

export const Skills = ['overall', 'attack', 'strength', 'defence', 'hitpoints', 'ranged', 'prayer', 'magic', 'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking', 'crafting', 'smithing', 'mining', 'herblore', 'agility', 'thieving', 'slayer', 'farming', 'runecraft', 'hunter', 'construction'] as const
export type Skill = typeof Skills[number]
export type SkillData = 'rank' | 'level' | 'xp'

export const Activities = ['leaguePoints', 'clueScrollsAll', 'clueScrollsBeginner', 'clueScrollsEasy', 'clueScrollsMedium', 'clueScrollsHard', 'clueScrollsElite', 'clueScrollsMaster', 'soulWarsZeal', 'riftsClosed', 'abyssalSire', 'alchemicalHydra', 'artio', 'barrowsChests', 'bryophyta', 'callisto', 'calvarion', 'cerberus', 'chambersOfXeric', 'chambersOfXericChallengeMode', 'chaosElemental', 'chaosFanatic', 'commanderZilyana', 'corporealBeast', 'crazyArchaeologist', 'dagannothPrime', 'dagannothRex', 'dagannothSupreme', 'derangedArchaeologist', 'dukeSucellus', 'generalGraardor', 'giantMole', 'grotesqueGuardians', 'hespori', 'kalphiteQueen', 'kingBlackDragon', 'kraken', 'kreearra', 'krilTsutsaroth', 'mimic', 'nex', 'nightmare', 'phosanisNightmare', 'obor', 'phantomMuspah', 'sarachnis', 'scorpia', 'skotizo', 'spindel', 'tempoross', 'theGauntlet', 'theCorruptedGauntlet', 'theLeviathan', 'theWhisperer', 'theatreOfBlood', 'theatreOfBloodHardMode', 'thermonuclearSmokeDevil', 'tombsOfAmascut', 'tombsOfAmascutExpertMode', 'tzkalZuk', 'tztokJad', 'vardorvis', 'venenatis', 'vetion', 'vorkath', 'wintertodt', 'zalcano', 'zulrah'] as const
export type Activity = typeof Activities[number]
export type ActivityData = 'rank' | 'score'

export const EventLocationSchema = z.object({
    x: z.number(),
    y: z.number(),
    plane: z.number(),
    region: z.number(),
})

export type EventLocation = z.infer<typeof EventLocationSchema>

export const LootEntrySchema = z.object({
    timestamp: z.string().pipe(z.coerce.date()),
    accountHash: z.string(),
    itemName: z.string(),
    itemId: z.number(),
    sourceName: z.string(),
    sourceLevel: z.number().nullable(),
    location: EventLocationSchema,
})

export type LootEntry = z.infer<typeof LootEntrySchema>

export type UserEventType = 'Loot' // TODO: Add more event types

export const userEventTypes: UserEventType[] = ['Loot']

export type LootEntryEvent = Omit<LootEntry, "accountHash">

export type UserEvent
    = { type: UserEventType, event: LootEntryEvent }

export const TopPlayerEntrySchema = z.object({
    displayName: z.string(),
    leaguePoints: z.number(),
})

export type TopPlayerEntry = z.infer<typeof TopPlayerEntrySchema>