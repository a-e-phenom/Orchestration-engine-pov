
import React from 'react';
import { 
  BarChart3, 
  Briefcase, 
  Workflow, 
  Layers, 
  BookOpen, 
  Settings2, 
  PieChart, 
  LayoutGrid,
  ArrowLeftFromLine
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive }) => (
  <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
    isActive 
      ? 'bg-[#EAE8FB] text-primary' 
      : 'text-gray-600 hover:bg-gray-200/50'
  }`}>
    <span className="flex items-center justify-center">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-gray-200 bg-[#F8F9FB] h-screen flex flex-col fixed left-0 top-0 pt-16">
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <SidebarItem icon={<BarChart3 size={18} />} label="Business Initiatives" />
        <SidebarItem icon={<Layers size={18} />} label="Orchestration Cases" />
        <div className="py-2">
            <div className="h-px bg-gray-200/60 mx-1" />
        </div>
        <SidebarItem icon={<Briefcase size={18} />} label="Business Processes" isActive />
        <SidebarItem icon={<PieChart size={18} />} label="Process Analytics" />
        <div className="py-2">
            <div className="h-px bg-gray-200/60 mx-1" />
        </div>
        <SidebarItem icon={<BookOpen size={18} />} label="Intent Library" />
        <SidebarItem icon={<Settings2 size={18} />} label="Rule Library" />
        <div className="py-2">
            <div className="h-px bg-gray-200/60 mx-1" />
        </div>
        <SidebarItem icon={<Workflow size={18} />} label="Automation Workflows" />
        <SidebarItem icon={<LayoutGrid size={18} />} label="Automation Analytics" />
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <button className="flex items-center justify-end w-full p-2 text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeftFromLine size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
