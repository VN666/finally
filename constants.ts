import { InspectionTask, RectificationOrder, RecordEntry, UserRole } from './types';

export const MOCK_NOTIFICATIONS = [
  "Announcement: New hygiene standards effective Sept 1st.",
  "Reminder: Please complete the monthly self-check by Friday.",
];

export const MOCK_INSPECTIONS: InspectionTask[] = [
  { id: '1', title: 'Aug Ending Restaurant Special', type: 'Special', score: 85, totalIssues: 10, rectifiedIssues: 8, status: 'Completed', date: '2023-08-25', storeName: 'Store A' },
  { id: '2', title: 'QSC Monthly Check', type: 'Regular', score: 92, totalIssues: 5, rectifiedIssues: 5, status: 'Completed', date: '2023-08-28', storeName: 'Store B' },
  { id: '3', title: 'Video Hygiene Audit', type: 'Video', totalIssues: 3, rectifiedIssues: 0, status: 'Pending', date: '2023-09-01', storeName: 'Store A' },
  { id: '4', title: 'Daily Self Check', type: 'Self', totalIssues: 0, rectifiedIssues: 0, status: 'Pending', date: '2023-09-02', storeName: 'Store A' },
];

export const MOCK_RECTIFICATIONS: RectificationOrder[] = [
  { id: '101', title: 'Dirty Floor in Kitchen', storeName: 'Store A', status: 'Pending Rectification', date: '2023-09-01', source: 'Video Audit' },
  { id: '102', title: 'Uniform Irregularity', storeName: 'Store B', status: 'Pending Review', date: '2023-08-30', source: 'Regular Inspection' },
  { id: '103', title: 'Trash Bin Overflow', storeName: 'Store A', status: 'Completed', date: '2023-08-25', source: 'Self Check' },
  { id: '104', title: 'Expired Ingredients', storeName: 'Store C', status: 'Pending Rectification', date: '2023-09-02', source: 'Special Inspection' },
];

export const MOCK_RECORDS: RecordEntry[] = [
  { id: '201', type: 'Waste Oil', date: '2023-08-28', status: 'Normal', details: 'Collected by Vendor X' },
  { id: '202', type: 'Filter', date: '2023-06-15', status: 'Expiring Soon', details: 'Water Filter Unit 2' },
  { id: '203', type: 'Health Cert', date: '2023-01-10', status: 'Expired', details: 'John Doe' },
];

export const CHART_DATA = [
  { name: 'Uniforms', value: 40 },
  { name: 'Hygiene', value: 30 },
  { name: 'Service', value: 20 },
  { name: 'Safety', value: 10 },
];

export const ROLE_OPTIONS = [UserRole.STORE_MANAGER, UserRole.AREA_MANAGER, UserRole.EMPLOYEE];
