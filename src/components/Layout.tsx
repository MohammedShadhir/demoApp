// components/Layout.tsx
import type { ReactNode } from "react"
import { Input } from "./ui/input"
import { Bell, HelpCircle, Search } from "lucide-react"

type LayoutProps = { children: ReactNode }

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">DemoApp</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Input placeholder="Search..." className="pl-9 w-48 md:w-64" />
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                    <HelpCircle className="h-5 w-5 text-gray-600 cursor-pointer" />
                    <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
                </div>
            </header>

            {/* Grid */}
            <main className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</main>
        </div>
    )
}

export default Layout
