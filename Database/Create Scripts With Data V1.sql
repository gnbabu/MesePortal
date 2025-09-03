
/****** Object:  Schema [ohpnm]    Script Date: 03-09-2025 23:51:32 ******/
CREATE SCHEMA [ohpnm]
GO
/****** Object:  Table [ohpnm].[mese_Permissions]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ohpnm].[mese_Permissions](
	[PermissionId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](150) NOT NULL,
	[Type] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [ohpnm].[mese_RolePermissions]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ohpnm].[mese_RolePermissions](
	[RoleId] [int] NOT NULL,
	[PermissionId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC,
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [ohpnm].[mese_Roles]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ohpnm].[mese_Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [ohpnm].[mese_UserRoles]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ohpnm].[mese_UserRoles](
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [ohpnm].[mese_Users]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ohpnm].[mese_Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](200) NULL,
	[PasswordHash] [nvarchar](256) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [ohpnm].[mese_Permissions] ON 
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (1, N'DASHBOARD.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (2, N'DASHBOARD.REPORTS', N'PANEL')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (3, N'REPORTS.EXPORT', N'BUTTON')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (4, N'REPORTS.DELETE', N'BUTTON')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (5, N'USERS.VIEW', N'PANEL')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (6, N'USERS.CREATE', N'BUTTON')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (7, N'USERS.EDIT', N'BUTTON')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (8, N'USERS.DELETE', N'BUTTON')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (9, N'SETTINGS.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (10, N'SETTINGS.UPDATE', N'FEATURE')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (11, N'DASHBOARD', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (12, N'USERS', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (13, N'SETTINGS', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (14, N'SKIP.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (15, N'MEDICAID.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (16, N'HOME.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (25, N'MYQUEUE.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (26, N'PROVIDERSEARCH.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (27, N'OWNERSEARCH.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (28, N'PROVIDERDIRECTORY.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (29, N'GISSEARCH.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (30, N'PROFILE.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (31, N'SITEVISIT.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (32, N'TRANSACTION.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (33, N'USERADMIN.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (34, N'REFDATA.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (35, N'WORKFLOW.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (36, N'REPORTS.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (37, N'APM.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (38, N'ORDERING.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (39, N'ELIGIBILITY.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (40, N'SPECIALTY.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (41, N'EDUCATION.VIEW', N'MENU')
GO
INSERT [ohpnm].[mese_Permissions] ([PermissionId], [Code], [Type]) VALUES (42, N'NEWPROVIDER.VIW', N'BUTTON')
GO
SET IDENTITY_INSERT [ohpnm].[mese_Permissions] OFF
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 1)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 2)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 3)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 4)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 5)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 6)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 7)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 8)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 9)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 10)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 11)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 12)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 13)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 14)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 15)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 16)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 25)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 26)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 27)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 28)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 29)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 30)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 31)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 32)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 33)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 34)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 35)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 36)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 37)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 38)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 39)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 40)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 41)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (1, 42)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 1)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 2)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 3)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 5)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 11)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 12)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 26)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 27)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 28)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 29)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 30)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (2, 42)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (3, 1)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (3, 5)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (3, 11)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (4, 1)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (4, 42)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 1)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 2)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 3)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 4)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 5)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 6)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 7)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 8)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 9)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 10)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 11)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 12)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 13)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 14)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 15)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 16)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 25)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 26)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 27)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 28)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 29)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 30)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 31)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 32)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 33)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 34)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 35)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 36)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 37)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 38)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 39)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 40)
GO
INSERT [ohpnm].[mese_RolePermissions] ([RoleId], [PermissionId]) VALUES (5, 41)
GO
SET IDENTITY_INSERT [ohpnm].[mese_Roles] ON 
GO
INSERT [ohpnm].[mese_Roles] ([RoleId], [RoleName], [Description]) VALUES (1, N'Admin', NULL)
GO
INSERT [ohpnm].[mese_Roles] ([RoleId], [RoleName], [Description]) VALUES (2, N'Manager', NULL)
GO
INSERT [ohpnm].[mese_Roles] ([RoleId], [RoleName], [Description]) VALUES (3, N'User', NULL)
GO
INSERT [ohpnm].[mese_Roles] ([RoleId], [RoleName], [Description]) VALUES (4, N'ProviderAdmin', N'Administrator role for providers')
GO
INSERT [ohpnm].[mese_Roles] ([RoleId], [RoleName], [Description]) VALUES (5, N'TechAdmin', N'Technical administrator role')
GO
SET IDENTITY_INSERT [ohpnm].[mese_Roles] OFF
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (1, 1)
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (1, 2)
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (2, 2)
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (2, 3)
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (3, 3)
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (4, 4)
GO
INSERT [ohpnm].[mese_UserRoles] ([UserId], [RoleId]) VALUES (5, 5)
GO
SET IDENTITY_INSERT [ohpnm].[mese_Users] ON 
GO
INSERT [ohpnm].[mese_Users] ([UserId], [UserName], [Email], [PasswordHash], [IsActive], [CreatedAt]) VALUES (1, N'admin', N'admin@example.com', N'admin', 1, CAST(N'2025-08-25T11:27:38.090' AS DateTime))
GO
INSERT [ohpnm].[mese_Users] ([UserId], [UserName], [Email], [PasswordHash], [IsActive], [CreatedAt]) VALUES (2, N'manager', N'john.doe@example.com', N'manager', 1, CAST(N'2025-08-25T11:27:38.090' AS DateTime))
GO
INSERT [ohpnm].[mese_Users] ([UserId], [UserName], [Email], [PasswordHash], [IsActive], [CreatedAt]) VALUES (3, N'user', N'jane.smith@example.com', N'user', 1, CAST(N'2025-08-25T11:27:38.090' AS DateTime))
GO
INSERT [ohpnm].[mese_Users] ([UserId], [UserName], [Email], [PasswordHash], [IsActive], [CreatedAt]) VALUES (4, N'provideradmin', N'provider.admin@example.com', N'provideradmin', 1, CAST(N'2025-09-03T23:09:02.803' AS DateTime))
GO
INSERT [ohpnm].[mese_Users] ([UserId], [UserName], [Email], [PasswordHash], [IsActive], [CreatedAt]) VALUES (5, N'techadmin', N'tech.admin@example.com', N'techadmin', 1, CAST(N'2025-09-03T23:09:02.803' AS DateTime))
GO
SET IDENTITY_INSERT [ohpnm].[mese_Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__mese_Per__A25C5AA7612D4CB7]    Script Date: 03-09-2025 23:51:32 ******/
ALTER TABLE [ohpnm].[mese_Permissions] ADD UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__mese_Rol__8A2B6160918BE0D9]    Script Date: 03-09-2025 23:51:32 ******/
ALTER TABLE [ohpnm].[mese_Roles] ADD UNIQUE NONCLUSTERED 
(
	[RoleName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__mese_Use__A9D10534F92618A2]    Script Date: 03-09-2025 23:51:32 ******/
ALTER TABLE [ohpnm].[mese_Users] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__mese_Use__C9F284567153B904]    Script Date: 03-09-2025 23:51:32 ******/
ALTER TABLE [ohpnm].[mese_Users] ADD UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [ohpnm].[mese_Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [ohpnm].[mese_Users] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [ohpnm].[mese_RolePermissions]  WITH CHECK ADD FOREIGN KEY([PermissionId])
REFERENCES [ohpnm].[mese_Permissions] ([PermissionId])
GO
ALTER TABLE [ohpnm].[mese_RolePermissions]  WITH CHECK ADD FOREIGN KEY([RoleId])
REFERENCES [ohpnm].[mese_Roles] ([RoleId])
GO
ALTER TABLE [ohpnm].[mese_UserRoles]  WITH CHECK ADD FOREIGN KEY([RoleId])
REFERENCES [ohpnm].[mese_Roles] ([RoleId])
GO
ALTER TABLE [ohpnm].[mese_UserRoles]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [ohpnm].[mese_Users] ([UserId])
GO
/****** Object:  StoredProcedure [ohpnm].[usp_GetUserDetailsById]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [ohpnm].[usp_GetUserDetailsById]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.UserId,
        u.UserName,
        u.Email,
        u.IsActive,
        u.CreatedAt
    FROM ohpnm.mese_Users u
    WHERE u.UserId = @UserId;
END;
GO
/****** Object:  StoredProcedure [ohpnm].[usp_GetUserRolesPermissions]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [ohpnm].[usp_GetUserRolesPermissions]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Get user basic details
    SELECT 
        u.UserId,
        u.UserName,
        u.Email,
        u.IsActive
    FROM ohpnm.mese_Users u
    WHERE u.UserId = @UserId;

    -- Get all roles assigned to user
    SELECT 
        r.RoleId,
        r.RoleName
    FROM ohpnm.mese_UserRoles ur
    INNER JOIN ohpnm.mese_Roles r ON ur.RoleId = r.RoleId
    WHERE ur.UserId = @UserId;

    -- Get all permissions from assigned roles
    SELECT DISTINCT
        p.PermissionId,
        p.Code AS PermissionCode,
        p.Type AS PermissionType
    FROM ohpnm.mese_UserRoles ur
    INNER JOIN ohpnm.mese_Roles r ON ur.RoleId = r.RoleId
    INNER JOIN ohpnm.mese_RolePermissions rp ON r.RoleId = rp.RoleId
    INNER JOIN ohpnm.mese_Permissions p ON rp.PermissionId = p.PermissionId
    WHERE ur.UserId = @UserId
    ORDER BY p.Code;
END;
GO
/****** Object:  StoredProcedure [ohpnm].[usp_ValidateUser]    Script Date: 03-09-2025 23:51:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [ohpnm].[usp_ValidateUser]
    @UserName NVARCHAR(100),
    @Password NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.UserId,
        u.UserName,
        u.Email,
        u.IsActive,
        u.CreatedAt
    FROM ohpnm.mese_Users u
    WHERE u.UserName = @UserName
      AND u.PasswordHash = @Password
      AND u.IsActive = 1;
END;
GO
USE [master]
GO
ALTER DATABASE [OH_PNM_MESE_MAIN] SET  READ_WRITE 
GO
