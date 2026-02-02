
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  List, 
  Workflow, 
  Search, 
  Plus, 
  GripVertical, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  ArrowUpRight, 
  ArrowDownRight, 
  Lock, 
  MoreVertical,
  Sparkle,
  LogOut,
  GitGraph,
  Zap,
  Shield,
  Circle,
  XCircle,
  CheckCircle2,
  Info,
  Network,
  Layers,
  HelpCircle,
  Pencil,
  X,
  ExternalLink,
  Check
} from 'lucide-react';
import RulesModal from './RulesModal';

interface ProcessEditorProps {
  onBack: () => void;
}

interface Substage {
  id: string;
  name: string;
  indicators: { type: 'up' | 'down'; val: number }[];
  description?: string;
  associatedWorkflows?: string[];
  customStates?: string[];
}

interface StageData {
  id: string;
  name: string;
  count?: number;
  indicators: { type: 'up' | 'down'; val: number }[];
  substages?: Substage[];
  statusColor?: string;
  isFinal?: boolean;
  isEditing?: boolean;
  description?: string;
  allowIncomingTransitions?: boolean;
}

const WORKFLOW_OPTIONS = [
  { id: 'interview', name: 'Interview workflow' },
  { id: 'hr', name: 'HR Approval Flow' },
  { id: 'test', name: 'Skill Assessment' }
];

const StageSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 p-4 bg-white/50 border border-[#E2E8F0] rounded-[12px]">
    <div className="flex items-center gap-3 flex-1">
      <div className="w-4 h-4 bg-slate-100 rounded" />
      <div className="w-8 h-4 bg-slate-100 rounded" />
      <div className="w-32 h-6 bg-slate-50 rounded" />
    </div>
    <div className="flex items-center gap-6">
      <div className="w-24 h-4 bg-slate-50 rounded" />
      <div className="w-4 h-4 bg-slate-50 rounded" />
    </div>
  </div>
);

const SubstageRow: React.FC<Substage> = ({ name, indicators }) => (
  <div className="flex items-center gap-4 p-3 bg-[#F8F9FB] border border-[#F1F5F9] rounded-[10px] mx-1 mb-1 first:mt-3 last:mb-3 hover:border-primary/20 transition-all">
    <div className="flex items-center gap-3 flex-1">
      <GripVertical size={16} className="text-[#CBD5E1] cursor-grab" />
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-slate-700 leading-none">{name}</span>
      </div>
      <div className="flex items-center gap-2 ml-2">
        {indicators.map((ind, i) => (
          <div key={i} className="flex items-center gap-1 px-1.5 py-0.5 bg-white text-primary rounded-[4px] text-[11px] font-medium border border-[#E2E8F0]/50">
            {ind.type === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {ind.val}
          </div>
        ))}
      </div>
    </div>
    <MoreVertical size={16} className="text-[#94A3B8] cursor-pointer hover:text-slate-600" />
  </div>
);

const StageRow: React.FC<StageData & { 
  onSave?: (name: string) => void;
  className?: string;
}> = ({ name, count, indicators, isFinal, statusColor, className = "", substages = [], isEditing, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editName, setEditName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleExpand = (e: React.MouseEvent) => {
    if (substages.length > 0) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave?.(editName);
    }
  };

  return (
    <div className={`flex flex-col bg-white border border-[#E2E8F0] rounded-[12px] group transition-all ${isExpanded ? 'border-primary/20' : 'hover:border-primary/30'} ${className}`}>
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center gap-3 flex-1">
          {!isFinal && <GripVertical size={18} className="text-[#94A3B8] cursor-grab" />}
          
          <button 
            onClick={toggleExpand}
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-0'} ${substages.length === 0 ? 'opacity-50 cursor-default' : 'hover:bg-slate-50 p-0.5 rounded'}`}
          >
            {isExpanded ? <ChevronDown size={18} className="text-[#64748B]" /> : <ChevronRight size={18} className="text-[#64748B]" />}
          </button>
          
          {isFinal && statusColor && (
            <div className={`w-1 h-6 rounded-full ${statusColor}`} />
          )}

          <div className="flex items-center gap-2 flex-1">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={() => onSave?.(editName)}
                onKeyDown={handleKeyDown}
                className="text-[14px] font-semibold text-slate-800 leading-none bg-transparent border-b-2 border-primary outline-none py-1 w-full max-w-[240px]"
                placeholder="Enter stage name..."
              />
            ) : (
              <>
                <span className="text-[14px] font-semibold text-slate-800 leading-none">{name}</span>
                {count !== undefined && (
                  <span className="text-[12px] text-slate-400 font-medium leading-none">({count})</span>
                )}
              </>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center gap-2 ml-2">
              {indicators.map((ind, i) => (
                <div key={i} className="flex items-center gap-1 px-2 py-0.5 bg-[#F1F2FF] text-primary rounded-[6px] text-[12px] font-medium">
                  {ind.type === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {ind.val}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-primary text-[14px] font-medium hover:opacity-80 transition-opacity">
            <Plus size={16} />
            {isFinal ? 'Add Status' : 'Add Substage'}
          </button>
          <button className="p-1 text-[#94A3B8] hover:text-slate-600 transition-colors">
            <Lock size={16} />
          </button>
        </div>
      </div>

      {isExpanded && substages.length > 0 && (
        <div className="px-11 pb-3 bg-[#F8FAFC]/30 rounded-b-[12px] animate-in slide-in-from-top-1 duration-200">
          <div className="space-y-1">
            {substages.map((sub, idx) => (
              <SubstageRow key={idx} {...sub} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MapSubstageCard: React.FC<Substage & { isSelected?: boolean; onClick?: () => void }> = ({ name, description = "No associated workflows", isSelected, onClick }) => (
  <div 
    className={`flex flex-col items-center relative z-10 cursor-pointer transition-all active:scale-[0.98] flex-shrink-0`}
    onClick={onClick}
  >
    <div className={`absolute top-[-11px] left-3 z-30 bg-[#E8EAEE] text-slate-700 border-white/50 text-[11px] font-normal px-2 py-0 rounded-[6px] border shadow-none`}>
      Substage
    </div>
    <div className={`bg-white border-2 rounded-[12px] w-[260px] px-4 py-4 transition-all flex flex-col gap-2 relative ${
      isSelected ? 'border-primary shadow-lg shadow-primary/5' : 'border-[#E2E8F0] hover:border-primary/40'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center p-2 rounded-[8px] transition-colors ${isSelected ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
          <Network size={18} />
        </div>
        <span className="text-[15px] font-medium text-slate-800">{name}</span>
      </div>
      <p className="text-[12px] text-slate-400 font-normal">{description}</p>
    </div>
  </div>
);

const MapStageCard: React.FC<StageData & { isSelected?: boolean; selectedSubstageId?: string | null; onClick?: () => void; onSubstageClick?: (subId: string, stageId: string) => void; onShieldClick?: () => void; onAddSubstage?: (stageId: string) => void }> = ({ 
  name, 
  count, 
  id,
  isSelected, 
  selectedSubstageId,
  onClick, 
  onSubstageClick,
  onShieldClick,
  onAddSubstage,
  allowIncomingTransitions, 
  substages = [] 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddSubstage?.(id);
  };

  return (
    <div className="flex flex-col items-center relative w-full">
      <div 
        className={`flex flex-col items-center relative z-10 cursor-pointer group transition-all`}
        onClick={onClick}
      >
        {allowIncomingTransitions && (
          <div className="absolute left-full top-1/2 -translate-y-[12px] flex items-end z-0 pointer-events-none">
            <div className="relative h-12 flex items-center">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-[#AEB5C2]">
                <path d="M6 7L1 12L6 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 12H22C32 12 32 12 32 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div className="absolute left-[24px] -top-[6px] px-2 py-0.5 bg-white border border-[#E2E8F0] rounded-[8px] text-[11px] font-normal text-slate-600 shadow-sm whitespace-nowrap z-10">
                Any
              </div>
            </div>
          </div>
        )}

        <div className={`absolute top-[-11px] left-3 z-30 bg-[#E8EAEE] text-slate-700 border-white/50 text-[11px] font-normal px-2 py-0 rounded-[6px] border shadow-none transition-colors`}>
          Stage
        </div>
        <div className={`bg-white border-2 rounded-[12px] w-[240px] px-3 py-5 transition-all flex items-center justify-between relative ${
          isSelected && !selectedSubstageId
            ? 'border-primary shadow-lg shadow-primary/5' 
            : 'border-[#E2E8F0] hover:border-primary/40'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-2 py-2 rounded-[8px] transition-colors ${(isSelected && !selectedSubstageId) ? 'bg-primary/10 text-primary' : 'bg-primary/5 text-primary'}`}>
              <Layers size={16} className={(isSelected && !selectedSubstageId) ? 'text-primary' : 'text-primary/80'} />
              <span className="text-[14px] font-medium leading-none">{count ?? 0}</span>
            </div>
            <span className="text-[15px] font-medium text-slate-800">{name}</span>
          </div>
          <button 
            onClick={toggleExpand}
            className="p-1 hover:bg-slate-50 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUp size={20} className="text-slate-400" />
            ) : (
              <ChevronDown size={20} className="text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="relative flex flex-col items-center w-full animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-[1.5px] h-4 bg-slate-200" />
          
          <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-[24px] p-10 flex flex-col items-center justify-center min-w-[340px] relative max-w-full overflow-x-auto no-scrollbar">
            <button 
              onClick={handlePlusClick}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-[8px] border border-dashed border-slate-300 bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors cursor-pointer group active:scale-95 z-20"
            >
              <Plus size={16} />
              <div className="absolute left-8 w-12 h-px bg-slate-200 -z-10 group-hover:bg-primary/30" />
            </button>
            <button 
              onClick={handlePlusClick}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-[8px] border border-dashed border-slate-300 bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors cursor-pointer group active:scale-95 z-20"
            >
              <Plus size={16} />
              <div className="absolute right-8 w-12 h-px bg-slate-200 -z-10 group-hover:bg-primary/30" />
            </button>

            {substages.length > 0 ? (
              <div className="flex flex-row items-center justify-center flex-nowrap">
                {substages.map((sub, idx) => (
                  <React.Fragment key={sub.id}>
                    <MapSubstageCard 
                      {...sub} 
                      isSelected={selectedSubstageId === sub.id}
                      onClick={() => onSubstageClick?.(sub.id, id)}
                    />
                    {idx < substages.length - 1 && (
                      <div className="flex items-center -mx-[2px] z-0 group flex-shrink-0">
                        <div className="w-6 h-[1.5px] bg-slate-200 group-hover:bg-primary/30 transition-colors" />
                        <div 
                          onClick={onShieldClick}
                          className="bg-white border border-slate-200 p-1 rounded-lg flex items-center justify-center transition-colors cursor-pointer hover:border-primary group/shield"
                        >
                          <Shield size={14} className="text-slate-400 transition-colors group-hover/shield:text-primary" />
                        </div>
                        <div className="w-2 h-[1.5px] bg-slate-200 group-hover:bg-primary/30 transition-colors" />
                        <div className="w-[12px] h-[12px] bg-[#AEB5C2] rounded-full" />
                        <div className="w-6 h-[1.5px] bg-slate-200 group-hover:bg-primary/30 transition-colors" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <button 
                onClick={handlePlusClick}
                className="flex flex-col items-center justify-center gap-3 px-10 py-6 border-2 border-dashed border-slate-300 rounded-[16px] text-slate-400 hover:text-primary hover:border-primary transition-all group bg-white/50 active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Plus size={20} />
                </div>
                <span className="text-[14px] font-medium">+ Add substage</span>
              </button>
            )}
          </div>

          <div className="w-[1.5px] h-4 bg-slate-200" />
        </div>
      )}
    </div>
  );
};

const Connector: React.FC<{ onShieldClick?: () => void }> = ({ onShieldClick }) => (
  <div className="flex flex-col items-center relative -my-px w-full">
    <div className="w-[1.5px] h-4 bg-slate-200" />
    <div 
      onClick={onShieldClick}
      className="bg-white border border-slate-200 p-1 rounded-lg z-20 flex items-center justify-center transition-colors cursor-pointer hover:border-primary group"
    >
      <Shield size={14} className="text-slate-600 transition-colors group-hover:text-primary" />
    </div>
    <div className="w-[1.5px] h-4 bg-slate-200" />
    <div className="w-[12px] h-[12px] bg-[#AEB5C2] rounded-full z-20" />
    <div className="w-[1.5px] h-4 bg-slate-200" />
  </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (val: boolean) => void }> = ({ checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${checked ? 'bg-primary' : 'bg-slate-200'}`}
  >
    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${checked ? 'translate-x-[21px]' : 'translate-x-0'}`} />
  </button>
);

const ProcessEditor: React.FC<ProcessEditorProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isGenerating, setIsGenerating] = useState(true);
  const [visibleStagesCount, setVisibleStagesCount] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isWorkflowDropdownOpen, setIsWorkflowDropdownOpen] = useState(false);
  
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [selectedSubstageId, setSelectedSubstageId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const workflowDropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [processStages, setProcessStages] = useState<StageData[]>([
    { 
      id: 'p1',
      name: "New Applicant", 
      count: 1, 
      indicators: [{ type: 'up' as const, val: 3 }],
      substages: [{ id: 's1', name: "Initial Application", indicators: [{ type: 'up' as const, val: 3 }] }],
      allowIncomingTransitions: false
    },
    { 
      id: 'p2',
      name: "Screening", 
      count: 2, 
      indicators: [{ type: 'down' as const, val: 1 }, { type: 'up' as const, val: 3 }],
      substages: [
        { id: 's2', name: "Assessment", indicators: [{ type: 'down' as const, val: 1 }] },
        { id: 's3', name: "Recruiter Review", indicators: [{ type: 'up' as const, val: 3 }] }
      ],
      allowIncomingTransitions: false
    },
    { 
      id: 'p3',
      name: "Interview", 
      count: 2, 
      indicators: [{ type: 'down' as const, val: 1 }, { type: 'up' as const, val: 3 }],
      substages: [
        { id: 's4', name: "Primary Interview", indicators: [{ type: 'down' as const, val: 1 }, { type: 'up' as const, val: 3 }], description: "Workflow: Interview Workflow" },
        { id: 's5', name: "Secondary Interview", indicators: [{ type: 'down' as const, val: 1 }, { type: 'up' as const, val: 3 }], description: "Workflow: Interview Workflow" }
      ],
      allowIncomingTransitions: false
    },
    { 
      id: 'p4',
      name: "Offer", 
      count: 1, 
      indicators: [{ type: 'down' as const, val: 1 }, { type: 'up' as const, val: 3 }],
      substages: [{ id: 's6', name: "Offer", indicators: [{ type: 'down' as const, val: 1 }, { type: 'up' as const, val: 3 }] }],
      allowIncomingTransitions: false
    },
    { 
      id: 'p5',
      name: "Waitlist", 
      count: 0, 
      indicators: [],
      substages: [],
      description: "Stage description",
      allowIncomingTransitions: false
    },
  ]);

  const [finalStages, setFinalStages] = useState<StageData[]>([
    { 
      id: 'f1',
      name: "Hired", 
      statusColor: "bg-emerald-500", 
      indicators: [{ type: 'down' as const, val: 1 }],
      substages: [
        { id: 's7', name: "highly qualified", indicators: [] },
        { id: 's8', name: "qualified", indicators: [] }
      ],
      isFinal: true,
      allowIncomingTransitions: false
    },
    { 
      id: 'f2',
      name: "Rejected", 
      statusColor: "bg-rose-500", 
      indicators: [{ type: 'down' as const, val: 4 }],
      substages: [
        { id: 's9', name: "low fit score", indicators: [] },
        { id: 's10', name: "assessment not passed", indicators: [] }
      ],
      isFinal: true,
      allowIncomingTransitions: false
    },
    { 
      id: 'f3',
      name: "Withdrawn", 
      statusColor: "bg-rose-500", 
      indicators: [{ type: 'down' as const, val: 4 }],
      substages: [
        { id: 's11', name: "Response timeout", indicators: [] },
        { id: 's12', name: "Offer declined", indicators: [] }
      ],
      isFinal: true,
      allowIncomingTransitions: false
    },
  ]);

  const allStages = [...processStages, ...finalStages];
  const totalStages = allStages.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAddDropdown(false);
      }
      if (workflowDropdownRef.current && !workflowDropdownRef.current.contains(event.target as Node)) {
        setIsWorkflowDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (visibleStagesCount < totalStages) {
      const timer = setTimeout(() => {
        setVisibleStagesCount(prev => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => setIsGenerating(false), 1200);
      return () => clearTimeout(finishTimer);
    }
  }, [visibleStagesCount, totalStages]);

  useEffect(() => {
    if (isGenerating && containerRef.current && viewMode === 'list') {
      const currentItem = itemsRef.current[visibleStagesCount];
      if (currentItem) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const itemRect = currentItem.getBoundingClientRect();
        setIndicatorTop(itemRect.top - containerRect.top);
      }
    }
  }, [visibleStagesCount, isGenerating, viewMode]);

  const addNewProcessStage = () => {
    const newId = `p-new-${Date.now()}`;
    const newStage: StageData = {
      id: newId,
      name: "",
      count: 0,
      indicators: [],
      substages: [],
      isEditing: true,
      allowIncomingTransitions: false
    };
    setProcessStages(prev => [...prev, newStage]);
    setShowAddDropdown(false);
    if (!isGenerating) {
      setVisibleStagesCount(prev => prev + 1);
    }
  };

  const addNewFinalStage = () => {
    const newId = `f-new-${Date.now()}`;
    const newStage: StageData = {
      id: newId,
      name: "",
      count: 0,
      indicators: [],
      substages: [],
      isFinal: true,
      statusColor: "bg-slate-400",
      isEditing: true,
      allowIncomingTransitions: false
    };
    setFinalStages(prev => [...prev, newStage]);
    setShowAddDropdown(false);
    if (!isGenerating) {
      setVisibleStagesCount(prev => prev + 1);
    }
  };

  const handleAddSubstage = (stageId: string) => {
    const newSubId = `s-new-${Date.now()}`;
    const newSub: Substage = {
      id: newSubId,
      name: "New Substage",
      indicators: [],
      description: "No associated workflows"
    };

    setProcessStages(prev => prev.map(s => {
      if (s.id !== stageId) return s;
      return {
        ...s,
        substages: [...(s.substages || []), newSub]
      };
    }));

    setSelectedStageId(stageId);
    setSelectedSubstageId(newSubId);
  };

  const handleUpdateStage = (id: string, updates: Partial<StageData>) => {
    setProcessStages(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    setFinalStages(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleUpdateSubstage = (stageId: string, subId: string, updates: Partial<Substage>) => {
    setProcessStages(prev => prev.map(s => {
      if (s.id !== stageId) return s;
      return {
        ...s,
        substages: s.substages?.map(sub => sub.id === subId ? { ...sub, ...updates } : sub)
      };
    }));
  };

  const selectedStage = allStages.find(s => s.id === selectedStageId);
  const selectedSubstage = selectedStage?.substages?.find(s => s.id === selectedSubstageId);

  const renderListView = () => (
    <div className="max-w-[1200px] mx-auto p-8 space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search stages or statuses..."
            className="w-full pl-10 pr-4 h-[44px] bg-white border border-[#8C95A8] rounded-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowAddDropdown(!showAddDropdown)}
            className="flex items-center gap-2 px-5 h-[44px] bg-white border border-[#8C95A8] text-primary hover:bg-slate-50 rounded-[10px] text-[14px] font-semibold transition-all"
          >
            <Plus size={18} />
            Add stage
          </button>

          {showAddDropdown && (
            <div className="absolute right-0 mt-2 w-[220px] bg-white rounded-[12px] shadow-2xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in duration-150 origin-top-right">
              <button 
                onClick={addNewProcessStage}
                className="flex items-center gap-3 w-full px-4 py-3 text-slate-700 hover:bg-[#F8F9FB] transition-colors text-[14px] font-medium"
              >
                <GitGraph size={18} className="text-slate-500" />
                Process stage
              </button>
              <button 
                onClick={addNewFinalStage}
                className="flex items-center gap-3 w-full px-4 py-3 text-slate-700 hover:bg-[#F8F9FB] transition-colors text-[14px] font-medium"
              >
                <LogOut size={18} className="text-slate-500" />
                Final stage
              </button>
            </div>
          )}
        </div>
      </div>

      {isGenerating && (
        <>
          <div 
            className="absolute inset-x-0 top-0 pointer-events-none transition-all duration-700 ease-out z-10"
            style={{ 
              height: `${indicatorTop}px`,
              background: 'linear-gradient(to bottom, rgba(202, 193, 242, 0), rgba(202, 193, 242, 0.36))' 
            }}
          />
          <div 
            className="absolute inset-x-0 z-30 pointer-events-none flex flex-col items-center transition-all duration-700 ease-out"
            style={{ top: `${indicatorTop}px` }}
          >
             <div className="w-full h-px bg-primary absolute top-0 left-0" />
             <div className="relative -top-[20px] bg-white border border-primary px-6 py-2.5 rounded-[10px] flex items-center gap-3 animate-in zoom-in duration-300">
                <div className="w-6 h-6 flex items-center justify-center text-primary">
                  <Sparkle size={18} className="animate-pulse" />
                </div>
                <span className="text-primary text-[14px] font-medium whitespace-nowrap">Generating Business Process from files...</span>
             </div>
          </div>
        </>
      )}

      <section className="space-y-4">
        <h2 className="text-[14px] font-medium text-slate-500 uppercase tracking-wider px-1">Process stages</h2>
        <div className="space-y-3">
          {processStages.map((stage, idx) => {
            const isVisible = visibleStagesCount > idx || !isGenerating;
            return (
              <div key={stage.id} ref={el => { itemsRef.current[idx] = el; }}>
                {isVisible ? (
                  <StageRow 
                    {...stage} 
                    onSave={(newName) => handleUpdateStage(stage.id, { name: newName, isEditing: false })}
                    className="animate-in fade-in slide-in-from-top-2 duration-500" 
                  />
                ) : (
                  <StageSkeleton />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="border-t border-dashed border-slate-300" />

      <section className="space-y-4">
        <h2 className="text-[14px] font-medium text-slate-500 uppercase tracking-wider px-1">Final stages</h2>
        <div className="space-y-3">
          {finalStages.map((stage, idx) => {
            const globalIdx = processStages.length + idx;
            const isVisible = visibleStagesCount > globalIdx || !isGenerating;
            return (
              <div key={stage.id} ref={el => { itemsRef.current[globalIdx] = el; }}>
                {isVisible ? (
                  <StageRow 
                    {...stage} 
                    onSave={(newName) => handleUpdateStage(stage.id, { name: newName, isEditing: false })}
                    isFinal 
                    className="animate-in fade-in slide-in-from-top-2 duration-500"
                  />
                ) : (
                  <StageSkeleton />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );

  const renderMapView = () => {
    const connectedStages = processStages.filter(s => !s.allowIncomingTransitions);
    const disconnectedStages = processStages.filter(s => s.allowIncomingTransitions);

    return (
      <div className="relative flex-1 flex flex-col items-center py-10 min-h-full w-full overflow-y-auto overflow-x-hidden">
        <button 
          onClick={() => setIsRulesModalOpen(true)}
          className="fixed left-8 top-28 bg-white border border-[#8C95A8] px-4 py-2.5 rounded-[10px] flex items-center gap-2 hover:bg-slate-50 transition-colors z-40 group"
        >
          <Shield size={16} className="text-slate-500 group-hover:text-primary transition-colors" />
          <span className="text-[13px] font-normal text-slate-700">Rules & Transitions (12)</span>
        </button>

        <div className="flex flex-col items-center w-full max-w-4xl relative">
          <div className="flex flex-col items-center mb-0">
            <div className="bg-white border border-slate-200 border-t-[4px] border-t-[#5CA59B] rounded-[10px] px-4 py-1.5 flex items-center gap-2 z-30">
              <Zap size={16} className="text-[#3C6D68] fill-[#3C6D68]" />
              <span className="text-[13px] font-medium text-slate-800">Entry</span>
            </div>
            <div className="flex flex-col items-center -mt-px">
              <div className="w-[1.5px] h-4 bg-slate-200" />
              <div 
                onClick={() => setIsRulesModalOpen(true)}
                className="bg-white border border-slate-200 p-1 rounded-lg z-30 flex items-center justify-center transition-colors cursor-pointer hover:border-primary group"
              >
                <Shield size={14} className="text-slate-600 transition-colors group-hover:text-primary" />
              </div>
              <div className="w-[1.5px] h-4 bg-slate-200" />
              <div className="w-[12px] h-[12px] bg-[#AEB5C2] rounded-full z-30" />
              <div className="w-[1.5px] h-6 bg-slate-200" />
            </div>
          </div>

          <div className="flex flex-col items-center -mt-px">
            {connectedStages.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <MapStageCard 
                  {...stage} 
                  isSelected={selectedStageId === stage.id}
                  selectedSubstageId={selectedSubstageId}
                  onClick={() => { setSelectedStageId(stage.id); setSelectedSubstageId(null); }}
                  onSubstageClick={(subId, stId) => { setSelectedStageId(stId); setSelectedSubstageId(subId); }}
                  onShieldClick={() => setIsRulesModalOpen(true)}
                  onAddSubstage={handleAddSubstage}
                />
                {idx < connectedStages.length - 1 && (
                  <Connector onShieldClick={() => setIsRulesModalOpen(true)} />
                )}
              </React.Fragment>
            ))}
            
            <div className="flex flex-col items-center -mt-px relative z-10">
               <div className="w-[1.5px] h-8 bg-slate-200" />
               <button className="w-[22px] h-[22px] bg-[#AEB5C2] rounded-[8px] flex items-center justify-center text-white hover:opacity-90 transition-all z-30 -mt-4 active:scale-95">
                  <Plus size={14} />
               </button>
            </div>
          </div>

          {disconnectedStages.length > 0 && (
            <div className="mt-20 space-y-24 flex flex-col items-center">
              {disconnectedStages.map((stage) => (
                <MapStageCard 
                  key={stage.id}
                  {...stage} 
                  isSelected={selectedStageId === stage.id}
                  selectedSubstageId={selectedSubstageId}
                  onClick={() => { setSelectedStageId(stage.id); setSelectedSubstageId(null); }}
                  onSubstageClick={(subId, stId) => { setSelectedStageId(stId); setSelectedSubstageId(subId); }}
                  onShieldClick={() => setIsRulesModalOpen(true)}
                  onAddSubstage={handleAddSubstage}
                />
              ))}
            </div>
          )}

          <div className="w-full mt-24 mb-10 relative px-10">
            <div className="w-full h-px border-t border-dashed border-slate-300" />
            <div className="absolute top-4 left-10 flex items-center gap-2">
              <span className="text-[11px] font-medium text-[#464F5E] uppercase tracking-widest">Final Stages</span>
              <Info size={14} className="text-[#464F5E]" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 w-full mb-20 px-10">
            {finalStages.map((stage) => {
               const Icon = stage.name === 'Hired' ? CheckCircle2 : XCircle;
               const iconColor = stage.name === 'Hired' ? 'text-emerald-500' : 'text-rose-500';
               return (
                 <div key={stage.id} className="bg-white border border-[#E2E8F0] rounded-[12px] py-3 px-5 flex items-center gap-3 w-[260px] hover:border-slate-200 transition-all cursor-pointer group">
                    <Icon size={20} className={iconColor} />
                    <span className="text-[13px] font-normal text-slate-700">{stage.name}</span>
                 </div>
               );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-screen flex flex-col ${viewMode === 'list' ? 'bg-[#F8FAFC]' : 'bg-[#F9FAFB]'}`}>
      <style>{`
        .map-grid-bg {
          background-image: radial-gradient(#e2e8f0 1.2px, transparent 1.2px);
          background-size: 24px 24px;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <header className="h-[72px] bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 min-w-[300px]">
          <button 
            onClick={onBack}
            className="p-1 border border-[#8C95A8] rounded-[6px] hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-[18px] font-bold text-slate-800">Frontline Hiring in Europe</h1>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex bg-[#F8F9FB] rounded-[10px] border border-[#E2E8F0] p-0.5 overflow-hidden">
            <button 
              onClick={() => { setViewMode('list'); setSelectedStageId(null); setSelectedSubstageId(null); }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-slate-800' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List size={16} />
              List
            </button>
            <button 
              onClick={setViewMode.bind(null, 'map')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all ${
                viewMode === 'map' 
                  ? 'bg-white text-slate-800' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Network size={16} />
              Map
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 min-w-[300px] justify-end">
          <button className="px-6 h-[40px] bg-primary text-white rounded-[10px] text-[14px] font-medium hover:bg-primary-dark transition-all">
            Save
          </button>
          <button className="p-2 border border-[#8C95A8] rounded-[8px] hover:bg-slate-50 text-slate-600">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      <main 
        ref={containerRef} 
        className={`flex-1 flex overflow-hidden relative`}
      >
        <div className={`flex-1 overflow-auto relative ${viewMode === 'map' ? 'map-grid-bg' : ''}`}>
          {viewMode === 'list' ? renderListView() : renderMapView()}
        </div>

        {selectedStageId && selectedStage && (
          <aside className="w-[440px] bg-white border-l border-[#E2E8F0] flex flex-col animate-in slide-in-from-right duration-300 z-[60] shadow-xl">
            {selectedSubstageId && selectedSubstage ? (
               /* Substage Side Panel Content */
               <>
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-[20px] font-semibold text-slate-800 mb-1">Substage</h2>
                    <p className="text-[13px] text-slate-400">Define the configuration for this substage</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                      <HelpCircle size={20} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                      <Pencil size={20} />
                    </button>
                    <button 
                      onClick={() => setSelectedSubstageId(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="px-6 py-2 flex items-center gap-4">
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">General</span>
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                  <div className="space-y-3">
                    <label className="block text-[14px] font-medium text-slate-700">Substage name</label>
                    <input 
                      type="text" 
                      value={selectedSubstage.name}
                      onChange={(e) => handleUpdateSubstage(selectedStage.id, selectedSubstage.id, { name: e.target.value })}
                      placeholder="Substage name"
                      className="w-full h-[40px] px-4 bg-white border border-[#8C95A8] rounded-[10px] text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="px-0 py-2 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">Workflows</span>
                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-[14px] font-medium text-slate-700">Associated workflows</label>
                      <button className="flex items-center gap-1 text-[13px] text-primary font-medium hover:underline">
                        Create new <ExternalLink size={14} />
                      </button>
                    </div>
                    
                    {/* CUSTOM DROPDOWN COMPONENT */}
                    <div className="relative" ref={workflowDropdownRef}>
                      <button
                        onClick={() => setIsWorkflowDropdownOpen(!isWorkflowDropdownOpen)}
                        className={`w-full h-[40px] px-4 flex items-center justify-between bg-white border rounded-[10px] text-[14px] transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 ${
                          isWorkflowDropdownOpen ? 'border-primary ring-2 ring-primary/10' : 'border-[#8C95A8]'
                        }`}
                      >
                        <span className={selectedSubstage.description?.includes("Workflow:") ? 'text-slate-800' : 'text-slate-400'}>
                          {selectedSubstage.description?.replace("Workflow: ", "") || 'Select workflow'}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`text-slate-400 transition-transform duration-200 ${isWorkflowDropdownOpen ? 'rotate-180 text-primary' : ''}`} 
                        />
                      </button>

                      {isWorkflowDropdownOpen && (
                        <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-white border border-[#E2E8F0] rounded-[10px] py-1.5 z-[70] shadow-xl animate-in fade-in slide-in-from-bottom-1 duration-150 overflow-hidden">
                          {WORKFLOW_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                handleUpdateSubstage(selectedStage.id, selectedSubstage.id, { description: `Workflow: ${opt.name}` });
                                setIsWorkflowDropdownOpen(false);
                              }}
                              className="w-full px-4 py-2.5 text-left text-[14px] font-medium flex items-center justify-between hover:bg-[#F8F9FB] text-slate-700 transition-colors"
                            >
                              {opt.name}
                              {selectedSubstage.description === `Workflow: ${opt.name}` && <Check size={14} className="text-primary" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-0 py-2 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">States</span>
                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[14px] font-medium text-slate-700">Custom states</label>
                    <div className="relative group">
                      <select className="w-full h-[40px] pl-4 pr-10 bg-white border border-[#8C95A8] rounded-[10px] text-[14px] text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer">
                        <option value="">Select custom states</option>
                        <option value="referral">Referral</option>
                        <option value="rehire">Rehire</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="px-0 py-2 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">Rules</span>
                    <div className="flex-1 h-px bg-[#E2E8F0]" />
                  </div>

                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    Rules created on the map will appear here.
                  </p>
                </div>
               </>
            ) : (
              /* Stage Side Panel Content */
              <>
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-[20px] font-semibold text-slate-800 mb-1">Stage</h2>
                    <p className="text-[13px] text-slate-400">Define the configuration for this stage</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                      <HelpCircle size={20} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                      <Pencil size={20} />
                    </button>
                    <button 
                      onClick={() => setSelectedStageId(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="px-6 py-2 flex items-center gap-4">
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap">Configuration</span>
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                  <div className="space-y-3">
                    <label className="block text-[14px] font-medium text-slate-700">Stage name</label>
                    <input 
                      type="text" 
                      value={selectedStage.name}
                      onChange={(e) => handleUpdateStage(selectedStage.id, { name: e.target.value })}
                      className="w-full h-[40px] px-4 bg-white border border-[#8C95A8] rounded-[10px] text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[14px] font-medium text-slate-700">Description</label>
                    <textarea 
                      placeholder="Stage description"
                      value={selectedStage.description || ""}
                      onChange={(e) => handleUpdateStage(selectedStage.id, { description: e.target.value })}
                      className="w-full h-[100px] px-4 py-3 bg-white border border-[#8C95A8] rounded-[10px] text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[14px] font-medium text-slate-700">Incoming transitions</label>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] text-slate-600">Allow incoming transitions from any stage</span>
                        <Info size={16} className="text-slate-400 cursor-help" />
                      </div>
                      <Toggle 
                        checked={!!selectedStage.allowIncomingTransitions} 
                        onChange={(val) => handleUpdateStage(selectedStage.id, { allowIncomingTransitions: val })} 
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </aside>
        )}
      </main>

      <RulesModal 
        isOpen={isRulesModalOpen} 
        onClose={() => setIsRulesModalOpen(false)} 
      />
    </div>
  );
};

export default ProcessEditor;
