import { Button, Code, Separator, SidebarTrigger } from '@/components/ui'
import { Autocomplete } from '@/components/ui/autocomplete/Autocomplete'
import { Bell, Home, Search, Settings } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="h-[60px] sticky top-0  flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 py-2 shrink-0">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />

            {/* Breadcrumb */}
            <nav className="flex items-center w-full gap-1.5 text-sm min-w-0">
                <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 shrink-0"
                >
                    <Home className="h-3.5 w-3.5" /><span className="hidden sm:inline">Home</span>
                </Link>
                

                {/* Search Autocomplete */}
                <Autocomplete
                    options={[]}
                    placeholder="Tìm kiếm component..."
                    leftIcon={<Search className="h-4 w-4" />}
                    clearOnSelect
                    // onValueChange={(href) => router.push(href)}
                    emptyText="Không tìm thấy component"
                    className="ml-auto hidden md:flex md:w-[200px] lg:w-[240px]"
                />

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 ml-auto md:ml-3 shrink-0">
                    <Link to="https://github.com" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
                        <Button variant="outline" size="icon-sm" className="rounded-lg ">
                            <Code className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="icon-sm" className="rounded-lg ">
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon-sm" className="rounded-lg ">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </nav>
        </header>
  )
}

export default Header