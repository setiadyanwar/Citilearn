// ─────────────────────────────────────────────────────────────────
// Mock Data & Constants for User Hub
// ─────────────────────────────────────────────────────────────────

export const MOCK_USERS = [
    { id: 1, nopeg: 'CTL-001', name: 'Budi Pratama', email: 'budi.pratama@citilink.co.id', role: 'Admin', department: 'Human Capital', status: 'Active', lastActive: '2 hours ago', joined: '2024-01-15' },
    { id: 2, nopeg: 'CTL-002', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@citilink.co.id', role: 'Instructor', department: 'Pilot', status: 'Active', lastActive: '1 day ago', joined: '2024-02-20' },
    { id: 3, nopeg: 'CTL-003', name: 'Ahmad Yani', email: 'ahmad.yani@citilink.co.id', role: 'Learner', department: 'Maintenance', status: 'Active', lastActive: '3 days ago', joined: '2024-03-10' },
    { id: 4, nopeg: 'CTL-004', name: 'Dewi Lestari', email: 'dewi.lestari@citilink.co.id', role: 'Learner', department: 'Safety', status: 'Inactive', lastActive: '2 weeks ago', joined: '2023-11-05' },
    { id: 5, nopeg: 'CTL-005', name: 'Riko Valentino', email: 'riko.valentino@citilink.co.id', role: 'Instructor', department: 'Ground Ops', status: 'Active', lastActive: '5 hours ago', joined: '2024-01-28' },
    { id: 6, nopeg: 'CTL-006', name: 'Maya Kusuma', email: 'maya.kusuma@citilink.co.id', role: 'Learner', department: 'Cabin Crew', status: 'Active', lastActive: 'Just now', joined: '2024-04-01' },
    { id: 7, nopeg: 'CTL-007', name: 'Hendri Saputra', email: 'hendri.saputra@citilink.co.id', role: 'Learner', department: 'Pilot', status: 'Suspended', lastActive: '1 month ago', joined: '2023-08-14' },
    { id: 8, nopeg: 'CTL-008', name: 'Rina Wahyuni', email: 'rina.wahyuni@citilink.co.id', role: 'Admin', department: 'Human Capital', status: 'Active', lastActive: '30 minutes ago', joined: '2023-06-20' },
];

export const MOCK_DEPARTMENTS = [
    { id: 1, name: 'Human Capital', shortCode: 'HC', description: 'HR, recruitment & employee development.', memberCount: 12, courseCount: 5, color: 'bg-violet-500' },
    { id: 2, name: 'Pilot', shortCode: 'PIL', description: 'First officers, captains & flight crew.', memberCount: 85, courseCount: 12, color: 'bg-blue-500' },
    { id: 3, name: 'Maintenance', shortCode: 'MNT', description: 'Aircraft technicians & engineers.', memberCount: 60, courseCount: 8, color: 'bg-amber-500' },
    { id: 4, name: 'Safety & Compliance', shortCode: 'SAF', description: 'Safety officers & risk analysts.', memberCount: 18, courseCount: 10, color: 'bg-red-500' },
    { id: 5, name: 'Ground Operations', shortCode: 'GRD', description: 'Check-in, baggage & ramp teams.', memberCount: 120, courseCount: 6, color: 'bg-green-500' },
    { id: 6, name: 'Cabin Crew', shortCode: 'CAB', description: 'Flight attendants & service crew.', memberCount: 200, courseCount: 9, color: 'bg-pink-500' },
];

export const MOCK_ROLES = [
    {
        id: 1, name: 'Admin', description: 'Full system access — manage courses, users, reports.',
        userCount: 3, badgeVariant: 'danger',
        permissions: ['manage_users', 'manage_courses', 'manage_roles', 'manage_departments', 'view_reports', 'view_grading', 'publish_courses'],
    },
    {
        id: 2, name: 'Instructor', description: 'Create & manage courses, grade learners.',
        userCount: 28, badgeVariant: 'continue',
        permissions: ['manage_courses', 'view_grading', 'publish_courses', 'view_reports'],
    },
    {
        id: 3, name: 'Learner', description: 'Access and complete assigned courses only.',
        userCount: 1215, badgeVariant: 'outline',
        permissions: ['view_courses'],
    },
];

export const ALL_PERMISSIONS = [
    { key: 'manage_users', label: 'Manage Users', group: 'Users' },
    { key: 'manage_roles', label: 'Manage Roles', group: 'Users' },
    { key: 'manage_departments', label: 'Manage Departments', group: 'Users' },
    { key: 'manage_courses', label: 'Manage Courses', group: 'Courses' },
    { key: 'publish_courses', label: 'Publish Courses', group: 'Courses' },
    { key: 'view_courses', label: 'View Courses', group: 'Courses' },
    { key: 'view_grading', label: 'View & Grade Submissions', group: 'Grading' },
    { key: 'view_reports', label: 'View Analytics & Reports', group: 'Reports' },
];

export const STATUS_BADGE_MAP = {
    Active: 'success',
    Inactive: 'outline',
    Suspended: 'danger',
};

export const ROLE_BADGE_MAP = {
    Admin: 'danger',
    Instructor: 'continue',
    Learner: 'outline',
};
