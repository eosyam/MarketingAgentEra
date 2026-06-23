import React from "react";
import { Menu, Search, Globe, Bell, FileText, LogOut } from "lucide-react";

interface SuiteHeaderProps {
  onSelectComponent?: (component: any) => void;
}

export default function SuiteHeader({ onSelectComponent }: SuiteHeaderProps) {
  return (
    <header className="h-[64px] bg-white border border-slate-200/60 shadow-xxs rounded-2xl flex items-center justify-between px-5 font-sans shrink-0 select-none w-full">
      {/* Left section: Hamburger and Search bar */}
      <div className="flex items-center gap-4 flex-1">
        <button className="text-slate-500 hover:text-slate-800 transition-all p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
          <Menu size={18} />
        </button>

        {/* Global Search Pill Bar */}
        <div className="relative w-full max-w-sm hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            readOnly
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-1.5 pl-9 pr-4 text-xs text-slate-600 focus:outline-none focus:border-[#F7941D] cursor-not-allowed"
          />
        </div>
      </div>

      {/* Right Section: Language, Notification, Checkout, Admin User Avatar, Logout */}
      <div className="flex items-center gap-4 text-slate-600 pr-1">
        {/*🌐 EN Language Selector */}
        <button className="flex items-center gap-1 border border-slate-200 rounded-full px-3 py-1 text-xs text-[#475467] cursor-pointer hover:bg-slate-50 transition-all font-semibold uppercase">
          <Globe size={13} className="text-slate-400" />
          <span>EN</span>
        </button>

        {/* Bell with orange "3" count badge */}
        <button className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
          <Bell size={17} />
          <span className="absolute top-1 right-1 bg-[#F7941D] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
            3
          </span>
        </button>

        {/* Checklist documents list icon */}
        <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all cursor-pointer" title="Workspace Tasks">
          <FileText size={17} />
        </button>

        <div className="w-[1px] h-5 bg-slate-200" />

        {/* Admin profile user block */}
        <button className="flex items-center gap-2.5 text-left cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-all">
          {/* Bronze gold AU avatar */}
          <div className="w-8 h-8 rounded-full bg-[#8E7044] text-[#FCF8F2] font-black text-xs flex items-center justify-center shadow-inner select-none uppercase tracking-wide">
            AU
          </div>
          <div className="hidden md:block leading-none">
            <div className="font-bold text-[#101828] text-[12.5px]">Admin User</div>
            <div className="text-[10px] text-slate-400 mt-1 font-medium">Administrator</div>
          </div>
        </button>

        <div className="w-[1px] h-5 bg-slate-200" />

        {/* LogOut action icon */}
        <button title="Sign Out" className="p-1.5 text-slate-400 hover:text-[#C53030] hover:bg-red-50 rounded-lg transition-all cursor-pointer">
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
