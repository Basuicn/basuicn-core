// ─── Chart design tokens (Kraken palette) ────────────────────────────────────

export const CHART_COLORS = [
  '#7132f5', '#149e61', '#2563eb', '#f59e0b',
  '#ef4444', '#c4b0ff', '#5741d8', '#1acc72',
] as const;

/** Axis tick style */
export const CHART_AX  = { fontSize: 12, fill: '#9497a9' } as const;

/** Cartesian grid style */
export const CHART_GRD = { stroke: '#dedee5', strokeDasharray: '4 4' } as const;

// ─── Shared prop types ────────────────────────────────────────────────────────

export type SeriesItem = {
  key: string;
  name?: string;
  color?: string;
  stackId?: string;
};

export type PieDataItem = {
  name: string;
  value: number;
  color?: string;
};

/** Dữ liệu trả về khi onClick trên các chart
 *  - activeLabel : giá trị trục X (category) tại vị trí click
 *  - activeIndex : vị trí trong mảng data
 *  - dataKey     : key của series được click (line/area/bar cụ thể)
 *  - payload     : toàn bộ row data tại vị trí đó (data[activeIndex])
 */
export type ChartClickEvent = {
  activeLabel?: string | number;
  activeIndex?: number;
  dataKey?: string;
  payload?: Record<string, unknown>;
};
