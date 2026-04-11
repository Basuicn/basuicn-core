import { describe, it, expect, vi } from 'vitest';
import { MenuBar, MenuBarNav, type MenuBarMenuConfig } from './MenuBar';
import { fireEvent, render, screen } from '@testing-library/react';
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate, useMatch: () => null };
});
const mockMenus: MenuBarMenuConfig[] = [
    { id: '1', label: 'Home', type: 'link', href: '/' },
    {
        id: '2', label: 'Settings', items: [
            { id: '2-1', label: 'Profile', type: 'button', onClick: vi.fn() }
        ]
    }
];

describe('MenuBar', () => {
    it('renders', () => {
        render(<MenuBar />);
        expect(screen.getByRole('menubar')).toBeInTheDocument();
    });
    it('renders items', () => {
        render(
            <MenuBar>
                <MenuBarNav menus={mockMenus} />
            </MenuBar>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
    it('should navigate when a link item is clicked', () => {
        render(
            <MenuBar>
                <MenuBarNav menus={mockMenus} />
            </MenuBar>
        );
        fireEvent.click(screen.getByText('Home'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    it('should show submenu items when trigger is clicked', async () => {
        render(
            <MenuBar>
                <MenuBarNav menus={mockMenus} />
            </MenuBar>
        );
        // Base-UI thường dùng hover hoặc click tùy config, ở đây giả sử click trigger
        fireEvent.click(screen.getByText('Settings'));
        expect(await screen.findByText('Profile')).toBeInTheDocument();
    });

    it('performance: should render 500 items efficiently', () => {
        const largeMenus: MenuBarMenuConfig[] = Array.from({ length: 50 }, (_, i) => ({
            id: `menu-${i}`,
            label: `Menu ${i}`,
            items: Array.from({ length: 10 }, (_, j) => ({
                id: `item-${i}-${j}`,
                label: `Item ${i}-${j}`,
                type: 'button'
            }))
        }));

        const startTime = performance.now();
        render(
            <MenuBar>
                <MenuBarNav menus={largeMenus} />
            </MenuBar>
        );
        const endTime = performance.now();

        const duration = endTime - startTime;
        console.log(`[Performance] Render duration for 500 items: ${duration.toFixed(2)}ms`);
        
        // Kiểm tra cơ bản xem các menu đầu và cuối có hiện diện không
        expect(screen.getByText('Menu 0')).toBeInTheDocument();
        expect(screen.getByText('Menu 49')).toBeInTheDocument();
        
        // Ngưỡng hiệu năng (ví dụ: < 200ms cho môi trường test)
        expect(duration).toBeLessThan(200);
    });
});