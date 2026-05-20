import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Watermark } from './Watermark';
import { buildWatermarkSvg } from './buildWatermarkSvg';

const DEFAULT_FONT = {
  color: 'rgba(0,0,0,0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal' as const,
};

describe('Watermark', () => {
  it('renders children wrapped by a relative container', () => {
    render(
      <Watermark content="Confidential">
        <p>Document body</p>
      </Watermark>,
    );
    expect(screen.getByText('Document body')).toBeInTheDocument();
  });

  it('renders the watermark layer as aria-hidden when content is provided', () => {
    render(<Watermark content="Confidential">child</Watermark>);
    const layer = screen.getByTestId('watermark-layer');
    expect(layer).toHaveAttribute('aria-hidden', 'true');
    expect(layer.style.backgroundImage).toContain('data:image/svg+xml');
  });

  it('skips the watermark layer when neither content nor image is provided', () => {
    render(<Watermark>child</Watermark>);
    expect(screen.queryByTestId('watermark-layer')).toBeNull();
  });

  it('applies the provided zIndex to the watermark layer', () => {
    render(<Watermark content="x" zIndex={42}>child</Watermark>);
    expect(screen.getByTestId('watermark-layer').style.zIndex).toBe('42');
  });
});

describe('buildWatermarkSvg', () => {
  it('returns a tile size equal to content + gap', () => {
    const { tileWidth, tileHeight } = buildWatermarkSvg({
      lines: ['hello'],
      width: 120,
      height: 60,
      gapX: 40,
      gapY: 20,
      rotate: 0,
      font: DEFAULT_FONT,
    });
    expect(tileWidth).toBe(160);
    expect(tileHeight).toBe(80);
  });

  it('escapes XML special characters in text', () => {
    const { url } = buildWatermarkSvg({
      lines: ['<script>&"\''],
      width: 100,
      height: 40,
      gapX: 0,
      gapY: 0,
      rotate: 0,
      font: DEFAULT_FONT,
    });
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('&lt;script&gt;');
    expect(decoded).not.toContain('<script>');
  });

  it('prefers image over text when both are present', () => {
    const { url } = buildWatermarkSvg({
      lines: ['ignored'],
      image: 'https://example.com/logo.png',
      width: 100,
      height: 100,
      gapX: 0,
      gapY: 0,
      rotate: 0,
      font: DEFAULT_FONT,
    });
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('<image');
    expect(decoded).not.toContain('ignored');
  });
});
