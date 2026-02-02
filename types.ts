
export type ProcessStatus = 'Active' | 'Pending' | 'Inactive';

export interface Process {
  id: string;
  name: string;
  type: string;
  stages: number;
  status: ProcessStatus;
  lastUpdate: string;
  createdBy: string;
}

export type FilterType = 'All' | 'Hiring' | 'Onboarding' | 'Custom';

// Added MockFile interface for file upload simulation
export interface MockFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'ready';
  progress: number;
}
