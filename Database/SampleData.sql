-- Insert Users
INSERT INTO ohpnm.mese_users (UserName, Email, PasswordHash)
VALUES 
('admin', 'admin@example.com', 'admin'),
('manager', 'john.doe@example.com', 'manager'),
('user', 'jane.smith@example.com', 'user');

-- Insert Roles
INSERT INTO ohpnm.mese_roles (RoleName)
VALUES
('Admin'),
('Manager'),
('User');

-- Insert Permissions
INSERT INTO ohpnm.mese_permissions (Code, Type)
VALUES
('DASHBOARD.VIEW', 'MENU'),
('DASHBOARD.REPORTS', 'PANEL'),
('REPORTS.EXPORT', 'BUTTON'),
('REPORTS.DELETE', 'BUTTON'),
('USERS.VIEW', 'PANEL'),
('USERS.CREATE', 'BUTTON'),
('USERS.EDIT', 'BUTTON'),
('USERS.DELETE', 'BUTTON'),
('SETTINGS.VIEW', 'MENU'),
('SETTINGS.UPDATE', 'FEATURE'),
('DASHBOARD', 'MENU'),
('USERS', 'MENU'),
('SETTINGS', 'MENU');

-- Assign Multiple Roles to Users
-- Get IDs dynamically instead of hardcoding
INSERT INTO ohpnm.mese_userroles (UserId, RoleId)
SELECT u.UserId, r.RoleId
FROM ohpnm.mese_users u
JOIN ohpnm.mese_roles r ON r.RoleName = 'Admin'
WHERE u.UserName = 'admin';

INSERT INTO ohpnm.mese_userroles (UserId, RoleId)
SELECT u.UserId, r.RoleId
FROM ohpnm.mese_users u
JOIN ohpnm.mese_roles r ON r.RoleName = 'Manager'
WHERE u.UserName = 'admin';

INSERT INTO ohpnm.mese_userroles (UserId, RoleId)
SELECT u.UserId, r.RoleId
FROM ohpnm.mese_users u
JOIN ohpnm.mese_roles r ON r.RoleName = 'Manager'
WHERE u.UserName = 'manager';

INSERT INTO ohpnm.mese_userroles (UserId, RoleId)
SELECT u.UserId, r.RoleId
FROM ohpnm.mese_users u
JOIN ohpnm.mese_roles r ON r.RoleName = 'User'
WHERE u.UserName = 'manager';

INSERT INTO ohpnm.mese_userroles (UserId, RoleId)
SELECT u.UserId, r.RoleId
FROM ohpnm.mese_users u
JOIN ohpnm.mese_roles r ON r.RoleName = 'User'
WHERE u.UserName = 'user';

-- Assign Permissions to Roles
-- Admin role -> All permissions
INSERT INTO ohpnm.mese_rolepermissions (RoleId, PermissionId)
SELECT r.RoleId, p.PermissionId
FROM ohpnm.mese_roles r
CROSS JOIN ohpnm.mese_permissions p
WHERE r.RoleName = 'Admin';

-- Manager role -> Dashboard + Reports
INSERT INTO ohpnm.mese_rolepermissions (RoleId, PermissionId)
SELECT r.RoleId, p.PermissionId
FROM ohpnm.mese_roles r
JOIN ohpnm.mese_permissions p ON p.Code IN 
('DASHBOARD.VIEW','DASHBOARD.REPORTS','REPORTS.EXPORT','USERS.VIEW','DASHBOARD','USERS')
WHERE r.RoleName = 'Manager';

-- User role -> Basic View only
INSERT INTO ohpnm.mese_rolepermissions (RoleId, PermissionId)
SELECT r.RoleId, p.PermissionId
FROM ohpnm.mese_roles r
JOIN ohpnm.mese_permissions p ON p.Code IN 
('DASHBOARD.VIEW','USERS.VIEW','DASHBOARD')
WHERE r.RoleName = 'User';
