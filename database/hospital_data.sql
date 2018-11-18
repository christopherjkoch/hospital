USE [Hospital]
GO

SET IDENTITY_INSERT [dbo].[Patient] ON

INSERT INTO [dbo].[Patient] ([Id],[FirstName],[LastName],[Town],[Temperature],[Pulse]) VALUES (1,'Fred','Smith','Arlington',98.6,70)
INSERT INTO [dbo].[Patient] ([Id],[FirstName],[LastName],[Town],[Temperature],[Pulse]) VALUES (2,'Sally','Jones','Milford',98.4,65)

SET IDENTITY_INSERT [dbo].[Patient] OFF
GO

USE [Hospital]
GO

SET IDENTITY_INSERT [dbo].[Medication] ON


INSERT INTO [dbo].[Medication] ([Id],[PatientId],[Name],[Dose],[StartDate],[StopDate]) VALUES (1,1,'morphine','20mg','10/10/15',null)
INSERT INTO [dbo].[Medication] ([Id],[PatientId],[Name],[Dose],[StartDate],[StopDate]) VALUES (2,1,'acetaminophen','325mg','10/11/15','10/14/15')
INSERT INTO [dbo].[Medication] ([Id],[PatientId],[Name],[Dose],[StartDate],[StopDate]) VALUES (3,1,'furosemide','40mg','10/31/15',null)

INSERT INTO [dbo].[Medication] ([Id],[PatientId],[Name],[Dose],[StartDate],[StopDate]) VALUES (4,2,'morphine','10mg','11/11/15',null)
INSERT INTO [dbo].[Medication] ([Id],[PatientId],[Name],[Dose],[StartDate],[StopDate]) VALUES (5,2,'advil','600mg','11/12/15','10/14/15')



SET IDENTITY_INSERT [dbo].[Medication] OFF