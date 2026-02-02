
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, Loader2, CheckCircle2, Eye, Trash2 } from 'lucide-react';
// Import MockFile from types
import { MockFile } from '../types';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: MockFile[]) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [mockFiles, setMockFiles] = useState<MockFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate upload progress
  useEffect(() => {
    let interval: number;
    if (mockFiles.some(f => f.status === 'uploading')) {
      interval = window.setInterval(() => {
        setMockFiles(prev => prev.map(file => {
          if (file.status === 'uploading') {
            const nextProgress = file.progress + 10;
            if (nextProgress >= 100) {
              return { ...file, status: 'ready', progress: 100 };
            }
            return { ...file, progress: nextProgress };
          }
          return file;
        }));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [mockFiles]);

  if (!isOpen) return null;

  const startSimulation = () => {
    setMockFiles([
      { id: '1', name: 'Dynamic_BPD_Confidential.pdf', size: '945 KB', status: 'uploading', progress: 0 },
      { id: '2', name: 'Conditions_File.pdf', size: '12 MB', status: 'uploading', progress: 0 }
    ]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    startSimulation();
  };

  const onButtonClick = () => {
    startSimulation();
  };

  const removeFile = (id: string) => {
    setMockFiles(prev => prev.filter(f => f.id !== id));
  };

  const allReady = mockFiles.length > 0 && mockFiles.every(f => f.status === 'ready');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div 
        className="bg-white w-full max-w-[700px] rounded-[20px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-[20px] font-semibold text-slate-800">Upload files</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[75vh] no-scrollbar">
          {/* Drop Zone */}
          <div 
            className={`relative rounded-[20px] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center py-12 px-6 cursor-pointer ${
              dragActive ? 'border-primary bg-primary/5' : 'border-[#D1D5DC] bg-[#F9FAFB]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <div className="w-14 h-14 bg-white rounded-xl border border-gray-100 flex items-center justify-center mb-6">
              <Upload className="text-primary w-6 h-6" />
            </div>

            <div className="text-center mb-2">
              <span className="text-[14px] font-medium text-primary">Select a file to upload</span>
              <span className="text-[14px] font-medium text-slate-600"> or drag and drop it here</span>
            </div>

            <p className="text-sm text-slate-400 font-normal">
              .PDF, .DOC and .CSV files are supported, up to 1MB.
            </p>
          </div>

          {/* Files List */}
          {mockFiles.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 className="text-sm font-semibold text-slate-600 px-1">Files</h3>
              <div className="space-y-3">
                {mockFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className={`relative p-4 rounded-[16px] border transition-all duration-300 flex gap-4 items-center bg-white ${
                      file.status === 'ready' ? 'border-[#00BA88]' : 'border-[#D1D5DC]'
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center">
                      {/* Updated File Icon SVG as requested */}
                      <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M2 4C2 2.89375 2.89375 2 4 2H12V8C12 10.2062 13.7938 12 16 12H22V21H12.5C10.5688 21 9 22.5688 9 24.5V30H4C2.89375 30 2 29.1063 2 28V4Z" fill="#E44A3F"/>
                        <path d="M12 2H4C2.89375 2 2 2.89375 2 4V28C2 29.1063 2.89375 30 4 30H9V32H4C1.79375 32 0 30.2062 0 28V4C0 1.79375 1.79375 0 4 0H12.3438C13.4062 0 14.425 0.41875 15.175 1.16875L22.8312 8.83125C23.5812 9.58125 24 10.6 24 11.6625V21.0063H22V12.0063H16C13.7938 12.0063 12 10.2125 12 8.00625V2.00625V2ZM21.1688 10L14 2.83125V8C14 9.10625 14.8937 10 16 10H21.1688ZM13 24H15C16.9312 24 18.5 25.5688 18.5 27.5C18.5 29.4312 16.9312 31 15 31H14V33C14 33.55 13.55 34 13 34C12.45 34 12 33.55 12 33V25C12 24.45 12.45 24 13 24ZM15 29C15.8313 29 16.5 28.3313 16.5 27.5C16.5 26.6687 15.8313 26 15 26H14V29H15ZM21 24H23C24.6562 24 26 25.3438 26 27V31C26 32.6562 24.6562 34 23 34H21C20.45 34 20 33.55 20 33V25C20 24.45 20.45 24 21 24ZM23 32C23.55 32 24 31.55 24 31V27C24 26.45 23.55 26 23 26H22V32H23ZM28 25C28 24.45 28.45 24 29 24H32C32.55 24 33 24.45 33 25C33 25.55 32.55 26 32 26H30V28H32C32.55 28 33 28.45 33 29C33 29.55 32.55 30 32 30H30V33C30 33.55 29.55 34 29 34C28.45 34 28 33.55 28 33V25Z" fill="#E44A3F"/>
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate mb-0.5">
                        {file.name}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-400 leading-none">{file.size}</span>
                        
                        {/* Status Badges on the same line as size */}
                        {file.status === 'uploading' ? (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium leading-none">
                            <Loader2 size={10} className="animate-spin" />
                            Uploading...
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00BA88]/10 text-[#00BA88] text-[10px] font-medium leading-none">
                            <CheckCircle2 size={10} />
                            Ready
                          </div>
                        )}
                      </div>

                      {/* Progress Bar only if uploading */}
                      {file.status === 'uploading' && (
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                          <div 
                            className="h-full bg-primary transition-all duration-300 ease-out" 
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {file.status === 'ready' && (
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                          <Eye size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with increased padding */}
        <div className="px-8 py-6 flex items-center justify-end gap-3 border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="px-6 h-[44px] text-sm font-medium text-slate-700 bg-white border border-[#D1D5DC] rounded-[10px] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!allReady}
            onClick={() => onUpload(mockFiles)}
            className={`px-8 h-[44px] text-sm font-medium rounded-[10px] transition-all ${
              allReady 
                ? 'bg-primary text-white hover:bg-primary-dark' 
                : 'bg-[#E8EAEE] text-[#8C95A8] cursor-not-allowed'
            }`}
          >
            Create Business Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
