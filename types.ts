export enum UserRole {
  STORE_MANAGER = 'Store Manager',
  AREA_MANAGER = 'Area Manager',
  EMPLOYEE = 'Employee'
}

export interface InspectionTask {
  id: string;
  title: string;
  type: 'Regular' | 'Special' | 'Video' | 'Self';
  score?: number;
  totalIssues: number;
  rectifiedIssues: number;
  status: 'Pending' | 'Completed' | 'Expired';
  date: string;
  storeName: string;
}

export interface RectificationOrder {
  id: string;
  title: string;
  storeName: string;
  status: 'Pending Rectification' | 'Pending Review' | 'Completed';
  date: string;
  source: string;
  imageUrl?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface RecordEntry {
  id: string;
  type: 'Waste Oil' | 'Filter' | 'Ice Machine' | 'Health Cert';
  date: string;
  status: 'Normal' | 'Expiring Soon' | 'Expired';
  details: string;
}
