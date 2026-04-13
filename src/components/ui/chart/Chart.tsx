import * as React from 'react';
import {
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    PieChart, Pie, Cell,
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { TooltipContentProps, TooltipIndex } from 'recharts';
import {
    CHART_COLORS, CHART_AX, CHART_GRD,
} from './chart-tokens';
import type { SeriesItem, PieDataItem, ChartClickEvent } from './chart-tokens';

// ─── Helper: tìm row bằng activeLabel (recharts v3 không có activePayload trong onClick) ─
const resolveByLabel = (
    data: Record<string, unknown>[],
    labelKey: string,
    activeLabel: string | number | undefined,
    e: React.SyntheticEvent,
    cb: (payload: ChartClickEvent, event: React.MouseEvent) => void,
) => {
    if (activeLabel == null) return;
    const idx = data.findIndex(d => d[labelKey] === activeLabel);
    if (idx < 0) return;
    cb({ activeLabel, activeIndex: idx, payload: data[idx] }, e as React.MouseEvent);
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
export const ChartTooltip = ({ active, payload, label }: TooltipContentProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-border bg-background p-3 shadow-[rgba(0,0,0,0.1)_0px_4px_20px] text-sm min-w-[150px]">
            {label != null && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>
            )}
            {payload.map((e) => (
                <div key={String(e.dataKey)} className="flex items-center gap-2 py-0.5">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: e.color }} />
                    <span className="text-muted-foreground">{e.name}:</span>
                    <span className="ml-auto pl-3 font-semibold text-foreground">
                        {typeof e.value === 'number' ? e.value.toLocaleString() : e.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

// ─── ChartLine ────────────────────────────────────────────────────────────────
export interface ChartLineProps {
    data: Record<string, unknown>[];
    xKey: string;
    series: SeriesItem[];
    height?: number;
    curved?: boolean;
    defaultIndex?: TooltipIndex;
    onClick?: (payload: ChartClickEvent, event: React.MouseEvent) => void;
}

export const ChartLine: React.FC<ChartLineProps> = ({
    data, xKey, series, height = 280, curved = true, defaultIndex, onClick,
}) => (
    <ResponsiveContainer width="100%" height={height}>
        <LineChart
            data={data}
            margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
            style={{ cursor: onClick ? 'pointer' : undefined }}
            onClick={onClick
                ? ({ activeLabel }, e) => resolveByLabel(data, xKey, activeLabel, e, onClick)
                : undefined}
        >
            <CartesianGrid {...CHART_GRD} vertical={false} />
            <XAxis dataKey={xKey} tick={CHART_AX} axisLine={false} tickLine={false} />
            <YAxis tick={CHART_AX} axisLine={false} tickLine={false} width={64} />
            <Tooltip content={ChartTooltip} defaultIndex={defaultIndex} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {series.map((s, i) => (
                <Line key={s.key} type={curved ? 'monotone' : 'linear'}
                    dataKey={s.key} name={s.name ?? s.key}
                    stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
                    strokeWidth={2} dot={false}
                    activeDot={onClick ? makeActiveDot(xKey, onClick) : { r: 5, strokeWidth: 0 }} />
            ))}
        </LineChart>
    </ResponsiveContainer>
);

// ─── ChartBar ─────────────────────────────────────────────────────────────────
export interface ChartBarProps {
    data: Record<string, unknown>[];
    xKey: string;
    series: SeriesItem[];
    height?: number;
    stacked?: boolean;
    layout?: 'horizontal' | 'vertical';
    defaultIndex?: TooltipIndex;
    onClick?: (payload: ChartClickEvent, event: React.MouseEvent) => void;
}

export const ChartBar: React.FC<ChartBarProps> = ({
    data, xKey, series, height = 280, stacked, layout = 'horizontal', defaultIndex, onClick,
}) => (
    <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout={layout} margin={{ top: 4, right: 16, left: 0, bottom: 0 }} barCategoryGap="35%">
            {layout === 'horizontal' ? (
                <>
                    <XAxis dataKey={xKey} tick={CHART_AX} axisLine={false} tickLine={false} />
                    <YAxis tick={CHART_AX} axisLine={false} tickLine={false} width={64} />
                </>
            ) : (
                <>
                    <XAxis type="number" tick={CHART_AX} axisLine={false} tickLine={false} />
                    <YAxis dataKey={xKey} type="category" tick={CHART_AX} axisLine={false} tickLine={false} width={80} />
                </>
            )}
            <CartesianGrid {...CHART_GRD} vertical={layout === 'vertical'} horizontal={layout === 'horizontal'} />
            <Tooltip content={ChartTooltip} cursor={{ fill: 'rgba(113,50,245,0.05)' }} defaultIndex={defaultIndex} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {series.map((s, i) => (
                // Bar.onClick giống Pie.onClick — recharts truyền toàn bộ row data trực tiếp
                <Bar key={s.key} dataKey={s.key} name={s.name ?? s.key}
                    fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
                    radius={layout === 'horizontal' ? [4, 4, 0, 0] : [0, 4, 4, 0]}
                    stackId={stacked ? 'stack' : undefined}
                    cursor={onClick ? 'pointer' : undefined}
                    onClick={onClick
                        ? (barData, index, e) => {
                            const row = barData as unknown as Record<string, unknown>;
                            onClick({ activeLabel: row[xKey] as string | number, activeIndex: index, dataKey: s.key, payload: row }, e as React.MouseEvent);
                        }
                        : undefined} />
            ))}
        </BarChart>
    </ResponsiveContainer>
);

// ─── ChartArea ────────────────────────────────────────────────────────────────
export interface ChartAreaProps {
    data: Record<string, unknown>[];
    xKey: string;
    series: SeriesItem[];
    height?: number;
    stacked?: boolean;
    onClick?: (payload: ChartClickEvent, event: React.MouseEvent) => void;
}

export const ChartArea: React.FC<ChartAreaProps> = ({
    data, xKey, series, height = 280, stacked, onClick,
}) => {
    const uid = React.useId().replace(/:/g, '');
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart
                data={data}
                margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                style={{ cursor: onClick ? 'pointer' : undefined }}
                onClick={onClick
                    ? ({ activeLabel }, e) => resolveByLabel(data, xKey, activeLabel, e, onClick)
                    : undefined}
            >
                <defs>
                    {series.map((s, i) => {
                        const c = s.color ?? CHART_COLORS[i % CHART_COLORS.length];
                        return (
                            <linearGradient key={s.key} id={`${uid}${s.key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={c} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={c} stopOpacity={0} />
                            </linearGradient>
                        );
                    })}
                </defs>
                <CartesianGrid {...CHART_GRD} vertical={false} />
                <XAxis dataKey={xKey} tick={CHART_AX} axisLine={false} tickLine={false} />
                <YAxis tick={CHART_AX} axisLine={false} tickLine={false} width={64} />
                <Tooltip content={ChartTooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {series.map((s, i) => {
                    const c = s.color ?? CHART_COLORS[i % CHART_COLORS.length];
                    return (
                        <Area key={s.key} type="monotone" dataKey={s.key} name={s.name ?? s.key}
                            stroke={c} fill={`url(#${uid}${s.key})`} strokeWidth={2}
                            stackId={stacked ? 'stack' : undefined}
                            dot={false}
                            activeDot={onClick ? makeActiveDot(xKey, onClick) : { r: 5, strokeWidth: 0 }} />
                    );
                })}
            </AreaChart>
        </ResponsiveContainer>
    );
};

// ─── Helper: custom activeDot với onClick cho Line/Area ──────────────────────
type ActiveDotRenderProps = {
    cx?: number; cy?: number; r?: number;
    fill?: string; stroke?: string;
    payload?: Record<string, unknown>;
    index?: number;
    dataKey?: string; // key của series được click (vd: 'revenue', 'cost')
};

const makeActiveDot = (
    xKey: string,
    onClick: (payload: ChartClickEvent, event: React.MouseEvent) => void,
) => (dotProps: unknown) => {
    const { cx = 0, cy = 0, fill = '', payload = {}, index = 0, dataKey } = dotProps as ActiveDotRenderProps;
    return (
        <circle
            cx={cx} cy={cy} r={6}
            fill={fill} stroke="white" strokeWidth={2}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                onClick({ activeLabel: payload[xKey] as string | number, activeIndex: index, dataKey, payload }, e);
            }}
        />
    );
};

// ─── ChartPie ─────────────────────────────────────────────────────────────────
export interface ChartPieProps {
    data: PieDataItem[];
    donut?: boolean;
    height?: number;
    showLabel?: boolean;
    defaultIndex?: TooltipIndex;
    isAnimationActive?: boolean;
    onClick?: (payload: ChartClickEvent, event: React.MouseEvent) => void;
}

export const ChartPie: React.FC<ChartPieProps> = ({
    data, donut = false, height = 300, showLabel = true, defaultIndex, isAnimationActive = true, onClick,
}) => (
    <ResponsiveContainer width="100%" height={height}>
        <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <Pie data={data}
                cx="50%" cy="50%"
                dataKey="value"
                innerRadius={donut ? 50 : 0}
                outerRadius={80}
                isAnimationActive={isAnimationActive}
                onClick={onClick
                    ? (d, index, e) => {
                        const row = d as unknown as Record<string, unknown>;
                        onClick({ activeLabel: row['name'] as string, activeIndex: index, dataKey: 'value', payload: row }, e as React.MouseEvent);
                    }
                    : undefined}
                label={showLabel ? (props) => {
                    const { cx = 0, cy = 0, midAngle = 0, outerRadius = 0, percent = 0, name = '' } = props as {
                        cx?: number; cy?: number; midAngle?: number;
                        outerRadius?: number; percent?: number; name?: string;
                    };
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 15;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const shortName = name.length > 12 ? `${name.substring(0, 12)}...` : name;
                    return (
                        <text x={x} y={y} fill="currentColor" className="text-[11px] text-muted-foreground" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                            {shortName} {(percent * 100).toFixed(0)}%
                        </text>
                    );
                } : false}
                labelLine={showLabel ? { stroke: 'currentColor', className: 'text-border opacity-50' } : false}
            >
                {data.map((entry, i) => (
                    <Cell
                        key={entry.name}
                        fill={entry.color ?? CHART_COLORS[i % CHART_COLORS.length]}
                        style={{ cursor: onClick ? 'pointer' : 'default', outline: 'none' }}
                    />
                ))}
            </Pie>
            <Tooltip content={ChartTooltip} defaultIndex={defaultIndex} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} iconType="circle" />
        </PieChart>
    </ResponsiveContainer>
);

// ─── ChartRadar ───────────────────────────────────────────────────────────────
export interface ChartRadarProps {
    data: Record<string, unknown>[];
    angleKey: string;
    series: Array<{ key: string; name?: string; color?: string }>;
    height?: number;
    onClick?: (payload: ChartClickEvent, event: React.MouseEvent) => void;
}

export const ChartRadar: React.FC<ChartRadarProps> = ({
    data, angleKey, series, height = 280, onClick,
}) => (
    <ResponsiveContainer width="100%" height={height}>
        <RadarChart
            data={data}
            cx="50%" cy="50%" outerRadius="72%"
            style={{ cursor: onClick ? 'pointer' : undefined }}
            onClick={onClick
                ? ({ activeLabel }, e) => resolveByLabel(data, angleKey, activeLabel, e, onClick)
                : undefined}
        >
            <PolarGrid stroke="#dedee5" />
            <PolarAngleAxis dataKey={angleKey} tick={CHART_AX} />
            <Tooltip content={ChartTooltip} />
            <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
            {series.map((s, i) => {
                const c = s.color ?? CHART_COLORS[i % CHART_COLORS.length];
                return (
                    <Radar key={s.key} dataKey={s.key} name={s.name ?? s.key}
                        stroke={c} fill={c} fillOpacity={0.15} strokeWidth={2} />
                );
            })}
        </RadarChart>
    </ResponsiveContainer>
);

// ─── Re-export Recharts primitives for composed / custom charts ───────────────
export {
    ResponsiveContainer, LineChart, BarChart, AreaChart, PieChart, RadarChart,
    Line, Bar, Area, Pie, Cell, Radar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, PolarGrid, PolarAngleAxis,
} from 'recharts';
export type { TooltipProps, TooltipContentProps } from 'recharts';

// ─── Re-export tokens so consumers only need one import path ──────────────────
export type { SeriesItem, PieDataItem, ChartClickEvent } from './chart-tokens';
export { CHART_COLORS } from './chart-tokens';
