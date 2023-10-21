'use client'

import {
    Axis,
    Grid,
    LineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';
import { curveStep } from '@visx/curve'

import { StatEntry } from '~/types';

export function Stats({ statEntries }: { statEntries: StatEntry[] }) {
    const accessors = {
        xAccessor: (d: StatEntry) => d.timestamp.toLocaleString(),
        yAccessor: (d: StatEntry) => d.stats.activities.leaguePoints?.score || 1,
    };

    const render = () => (
        <XYChart height={600} width={800} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
            <Axis orientation="bottom" numTicks={4} />
            <Axis orientation="right" numTicks={4} />
            <Grid columns={false} numTicks={4} />
            <LineSeries curve={curveStep} dataKey="League Points" data={statEntries} {...accessors} />
            <Tooltip<StatEntry>
                snapTooltipToDatumX
                snapTooltipToDatumY
                showSeriesGlyphs
                renderTooltip={({ tooltipData }) => (
                    <>
                        {(tooltipData?.nearestDatum?.datum &&
                            accessors.xAccessor(tooltipData?.nearestDatum?.datum)) ||
                            'No date'}
                        <br />
                        <br />
                        {(tooltipData?.nearestDatum?.datum &&
                            ("League Points: " + accessors.yAccessor(
                                tooltipData?.nearestDatum?.datum,
                            ))) || 'No value'}
                    </>
                )} />
        </XYChart>
    )

    return render()
}