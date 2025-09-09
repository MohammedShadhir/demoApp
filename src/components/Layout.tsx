import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Bell, HelpCircle, Search, Menu, Sun, Moon } from "lucide-react";
import MobileMenu from "./MobileMenu";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-500">
            {/* Header */}
            <header className="flex items-center justify-between py-4 mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    DEMOAPP
                </h1>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative">
                            <Input
                                placeholder="Search..."
                                className="pl-9 w-48 lg:w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500" />
                        <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500" />
                        <div className="cursor-pointer" onClick={toggleDarkMode}>
                            {isDarkMode ? (
                                <Sun className="h-5 w-5 text-gray-400 hover:text-yellow-400" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                            )}
                        </div>
                    </div>

                    <Menu
                        className="h-6 w-6 text-gray-600 dark:text-gray-400 cursor-pointer md:hidden"
                        onClick={toggleMenu}
                    />
                </div>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</main>

            {/* Pass the dark mode state and toggle function as props */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={toggleMenu}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
        </div>
    );
};

export default Layout;