import * as React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';
import { buildWatermarkSvg, type WatermarkFont } from './buildWatermarkSvg';

const watermarkVariants = tv({
  slots: {
    root: 'relative',
    layer: 'pointer-events-none absolute inset-0 bg-repeat select-none',
  },
});

export type { WatermarkFont } from './buildWatermarkSvg';

export interface WatermarkProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Text watermark. Pass an array to render multiple lines. */
  content?: string | string[];
  /** Image URL used as watermark. Takes priority over `content`. */
  image?: string;
  /** Width of a single watermark cell (content area). */
  width?: number;
  /** Height of a single watermark cell (content area). */
  height?: number;
  /** Rotation in degrees. */
  rotate?: number;
  /** Gap between repetitions: `[x, y]` in pixels. */
  gap?: [number, number];
  /** Offset of the first watermark cell: `[x, y]` in pixels. */
  offset?: [number, number];
  /** Font styling for text watermarks. */
  font?: WatermarkFont;
  /** Stacking context above children. */
  zIndex?: number;
}

const DEFAULT_FONT: Required<WatermarkFont> = {
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
};

const DEFAULT_GAP: [number, number] = [100, 100];
const DEFAULT_ROTATE = -22;
const DEFAULT_TEXT_WIDTH = 120;
const DEFAULT_TEXT_HEIGHT = 64;
const DEFAULT_IMAGE_SIZE = 120;

const toLines = (content?: string | string[]): string[] => {
  if (Array.isArray(content)) return content;
  if (typeof content === 'string' && content.length > 0) return [content];
  return [];
};

const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(
  (
    {
      content,
      image,
      width,
      height,
      rotate = DEFAULT_ROTATE,
      gap = DEFAULT_GAP,
      offset,
      font,
      zIndex = 9,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const { root, layer } = watermarkVariants();
    const lines = React.useMemo(() => toLines(content), [content]);
    const mergedFont = React.useMemo<Required<WatermarkFont>>(
      () => ({ ...DEFAULT_FONT, ...font }),
      [font],
    );

    const cellWidth = width ?? (image ? DEFAULT_IMAGE_SIZE : DEFAULT_TEXT_WIDTH);
    const cellHeight = height ?? (image ? DEFAULT_IMAGE_SIZE : DEFAULT_TEXT_HEIGHT);
    const [gapX, gapY] = gap;

    const svg = React.useMemo(
      () =>
        buildWatermarkSvg({
          lines,
          image,
          width: cellWidth,
          height: cellHeight,
          gapX,
          gapY,
          rotate,
          font: mergedFont,
        }),
      [lines, image, cellWidth, cellHeight, gapX, gapY, rotate, mergedFont],
    );

    const hasWatermark = Boolean(image) || lines.length > 0;

    return (
      <div ref={ref} className={cn(root(), className)} style={style} {...rest}>
        {children}
        {hasWatermark && (
          <div
            aria-hidden="true"
            data-testid="watermark-layer"
            className={layer()}
            style={{
              zIndex,
              backgroundImage: `url("${svg.url}")`,
              backgroundSize: `${svg.tileWidth}px ${svg.tileHeight}px`,
              backgroundPosition: offset ? `${offset[0]}px ${offset[1]}px` : undefined,
            }}
          />
        )}
      </div>
    );
  },
);
Watermark.displayName = 'Watermark';

export { Watermark };
