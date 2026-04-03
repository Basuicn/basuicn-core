import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody } from './Drawer';

describe('Drawer', () => {
  it('renders trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger render={<button>Open Drawer</button>} />
      </Drawer>
    );
    expect(screen.getByText('Open Drawer')).toBeInTheDocument();
  });

  it('shows title when open', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <DrawerBody><p>Content</p></DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('shows description when open', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust preferences</DrawerDescription>
          </DrawerHeader>
          <DrawerBody><p>Content</p></DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Adjust preferences')).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Drawer open={true}>
        <DrawerContent>
          <DrawerBody><p>Drawer body here</p></DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Drawer body here')).toBeInTheDocument();
  });
});
