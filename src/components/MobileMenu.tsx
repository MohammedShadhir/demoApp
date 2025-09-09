import { X, Search, HelpCircle, Bell, Sun, Moon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean; // New prop for dark mode state
    onToggleDarkMode: () => void; // New prop for the toggle function
}

const MobileMenu = ({ isOpen, onClose, isDarkMode, onToggleDarkMode }: MobileMenuProps) => {
    return (
        <div
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm
            bg-white dark:bg-gray-900 shadow-lg p-6
            transform transition-transform duration-300 ease-in-out md:hidden
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Menu</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 dark:text-gray-400">
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Input
                        placeholder="Search..."
                        className="w-full pl-9 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help Center</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300" onClick={onToggleDarkMode}>
                    {isDarkMode ? (
                        <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-yellow-400" />
                    ) : (
                        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-gray-800" />
                    )}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;