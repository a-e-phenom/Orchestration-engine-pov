
import React from 'react';
import { X, Pencil, Plus } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div 
        className="bg-white w-full max-w-[800px] rounded-[16px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-[20px] font-semibold text-[#333C4E]">Rules</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[75vh] no-scrollbar">
          {/* Rule Card */}
          <div className="border border-[#E2E8F0] rounded-[16px] p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-[#333C4E] mb-1">Rule 1 - Reapplication Restriction</h3>
                <p className="text-[13px] text-slate-400">Entry &rarr; New Applicant</p>
              </div>
              <button className="flex items-center gap-2 text-primary font-medium text-[14px] hover:opacity-80 transition-opacity">
                <Pencil size={16} />
                Edit
              </button>
            </div>

            {/* Purpose & Scope */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Purpose</span>
                <span className="px-2 py-0.5 bg-[#EAE8FB] text-primary text-[11px] font-normal rounded-[4px] uppercase">Gate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Scope</span>
                <span className="px-2 py-0.5 bg-[#D8F4F2] text-[#1D3734] text-[11px] font-normal rounded-[4px] uppercase">Activity</span>
              </div>
            </div>

            {/* Condition Section */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Condition</h4>
              <div className="bg-[#F8F9FB] rounded-[12px] p-4 space-y-3">
                {/* Row 1 */}
                <div className="flex items-center gap-3">
                  <span className="text-primary font-medium text-[14px] w-8">If</span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    Candidate
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    Last application date
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    &gt;=
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    Today - 90 days
                  </div>
                </div>
                {/* Row 2 */}
                <div className="flex items-center gap-3">
                  <span className="text-primary font-medium text-[14px] w-8">and</span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    Candidate
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    is reapplying
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    ==
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    True
                  </div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Action</h4>
              <div className="bg-[#F8F9FB] rounded-[12px] p-4">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-medium text-[14px] flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 2V10C2 11.1046 2.89543 12 4 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M11 9L14 12L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Then
                  </span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] text-[14px] text-slate-700">
                    Block the action
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 text-primary font-medium text-[15px] px-2 mb-2 hover:opacity-80 transition-opacity">
            <Plus size={20} />
            Add rule
          </button>
        </div>

        {/* Footer with increased padding */}
        <div className="px-8 py-7 flex items-center justify-end border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="px-8 h-[44px] text-sm font-semibold text-slate-700 bg-white border border-[#8C95A8] rounded-[10px] hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
