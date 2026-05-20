/**
 * Pure helpers used by the Watermark component.
 * Kept framework-agnostic so they can be unit-tested in isolation.
 */

export interface WatermarkFont {
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
}

export interface BuildWatermarkSvgOptions {
  /** Lines of text rendered as the watermark. Ignored when `image` is set. */
  lines?: string[];
  /** Image URL rendered as the watermark. Takes priority over text. */
  image?: string;
  /** Width of the watermark content area (excluding gap). */
  width: number;
  /** Height of the watermark content area (excluding gap). */
  height: number;
  /** Horizontal gap between repetitions, in pixels. */
  gapX: number;
  /** Vertical gap between repetitions, in pixels. */
  gapY: number;
  /** Rotation in degrees, centered on the content. */
  rotate: number;
  /** Font configuration for text watermarks. */
  font: Required<WatermarkFont>;
}

export interface BuildWatermarkSvgResult {
  /** `data:image/svg+xml,...` URL safe to use as `background-image`. */
  url: string;
  /** Full tile size = content + gap. */
  tileWidth: number;
  tileHeight: number;
}

const escapeXml = (value: string): string =>
  value.replace(/[<>&"']/g, (ch) => {
    switch (ch) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      default: return '&apos;';
    }
  });

const renderTextNode = (lines: string[], font: Required<WatermarkFont>, cx: number, cy: number): string => {
  const lineHeight = font.fontSize * 1.2;
  const startY = cy - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((line, i) =>
      `<tspan x="${cx}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join('');
  return (
    `<text fill="${font.color}" font-size="${font.fontSize}" font-weight="${font.fontWeight}" ` +
    `font-family="${font.fontFamily}" font-style="${font.fontStyle}" ` +
    `text-anchor="middle" dominant-baseline="middle">${tspans}</text>`
  );
};

const renderImageNode = (image: string, width: number, height: number, cx: number, cy: number): string =>
  `<image href="${escapeXml(image)}" x="${cx - width / 2}" y="${cy - height / 2}" ` +
  `width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" />`;

/**
 * Build a tiled SVG data URL representing one watermark cell.
 * The cell is `(width + gapX) × (height + gapY)`; the watermark content is
 * centered and rotated. Browsers tile it via `background-repeat`.
 */
export function buildWatermarkSvg(opts: BuildWatermarkSvgOptions): BuildWatermarkSvgResult {
  const { lines, image, width, height, gapX, gapY, rotate, font } = opts;
  const tileWidth = width + gapX;
  const tileHeight = height + gapY;
  const cx = tileWidth / 2;
  const cy = tileHeight / 2;

  const inner = image
    ? renderImageNode(image, width, height, cx, cy)
    : renderTextNode(lines ?? [], font, cx, cy);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${tileHeight}" ` +
    `viewBox="0 0 ${tileWidth} ${tileHeight}">` +
    `<g transform="rotate(${rotate} ${cx} ${cy})">${inner}</g></svg>`;

  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    tileWidth,
    tileHeight,
  };
}
