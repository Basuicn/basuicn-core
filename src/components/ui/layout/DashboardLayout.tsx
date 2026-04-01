import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, Home, CreditCard, BookOpen, Clock, Wallet, ShieldCheck, Users, Settings, CircleDollarSign, Percent, User, LogOut } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion/Accordion';
import { Button } from '../button/Button';
import { ThemeToggle } from '../ThemeToggle';

// ----------------------------------------------------------------------------
// Sidebar Component
// ----------------------------------------------------------------------------

export const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-background border-r border-border border-dashed flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 flex items-center justify-center border-b border-border/50 border-dashed">
                {/* Flexpay Logo Mock */}
                <span className="text-2xl font-bold italic tracking-tighter">
                    <img src="/logo.png" alt="Logo" />
                </span>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Overview
                </div>
                <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    <Home className="w-4 h-4" /> Dashboard
                </NavLink>

                <div className="px-3 mt-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Components
                </div>
                <Accordion multiple={true} defaultValue={["general-components", "forms-components"]}>
                    <AccordionItem value="general-components" className="border-none">
                        <AccordionTrigger className="px-3 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 data-panel-open:text-primary data-panel-open:font-semibold py-2.5 border-none">
                            <div className="flex items-center gap-3"><BookOpen className="w-4 h-4" /> General</div>
                        </AccordionTrigger>
                        <AccordionContent className="ml-4 border-l border-border/50 pl-2 space-y-0.5">
                            <NavLink to="/components/button" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Button</NavLink>
                            <NavLink to="/components/badge" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Badge</NavLink>
                            <NavLink to="/components/avatar" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Avatar</NavLink>
                            <NavLink to="/components/skeleton" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Skeleton</NavLink>
                            <NavLink to="/components/spinner" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Spinner</NavLink>
                            <NavLink to="/components/progress" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Progress</NavLink>
                            <NavLink to="/components/alert" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Alert</NavLink>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="forms-components" className="border-none">
                        <AccordionTrigger className="px-3 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 data-panel-open:text-primary data-panel-open:font-semibold py-2.5 border-none">
                            <div className="flex items-center gap-3"><Users className="w-4 h-4" /> Forms</div>
                        </AccordionTrigger>
                        <AccordionContent className="ml-4 border-l border-border/50 pl-2 space-y-0.5">
                            <NavLink to="/components/input" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Input</NavLink>
                            <NavLink to="/components/select" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Select</NavLink>
                            <NavLink to="/components/datepicker" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>DatePicker</NavLink>
                            <NavLink to="/components/checkbox" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Checkbox</NavLink>
                            <NavLink to="/components/radio" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Radio Group</NavLink>
                            <NavLink to="/components/combobox" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>ComboBox</NavLink>
                            <NavLink to="/components/switch" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Switch</NavLink>
                            <NavLink to="/components/slider" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Slider</NavLink>
                            <div className="h-px bg-border/50 my-2 mx-2"></div>
                            <NavLink to="/components/advanced-form" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Advanced Form <span className="text-[10px] ml-1 bg-primary text-white rounded px-1.5">New</span></NavLink>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="complex-components" className="border-none">
                        <AccordionTrigger className="px-3 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 data-panel-open:text-primary data-panel-open:font-semibold py-2.5 border-none">
                            <div className="flex items-center gap-3"><CreditCard className="w-4 h-4" /> Complex</div>
                        </AccordionTrigger>
                        <AccordionContent className="ml-4 border-l border-border/50 pl-2 space-y-0.5">
                            <NavLink to="/components/table" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Data Table</NavLink>
                            <NavLink to="/components/tabs" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Tabs</NavLink>
                            <NavLink to="/components/accordion" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Accordion</NavLink>
                            <NavLink to="/components/collapsible" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Collapsible</NavLink>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="overlay-components" className="border-none">
                        <AccordionTrigger className="px-3 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 data-panel-open:text-primary data-panel-open:font-semibold py-2.5 border-none">
                            <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> Overlays</div>
                        </AccordionTrigger>
                        <AccordionContent className="ml-4 border-l border-border/50 pl-2 space-y-0.5">
                            <NavLink to="/components/dialog" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Dialog (Modal)</NavLink>
                            <NavLink to="/components/alert-dialog" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Alert Dialog</NavLink>
                            <NavLink to="/components/popover" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Popover</NavLink>
                            <NavLink to="/components/tooltip" className={({ isActive }) => `block px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>Tooltip</NavLink>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </nav>
        </aside>
    )
}

// ----------------------------------------------------------------------------
// Header Component
// ----------------------------------------------------------------------------

export const Header = () => {
    return (
        <header className="h-[72px]  bg-background border-b border-border/50 flex flex-col justify-center px-8 fixed top-0 w-[calc(100%-16rem)] right-0 z-40">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-primary">Example</h1>
                    <div className="flex items-center text-sm text-slate-400 gap-1.5 mt-0.5">
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-primary font-medium">Example</span>
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <span className="text-sm font-medium text-foreground">admin2</span>
                    <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-primary font-bold overflow-hidden shadow-sm border border-border">
                        <img src="https://i.pravatar.cc/100" alt="avatar" />
                    </div>
                </div>
            </div>
        </header>
    )
}

// ----------------------------------------------------------------------------
// Dashboard Layout
// ----------------------------------------------------------------------------

export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-muted/30">
            <Sidebar />
            <div className="flex flex-col flex-1 pl-64 w-full">
                <Header />
                <main className="flex-1 mt-[72px] overflow-y-auto bg-muted/10">
                    <div className="p-6">
                        {children ? children : <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    )
}
