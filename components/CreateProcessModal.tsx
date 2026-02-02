
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

interface CreateProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateFromFiles: () => void;
}

const PROCESS_TYPES = ['Hiring', 'Onboarding', 'Custom'];

const CreateProcessModal: React.FC<CreateProcessModalProps> = ({ isOpen, onClose, onGenerateFromFiles }) => {
  const [step, setStep] = useState(1);
  const [processType, setProcessType] = useState('');
  const [processName, setProcessName] = useState('');
  const [description, setDescription] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setProcessType('');
      setProcessName('');
      setDescription('');
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    setStep(2);
  };

  const handleFinalize = (method: string) => {
    if (method === 'ai') {
      onGenerateFromFiles();
    } else {
      console.log('Finalizing with:', { processType, processName, description, method });
      onClose();
    }
  };

  const isFormValid = processType && processName.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div 
        className={`bg-white w-full transition-all duration-300 rounded-[20px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 ${
          step === 1 ? 'max-w-[500px]' : 'max-w-[850px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-slate-800">
            {step === 1 ? 'Business Process Details' : 'How would you like to create the Business Process?'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {step === 1 ? (
          <>
            {/* Step 1: Form Body */}
            <div className="px-8 pb-8 pt-0 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-600">
                  Process Type
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full h-[40px] px-3 flex items-center justify-between bg-white border rounded-[10px] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/10 ${
                      isDropdownOpen ? 'border-primary ring-2 ring-primary/10' : 'border-[#8C95A8]'
                    }`}
                  >
                    <span className={processType ? 'text-slate-700' : 'text-slate-400'}>
                      {processType || 'Select process type'}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`} 
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E2E8F0] rounded-[10px] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {PROCESS_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setProcessType(type);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium flex items-center justify-between hover:bg-slate-50 text-slate-700 transition-colors"
                        >
                          {type}
                          {processType === type && <Check size={14} className="text-primary" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-600">
                  Process Name
                </label>
                <input
                  type="text"
                  value={processName}
                  onChange={(e) => setProcessName(e.target.value)}
                  placeholder="Untitled Process"
                  className="w-full h-[40px] px-3 bg-white border border-[#8C95A8] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-700 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-600">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full h-[120px] px-3 py-2 bg-white border border-[#8C95A8] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={onClose}
                className="px-6 h-[40px] text-sm font-medium text-slate-600 bg-white border border-[#D1D5DC] rounded-[10px] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!isFormValid}
                className={`px-8 h-[40px] text-sm font-medium rounded-[10px] transition-all ${
                  isFormValid 
                    ? 'bg-primary text-white hover:bg-primary-dark' 
                    : 'bg-[#E8EAEE] text-[#8C95A8] cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          /* Step 2: Selection Method Body */
          <div className="px-8 pb-12 pt-2 animate-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Create from blank */}
              <button 
                onClick={() => handleFinalize('blank')}
                className="group flex flex-col items-center p-3 rounded-[24px] border-2 border-slate-100 hover:border-primary transition-all duration-300 text-center bg-white hover:scale-[1.02]"
              >
                <div className="w-full aspect-[4/3] mb-5 rounded-[18px] overflow-hidden flex items-center justify-center">
                   <img 
                    src="https://i.imgur.com/aT4H62B.png" 
                    alt="Blank illustration" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-[16px] font-semibold text-slate-800 mb-1">Create from blank</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">
                  Start from scratch with a blank canvas
                </p>
              </button>

              {/* Option 2: Use a template */}
              <button 
                onClick={() => handleFinalize('template')}
                className="group flex flex-col items-center p-3 rounded-[24px] border-2 border-slate-100 hover:border-primary transition-all duration-300 text-center bg-white hover:scale-[1.02]"
              >
                <div className="w-full aspect-[4/3] mb-5 rounded-[18px] overflow-hidden  flex items-center justify-center">
                   <img 
                    src="https://i.imgur.com/xZRixKT.png" 
                    alt="Template illustration" 
                    className="max-w-full max-h-full object-contain opacity-80"
                  />
                </div>
                <h3 className="text-[16px] font-semibold text-slate-800 mb-1">Use a template</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">
                  Use one of your industry-specific templates
                </p>
              </button>

              {/* Option 3: Generate from files */}
              <button 
                onClick={() => handleFinalize('ai')}
                className="group flex flex-col items-center p-3 rounded-[24px] border-2 border-slate-100 hover:border-primary transition-all duration-300 text-center bg-white hover:scale-[1.02]"
              >
                <div className="w-full aspect-[4/3] mb-5 rounded-[18px] overflow-hidden flex items-center justify-center">
                   <img 
                    src="https://i.imgur.com/tpIpKiy.png" 
                    alt="AI illustration" 
                    className="max-w-full max-h-full object-contain opacity-80"
                  />
                </div>
                <h3 className="text-[16px] font-semibold text-slate-800 mb-1">Generate from files</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">
                  Upload any files describing your process and a flow will be generated
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProcessModal;
