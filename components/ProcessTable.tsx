
import React, { useState } from 'react';
import { 
  Search, 
  ListFilter, 
  ArrowDownWideNarrow, 
  Settings, 
  Pencil, 
  Trash2, 
  MoreVertical,
  ArrowDown
} from 'lucide-react';
import { MOCK_PROCESSES } from '../constants';
import { Process, ProcessStatus, FilterType } from '../types';

const StatusBadge: React.FC<{ status: ProcessStatus }> = ({ status }) => {
  const styles = {
    Active: 'bg-green-50 text-green-700',
    Pending: 'bg-orange-50 text-orange-700',
    Inactive: 'bg-gray-100 text-gray-600',
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const ProcessTable: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');

  const filteredData = MOCK_PROCESSES.filter(p => {
    const matchesFilter = filter === 'All' || p.type === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCount = (type: FilterType) => {
    if (type === 'All') return MOCK_PROCESSES.length;
    return MOCK_PROCESSES.filter(p => p.type === type).length;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {(['All', 'Hiring', 'Onboarding', 'Custom'] as FilterType[]).map((type) => {
            const isSelected = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex items-center gap-2 px-[10px] py-[4px] rounded-lg text-sm font-normal transition-all whitespace-nowrap border ${
                  isSelected 
                    ? 'bg-[#EAE8FB] text-gray-600 border-transparent' 
                    : 'bg-white text-gray-500 border-[#D1D5DC] hover:bg-gray-50'
                }`}
              >
                {type}
                <span className={`px-1 py-0.5 rounded text-[10px] font-normal transition-all ${
                  isSelected ? 'bg-white text-gray-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {getCount(type)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white border border-[#8C95A8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2 bg-transparent rounded-lg hover:bg-gray-50 transition-colors text-gray-600 flex items-center gap-2 text-sm font-normal">
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="p-2 bg-transparent rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
            <ArrowDownWideNarrow className="w-4 h-4" />
          </button>
          <button className="p-2 bg-transparent rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider group cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  Process Name
                  <ArrowDown className="w-3 h-3 text-primary" />
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stages</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Upda...</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Created by</th>
              <th className="px-6 py-3 w-32"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((process) => (
              <tr key={process.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-800 line-clamp-1">{process.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{process.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{process.stages} stages</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={process.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {process.lastUpdate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {process.createdBy}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-600 hover:text-primary transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-gray-800 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-2">No processes found</div>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessTable;
