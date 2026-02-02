
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProcessTable from './components/ProcessTable';
import CreateProcessModal from './components/CreateProcessModal';
import FileUploadModal from './components/FileUploadModal';
import ProcessEditor from './components/ProcessEditor';
import { Plus } from 'lucide-react';
// Import MockFile from types
import { MockFile } from './types';

type ViewType = 'dashboard' | 'editor';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleOpenUpload = () => {
    setIsModalOpen(false);
    setIsUploadOpen(true);
  };

  const handleUploadComplete = (files: MockFile[]) => {
    console.log('Files uploaded:', files);
    setIsUploadOpen(false);
    // Switch to the editor view after files are processed
    setView('editor');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  if (view === 'editor') {
    return <ProcessEditor onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Header />
      
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 ml-64 bg-[#F1F3F4]">
          {/* Page Header Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-[24px] font-semibold tracking-tight leading-tight">
                Business Processes
              </h1>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 h-[40px] bg-primary hover:bg-primary-dark text-white rounded-[10px] text-[14px] font-normal transition-all active:scale-95"
              >
                <Plus size={18} />
                Create new process
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            <ProcessTable />
          </div>
        </main>
      </div>

      <CreateProcessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onGenerateFromFiles={handleOpenUpload}
      />

      <FileUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadComplete}
      />
    </div>
  );
};

export default App;
