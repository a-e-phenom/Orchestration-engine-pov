
import React from 'react';
import { Search, Plus, Bell, HelpCircle, Grid, User, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 fixed top-0 w-full z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-transparent">
            <img 
              src="https://cdn.brandfetch.io/idKcRc59WQ/w/1000/h/1318/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B" 
              alt="Phenom Logo" 
              className="h-6 w-auto block"
            />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 px-2 rounded transition-colors ml-2">
            <span className="font-medium text-gray-800 text-sm">Orchestration Engine</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="w-[240px] relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-16 h-[36px] bg-white border border-[#8C95A8] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-medium text-gray-500 rounded-[6px] px-1.5 py-0.5 bg-[#E8EAEE]">
            <span className="text-xs">⌘</span>S
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <button className="hover:text-primary transition-colors">
            <Plus size={20} />
          </button>
          <button className="hover:text-primary transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="relative hover:text-primary transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:text-primary transition-colors">
            <Grid size={20} />
          </button>
          <button className="hover:text-primary transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
