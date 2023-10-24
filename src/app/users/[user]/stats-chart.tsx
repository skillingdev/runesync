'use client'

import {
    Axis,
    Grid,
    LineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';
import { curveStep } from '@visx/curve'
import { CheckboxGroup, Checkbox, Selection, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Skeleton, Spinner } from "@nextui-org/react"

import { Activities, Activity, ActivityData, Skill, SkillData, Skills, StatEntry } from '~/types'
import { ParentSize } from '@visx/responsive'
import { useEffect, useMemo, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { TooltipWithBounds } from '@visx/tooltip';

const ACTIVITIES_KEYS = "user-activities-keys"
const ACTIVITIES_DATA_KEY = "user-activities-data-key"
const SKILLS_KEYS = "user-skills-keys"
const SKILLS_DATA_KEY = "user-skills-data-key"

const INITIAL_SKILLS: Skill[] = []
const INITIAL_ACTIVITIES: Activity[] = ['leaguePoints']

const dateAccessor = (d: StatEntry) => d.timestamp.toLocaleString()

function getActivityData(activity: Activity, data: ActivityData) {
    return function (d: StatEntry) {
        switch (data) {
            case 'rank': return d.stats.activities[activity]?.rank
            case 'score': return d.stats.activities[activity]?.score || 0
        }
    }
}

function getSkillData(skill: Skill, data: SkillData) {
    return function (d: StatEntry) {
        return d.stats.skills[skill][data]
    }
}

function getActivityName(activity: Activity): string {
    switch (activity) {
        case 'leaguePoints': return "League Points"
        case 'clueScrollsAll': return "Clue Scrolls (all)"
        case 'clueScrollsBeginner': return "Clue Scrolls (beginner)"
        case 'clueScrollsEasy': return "Clue Scrolls (easy)"
        case 'clueScrollsMedium': return "Clue Scrolls (medium)"
        case 'clueScrollsHard': return "Clue Scrolls (hard)"
        case 'clueScrollsElite': return "Clue Scrolls (elite)"
        case 'clueScrollsMaster': return "Clue Scrolls (master)"
        case 'soulWarsZeal': return "Soul Wars Zeal"
        case 'riftsClosed': return "Rifts Closed"
        case 'abyssalSire': return "Abyssal Sire"
        case 'alchemicalHydra': return "Alchemical Hydra"
        case 'artio': return "Artio"
        case 'barrowsChests': return "Barrows Chests"
        case 'bryophyta': return "Bryophyta"
        case 'callisto': return "Callisto"
        case 'calvarion': return "Calvar'ion"
        case 'cerberus': return "Cerberus"
        case 'chambersOfXeric': return "CoX"
        case 'chambersOfXericChallengeMode': return "CoX (challenge mode)"
        case 'chaosElemental': return "Chaos Elemental"
        case 'chaosFanatic': return "Chaos Fanatic"
        case 'commanderZilyana': return "Commander Zilyana"
        case 'corporealBeast': return "Corporeal Beast"
        case 'crazyArchaeologist': return "Crazy Archaeologist"
        case 'dagannothPrime': return "Dagannoth Prime"
        case 'dagannothRex': return "Dagannoth Rex"
        case 'dagannothSupreme': return "Dagannoth Supreme"
        case 'derangedArchaeologist': return "Deranged Archaeologist"
        case 'dukeSucellus': return "Duke Sucellus"
        case 'generalGraardor': return "General Graardor"
        case 'giantMole': return "Giant Mole"
        case 'grotesqueGuardians': return "Grotesque Guardians"
        case 'hespori': return "Hespori"
        case 'kalphiteQueen': return "Kalphite Queen"
        case 'kingBlackDragon': return "King Black Dragon"
        case 'kraken': return "Kraken"
        case 'kreearra': return "Kree'arra"
        case 'krilTsutsaroth': return "K'ril Tsutsaroth"
        case 'mimic': return "Mimic"
        case 'nex': return "Nex"
        case 'nightmare': return "Nightmare"
        case 'phosanisNightmare': return "Phosani's Nightmare"
        case 'obor': return "Obor"
        case 'phantomMuspah': return "Phantom Muspah"
        case 'sarachnis': return "Sarachnis"
        case 'scorpia': return "Scorpia"
        case 'skotizo': return "Skotizo"
        case 'spindel': return "Spindel"
        case 'tempoross': return "Tempoross"
        case 'theGauntlet': return "The Gauntlet"
        case 'theCorruptedGauntlet': return "The Corrupted Gauntlet"
        case 'theLeviathan': return "The Leviathan"
        case 'theWhisperer': return "The Whisperer"
        case 'theatreOfBlood': return "ToB"
        case 'theatreOfBloodHardMode': return "ToB (hard mode)"
        case 'thermonuclearSmokeDevil': return "Thermonuclear Smoke Devil"
        case 'tombsOfAmascut': return "ToA"
        case 'tombsOfAmascutExpertMode': return "ToA (expert mode)"
        case 'tzkalZuk': return "Zuk"
        case 'tztokJad': return "Jad"
        case 'vardorvis': return "Vardorvis"
        case 'venenatis': return "Venenatis"
        case 'vetion': return "Vet'ion"
        case 'vorkath': return "Vorkath"
        case 'wintertodt': return "Wintertodt"
        case 'zalcano': return "Zalcano"
        case 'zulrah': return "Zulrah"
    }
}

function getSkillName(skill: Skill): string {
    switch (skill) {
        case 'overall': return "Overall Skills"
        case 'attack': return "Attack"
        case 'strength': return "Strength"
        case 'defence': return "Defence"
        case 'hitpoints': return "Hitpoints"
        case 'ranged': return "Ranged"
        case 'prayer': return "Prayer"
        case 'magic': return "Magic"
        case 'cooking': return "Cooking"
        case 'woodcutting': return "Woodcutting"
        case 'fletching': return "Fletching"
        case 'fishing': return "Fishing"
        case 'firemaking': return "Firemaking"
        case 'crafting': return "Crafting"
        case 'smithing': return "Smithing"
        case 'mining': return "Mining"
        case 'herblore': return "Herblore"
        case 'agility': return "Agility"
        case 'thieving': return "Thieving"
        case 'slayer': return "Slayer"
        case 'farming': return "Farming"
        case 'runecraft': return "Runecraft"
        case 'hunter': return "Hunter"
        case 'construction': return "Construction"
    }
}

export function StatsEmpty() {
    return (
        <div className="w-full flex items-center justify-center h-[440px]">
            <span>No stats found.</span>
        </div>
    )
}

export function StatsLoading() {
    return (
        <Skeleton className="rounded-lg">
            <div className="h-[440px] rounded-lg bg-default-300"></div>
        </Skeleton>
    )
}

export function StatsChart({ statEntries }: { statEntries: StatEntry[] }) {
    const [selectedSkillKeys, setSelectedSkillKeys] = useState<Selection>(new Set(["overall"]))
    const [selectedSkillDataKeys, setSelectedSkillDataKeys] = useState<Selection>(new Set(['level']))
    const [selectedActivitiesKeys, setSelectedActivitiesKeys] = useState<Selection>(new Set(["leaguePoints"]))
    const [selectedActivitiesDataKeys, setSelectedActivitiesDataKeys] = useState<Selection>(new Set(['score']))

    useEffect(() => {
        const storedActivityKeys = localStorage.getItem(ACTIVITIES_KEYS)
        if (storedActivityKeys) {
            setSelectedActivitiesKeys(new Set(JSON.parse(storedActivityKeys)))
        }
        const storedActivityDataKey = localStorage.getItem(ACTIVITIES_DATA_KEY)
        if (storedActivityDataKey) {
            setSelectedActivitiesDataKeys(new Set([JSON.parse(storedActivityDataKey)]))
        }
        const storedSkillKeys = localStorage.getItem(SKILLS_KEYS)
        if (storedSkillKeys) {
            setSelectedSkillKeys(new Set(JSON.parse(storedSkillKeys)))
        }
        const storedSkillDataKey = localStorage.getItem(SKILLS_DATA_KEY)
        if (storedSkillDataKey) {
            setSelectedSkillDataKeys(new Set([JSON.parse(storedSkillDataKey)]))
        }
    }, [])

    const handleSkillKeys = (selection: Selection) => {
        setSelectedSkillKeys(selection)
        if (selection == "all") {
            localStorage.setItem(SKILLS_KEYS, JSON.stringify(Array.of(...Skills)))
        } else {
            localStorage.setItem(SKILLS_KEYS, JSON.stringify(Array.from(selection)))
        }
    }

    const handleSkillDataKey = (selection: Selection) => {
        setSelectedSkillDataKeys(selection)
        if (selection == "all") {
            localStorage.setItem(SKILLS_DATA_KEY, "level")
        } else {
            localStorage.setItem(SKILLS_DATA_KEY, JSON.stringify(Array.from(selection)[0]))
        }
    }

    const handleActivityKeys = (selection: Selection) => {
        setSelectedActivitiesKeys(selection)
        if (selection == "all") {
            localStorage.setItem(ACTIVITIES_KEYS, JSON.stringify(Array.of(...Activities)))
        } else {
            localStorage.setItem(ACTIVITIES_KEYS, JSON.stringify(Array.from(selection)))
        }
    }

    const handleActivityDataKey = (selection: Selection) => {
        setSelectedActivitiesDataKeys(selection)
        if (selection == "all") {
            localStorage.setItem(ACTIVITIES_DATA_KEY, "score")
        } else {
            localStorage.setItem(ACTIVITIES_DATA_KEY, JSON.stringify(Array.from(selection)[0]))
        }
    }

    const selectedActivities: Activity[] = useMemo(() => {
        if (selectedActivitiesKeys == 'all') {
            return Array.of(...Activities)
        }

        return (Array.from(selectedActivitiesKeys) as Activity[])
    }, [selectedActivitiesKeys])

    const selectedActivitiesData: ActivityData = useMemo(() => {
        if (selectedActivitiesDataKeys == "all") {
            return 'score'
        }

        return Array.from(selectedActivitiesDataKeys)[0] as ActivityData
    }, [selectedActivitiesDataKeys])


    const selectedSkills: Skill[] = useMemo(() => {
        if (selectedSkillKeys == 'all') {
            return Array.of(...Skills)
        }

        return (Array.from(selectedSkillKeys) as Skill[])
    }, [selectedSkillKeys])

    const selectedSkillData: SkillData = useMemo(() => {
        if (selectedSkillDataKeys == "all") {
            return 'level'
        }

        return Array.from(selectedSkillDataKeys)[0] as SkillData
    }, [selectedSkillDataKeys])

    return (
        <div className="flex w-full max-w-full gap-8 mt-8 flex-col lg:flex-row">
            <div className="w-full max-w-full overflow-y-hidden h-[440px] ">
                <div className="flex justify-between items-center">
                    <div className="text-2xl">Activities</div>
                    <div className="flex gap-3">
                        <Dropdown shouldBlockScroll={false}>
                            <DropdownTrigger>
                                <Button
                                    variant="light"
                                    radius='none'
                                    endContent={<FaChevronDown />}
                                >
                                    Select Activities
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Select skills"
                                variant="light"
                                closeOnSelect={false}
                                disallowEmptySelection
                                selectionMode="multiple"
                                selectedKeys={selectedActivitiesKeys}
                                onSelectionChange={handleActivityKeys}
                                className="h-48 overflow-auto"
                            >
                                {...Activities.map((output) => (
                                    <DropdownItem key={output}>{getActivityName(output)}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown shouldBlockScroll={false}>
                            <DropdownTrigger>
                                <Button
                                    radius='none'
                                    variant="light"
                                    className="capitalize"
                                    endContent={<FaChevronDown />}
                                >
                                    {selectedActivitiesData}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Select skill data"
                                variant="light"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedActivitiesDataKeys}
                                onSelectionChange={handleActivityDataKey}
                            >
                                <DropdownItem key="score">Score</DropdownItem>
                                <DropdownItem key="rank">Rank</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ParentSize ignoreDimensions={'height'} className="flex justify-center max-w-full overflow-y-hidden">
                        {(parent) => (
                            <XYChart height={400} width={Math.max(200, parent.width)} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                                <Axis orientation="bottom" numTicks={4} />
                                <Axis orientation="right" numTicks={4} />
                                <Grid columns={false} numTicks={4} />

                                {selectedActivities.map(activity => (
                                    <LineSeries key={activity} curve={curveStep} dataKey={activity} data={statEntries} xAccessor={dateAccessor} yAccessor={getActivityData(activity, selectedActivitiesData)} />
                                ))}

                                <Tooltip<StatEntry>
                                    snapTooltipToDatumX
                                    snapTooltipToDatumY
                                    showVerticalCrosshair
                                    showSeriesGlyphs
                                    detectBounds={true}
                                    renderTooltip={({ tooltipData, colorScale }) => {
                                        const datum = tooltipData?.nearestDatum?.datum;
                                        if (!datum) {
                                            return <div>No data.</div>
                                        }

                                        return (
                                            <>
                                                <div className="mb-2">{datum.timestamp.toLocaleString()}</div>
                                                {selectedActivities.map((output) => (
                                                    <div key={output}><span style={{ color: colorScale?.(output) }}>{getActivityName(output)}</span>: {getActivityData(output, selectedActivitiesData)(datum) || "Unranked"}</div>
                                                ))}
                                            </>
                                        )
                                    }}
                                />
                            </XYChart>
                        )}
                    </ParentSize>
                </div>
            </div>

            <div className="w-full max-w-full overflow-y-hidden h-[440px]">
                <div className="flex justify-between items-center">
                    <div className="text-2xl">Skills</div>
                    <div className="flex gap-3">
                        <Dropdown shouldBlockScroll={false}>
                            <DropdownTrigger>
                                <Button
                                    radius='none'
                                    variant="light"
                                    endContent={<FaChevronDown />}
                                >
                                    Select Skills
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Select skills"
                                variant="light"
                                closeOnSelect={false}
                                disallowEmptySelection
                                selectionMode="multiple"
                                selectedKeys={selectedSkillKeys}
                                onSelectionChange={handleSkillKeys}
                                className="h-48 overflow-auto"
                            >
                                {...Skills.map((output) => (
                                    <DropdownItem key={output}>{getSkillName(output)}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown shouldBlockScroll={false}>
                            <DropdownTrigger>
                                <Button
                                    radius='none'
                                    variant="light"
                                    className="capitalize"
                                    endContent={<FaChevronDown />}
                                >
                                    {selectedSkillData}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Select skill data"
                                variant="light"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedSkillDataKeys}
                                onSelectionChange={handleSkillDataKey}
                            >
                                <DropdownItem key="level">Level</DropdownItem>
                                <DropdownItem key="xp">XP</DropdownItem>
                                <DropdownItem key="rank">Rank</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ParentSize ignoreDimensions={'height'} className="flex justify-center max-w-full overflow-y-hidden">
                        {(parent) => (
                            <XYChart height={400} width={Math.max(200, parent.width)} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                                <Axis orientation="bottom" numTicks={4} />
                                <Axis orientation="right" numTicks={4} />
                                <Grid columns={false} numTicks={4} />

                                {selectedSkills.map(skill => (
                                    <LineSeries key={skill} curve={curveStep} dataKey={skill} data={statEntries} xAccessor={dateAccessor} yAccessor={getSkillData(skill, selectedSkillData)} />
                                ))}

                                <Tooltip<StatEntry>
                                    snapTooltipToDatumX
                                    snapTooltipToDatumY
                                    showVerticalCrosshair
                                    showSeriesGlyphs
                                    renderTooltip={({ tooltipData, colorScale }) => {
                                        const datum = tooltipData?.nearestDatum?.datum;
                                        if (!datum) {
                                            return <div>No data.</div>
                                        }

                                        return (
                                            <>
                                                <div className="mb-2">{datum.timestamp.toLocaleString()}</div>
                                                {selectedSkills.map((output) => (
                                                    <div key={output}><span style={{ color: colorScale?.(output) }}>{getSkillName(output)}</span>: {getSkillData(output, selectedSkillData)(datum)}</div>
                                                ))}
                                            </>
                                        )

                                    }}
                                />
                            </XYChart>
                        )}
                    </ParentSize>
                </div>
            </div>
        </div >
    )
}

/**
 *             <div className="w-60 flex">
                <CheckboxGroup value={selectedSkills} onValueChange={handleSkillValueChange}>
                    {...Skills.map((output) => (
                        <Checkbox value={output}>{getSkillName(output)}</Checkbox>
                    ))}
                </CheckboxGroup>
                <CheckboxGroup value={selectedActivities} onValueChange={handleActivityValueChange}>
                    {...Activities.map((output) => (
                        <Checkbox value={output}>{getActivityName(output)}</Checkbox>
                    ))}
                </CheckboxGroup>
            </div>

 */
/**                            {selectedActivities.map(activity => (
                                <LineSeries curve={curveStep} dataKey={activity} data={statEntries} xAccessor={dateAccessor} yAccessor={getActivityData(activity, 'score')} />
                            ))}

 */