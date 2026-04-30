import * as React from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '../button/Button';

// ─── Types ────────────────────────────────────────────────────────────────────
export type QRCodeLevel = 'L' | 'M' | 'Q' | 'H';
export type QRCodeRenderer = 'svg' | 'canvas';

export interface QRCodeImageSettings {
  src: string;
  width: number;
  height: number;
  excavate?: boolean;
  x?: number;
  y?: number;
  opacity?: number;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
}

const PIXEL_SIZE = { sm: 96, md: 128, lg: 192, xl: 256 } as const;

// ─── Props ────────────────────────────────────────────────────────────────────
export interface QRCodeProps {
  /** Value to encode — URL, text, etc. */
  value: string;
  /** Preset size: sm=96 md=128 lg=192 xl=256 */
  size?: keyof typeof PIXEL_SIZE;
  /** Override pixel dimension, takes precedence over size */
  pixelSize?: number;
  /** Error correction level — higher = more redundancy but denser pattern */
  level?: QRCodeLevel;
  /** Background color (hex/rgb string) */
  bgColor?: string;
  /** Foreground / module color (hex/rgb string) */
  fgColor?: string;
  /** Quiet zone modules around the QR code */
  marginSize?: number;
  /** Embed an image or logo in the center (use level H for best results) */
  imageSettings?: QRCodeImageSettings;
  /** SVG (crisp at any scale) or Canvas (downloadable as PNG) */
  renderer?: QRCodeRenderer;
  /** Accessible title for screen readers */
  title?: string;
  /** Label displayed above the QR code */
  label?: string;
  /** Caption displayed below the QR code */
  description?: string;
  /** Show a download button */
  downloadable?: boolean;
  /** Filename without extension used when downloading */
  downloadFilename?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const QRCode = React.forwardRef<HTMLDivElement, QRCodeProps>(({
  value,
  size = 'md',
  pixelSize,
  level = 'L',
  bgColor = '#ffffff',
  fgColor = '#000000',
  marginSize = 2,
  imageSettings,
  renderer = 'svg',
  title,
  label,
  description,
  downloadable = false,
  downloadFilename = 'qrcode',
  className,
  style,
}, ref) => {
  const qrWrapperRef = React.useRef<HTMLDivElement>(null);
  const resolvedSize = pixelSize ?? PIXEL_SIZE[size];

  const handleDownload = React.useCallback(() => {
    const el = qrWrapperRef.current;
    if (!el) return;

    if (renderer === 'canvas') {
      const canvas = el.querySelector('canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `${downloadFilename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      return;
    }

    const svg = el.querySelector('svg');
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${downloadFilename}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [renderer, downloadFilename]);

  const qrProps = {
    value,
    size: resolvedSize,
    level,
    bgColor,
    fgColor,
    marginSize,
    imageSettings: imageSettings
      ? { excavate: false, ...imageSettings }
      : undefined,
    title: title ?? `QR Code: ${value}`,
  };

  return (
    <div ref={ref} className={cn('inline-flex flex-col items-center gap-2', className)} style={style}>
      {label && (
        <p className="text-sm font-medium text-foreground">{label}</p>
      )}
      <div ref={qrWrapperRef} className="rounded-xl overflow-hidden border border-border shadow-sm">
        {renderer === 'svg' ? <QRCodeSVG {...qrProps} /> : <QRCodeCanvas {...qrProps} />}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground text-center max-w-[200px]">{description}</p>
      )}
      {downloadable && (
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Download className="w-3.5 h-3.5" />}
          onClick={handleDownload}
        >
          Download
        </Button>
      )}
    </div>
  );
});

QRCode.displayName = 'QRCode';
