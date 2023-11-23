CREATE SCHEMA DINODB;

USE DINODB;

CREATE TABLE STUDENT
	(UCID				    CHAR(9)			    NOT NULL,
	Date_of_Birth		    DATE,
	Bio				        VARCHAR(150),
	FName			        VARCHAR(15)			NOT NULL,
	LName				    VARCHAR(15)			NOT NULL,
	Email				    VARCHAR(255)		NOT NULL,
	Password			    VARCHAR(255)		NOT NULL,
	AccountType			    VARCHAR(30)			DEFAULT 'Student',
	PRIMARY KEY (UCID));

CREATE TABLE CLUB_MEMBER
	(UCID				    CHAR(9)			NOT NULL,
	numOfMemberships		INT				DEFAULT 0,
    PRIMARY KEY (UCID),
	FOREIGN KEY (UCID) REFERENCES STUDENT (UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE FACULTY
	(Name				    VARCHAR(15)		NOT NULL,
	PRIMARY KEY(Name));

CREATE TABLE EXTRACURRICULAR_ACTIVITY
    (Activity_ID			CHAR(9)			NOT NULL,
	Name				    VARCHAR(80)		NOT NULL,
	Description			    VARCHAR(1000),
	Fee				        INT,
	Schedule			    TIME,
	InterviewRequired		INT				DEFAULT 0,
	ApplicationRequired		INT				DEFAULT 0,
	WeekCommitmentHour	    INT,
	Faculty_Name			VARCHAR(15),
	Img_file_path			VARCHAR(255)	NOT NULL,
	PRIMARY KEY(Activity_ID),
	FOREIGN KEY(Faculty_Name) REFERENCES FACULTY(Name) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE CLUB
	(Activity_ID			CHAR(9)			NOT NULL,
	Discord			        VARCHAR(512),
	Instagram			    VARCHAR(512),
	PRIMARY KEY(Activity_ID),
	FOREIGN KEY(Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE	ON UPDATE CASCADE);

CREATE TABLE CLUB_EXEC
	(UCID				    CHAR(9)			NOT NULL,
	PositionName			VARCHAR(50)		DEFAULT 'Exec',
	Club_ID			        CHAR(9)			NOT NULL,
	PRIMARY KEY (UCID, Club_ID),
	FOREIGN KEY (UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Club_ID) REFERENCES CLUB(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE MEMBER_OF
    (Club_ID				CHAR(9)			NOT NULL,
	Member_UCID			    CHAR(9)			NOT NULL,
	PRIMARY KEY (Club_ID, Member_UCID),
	FOREIGN KEY (Club_ID) REFERENCES CLUB(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Member_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE VOLUNTEERING_OPPORTUNITY
    (Activity_ID			CHAR(9)			NOT NULL,
	Location				VARCHAR(15),
	PRIMARY KEY (Activity_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE VOLUNTEERS
    (Volunteer_ID			CHAR(9)			NOT NULL,
	Student_UCID			CHAR(9)			NOT NULL,
	PRIMARY KEY (Volunteer_ID, Student_UCID),
	FOREIGN KEY (Volunteer_ID) REFERENCES VOLUNTEERING_OPPORTUNITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE PROGRAM
    (Activity_ID		    CHAR(9)			NOT NULL,
	Website				    VARCHAR(512),
	PRIMARY KEY (Activity_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE PART_OF
	(Program_ID				CHAR(9)			NOT NULL,
	Student_UCID			CHAR(9)			NOT NULL,
	PRIMARY KEY (Program_ID, Student_UCID),
	FOREIGN KEY (Program_ID) REFERENCES PROGRAM(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE EXTRACURRICULAR_ACTIVITY_PERKS
    (Activity_ID			CHAR(9)			NOT NULL,
	Perk					VARCHAR(255)	NOT NULL,
	PRIMARY KEY (Activity_ID, Perk),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE BELONGS
    (FacultyName			VARCHAR(15)		NOT NULL,
	Student_UCID			CHAR(9)			NOT NULL,
	PRIMARY KEY (FacultyName, Student_UCID),
	FOREIGN KEY (FacultyName) REFERENCES FACULTY(Name) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE EVENT
    (Activity_ID			CHAR(9)			NOT NULL,
	Name					VARCHAR(15)		NOT NULL,
	Description				VARCHAR(250),
	Type					VARCHAR(15),
	Location				VARCHAR(15),
	Date_and_Time			DATETIME,
	PRIMARY KEY (Activity_ID, Name),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE ANNOUNCEMENT
    (Activity_ID			CHAR(9)			NOT NULL,
	Title					VARCHAR(15)		NOT NULL,
	Announcement			VARCHAR(512)	NOT NULL,
	Author					VARCHAR(30),
	Date					DATETIME,
	PRIMARY KEY (Activity_ID, Title),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE ATTENDS
    (Student_UCID			CHAR(9)			NOT NULL,
    Activity_ID				CHAR(9)			NOT NULL,
	Event_Name				VARCHAR(15)		NOT NULL,
	Sign_Up				    INT				DEFAULT 0,
	PRIMARY KEY (Student_UCID, Event_Name),
	FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Activity_ID, Event_Name) REFERENCES EVENT(Activity_ID, Name) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE ANNOUNCED_BY
    (Event_ID				CHAR(9)			NOT NULL,
    Announcement_ID			CHAR(9)			NOT NULL,
    Event_Name				VARCHAR(15)		NOT NULL,
	Announcement_Title		VARCHAR(15)		NOT NULL,
	PRIMARY KEY (Event_Name, Announcement_Title),
    FOREIGN KEY (Event_ID, Event_Name) REFERENCES EVENT(Activity_ID, Name) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Announcement_ID, Announcement_Title) REFERENCES ANNOUNCEMENT(Activity_ID, Title) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE TAG
    (Tag_ID				    CHAR(9)			NOT NULL,
	Tag_Name				VARCHAR(15)		NOT NULL,
	PRIMARY KEY (Tag_ID));

CREATE TABLE ORGANIZATION
    (Org_ID				    CHAR(9)			NOT NULL,
	Org_Name				VARCHAR(15)		NOT NULL,
	PRIMARY KEY (Org_ID));

CREATE TABLE SUPERVISOR
    (Supervisor_ID			CHAR(9)			NOT NULL,
	FName				    VARCHAR(15)		NOT NULL,
    LName					VARCHAR(15)		NOT NULL,
	Email					VARCHAR(255)	NOT NULL,
	Password				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (Supervisor_ID));

CREATE TABLE CATEGORIZED_BY
    (Activity_ID			CHAR(9)			NOT NULL,
	Tag_ID					CHAR(9)			NOT NULL,
	PRIMARY KEY (Activity_ID, Tag_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Tag_ID) REFERENCES TAG(Tag_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE INVITES
    (Activity_ID			CHAR(9)			NOT NULL,
	Org_ID					CHAR(9)			NOT NULL,
	PRIMARY KEY (Activity_ID, Org_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Org_ID) REFERENCES ORGANIZATION(Org_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE SUPERVISED_BY
    (Activity_ID			CHAR(9)			NOT NULL,
	Supervisor_ID			CHAR(9)			NOT NULL,
	PRIMARY KEY (Activity_ID, Supervisor_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Supervisor_ID) REFERENCES SUPERVISOR(Supervisor_ID) ON DELETE CASCADE ON UPDATE CASCADE);

INSERT INTO STUDENT (UCID, Date_of_Birth, Bio, FName, LName, Email, Password, AccountType)
VALUES 
('123456789', '2000-01-01', 'Enthusiastic about technology', 'John', 'Doe', 'john.doe@ucalgary.ca', 'password123', 'STUDENT'),
('987654321', '1999-05-15', 'Loves outdoor activities', 'Jane', 'Smith', 'jane.smith@ucalgary.ca', 'password123', 'STUDENT'),
('456123789', '2002-03-22', 'Aspiring artist', 'Emily', 'Johnson', 'emily.johnson@ucalgary.ca', 'password123', 'STUDENT'),
('321654987', '2001-07-08', 'Passionate about music', 'Michael', 'Brown', 'michael.brown@ucalgary.ca', 'password123', 'STUDENT'),
('789456123', '1998-11-30', 'Interested in history', 'Sarah', 'Williams', 'sarah.williams@ucalgary.ca', 'password123', 'STUDENT');

INSERT INTO CLUB_MEMBER (UCID, numOfMemberships)
VALUES 
('123456789', 2),
('987654321', 3),
('456123789', 1),
('321654987', 4),
('789456123', 6);

INSERT INTO FACULTY (Name)
VALUES 
('Science'),
('Arts'),
('Engineering'),
('Business'),
('Education');

INSERT INTO EXTRACURRICULAR_ACTIVITY (Activity_ID, Name, Description, Fee, Schedule, InterviewRequired, ApplicationRequired, WeekCommitmentHour, Faculty_Name, Img_file_path)
VALUES 
('000001', 'Chess Club', 'Weekly chess meetings and tournaments', 20, '18:00', 0, 1, 2, 'Arts', '/images/chess.jpg'),
('000002', 'Robotics Club', 'Robotics competitions and workshops', 30, '17:00', 1, 1, 3, 'Engineering', '/images/robotics.jpg'),
('000003', 'Hiking Club', 'Explore local trails and nature', 0, '08:00', 0, 0, 4, 'Science', '/images/hiking.jpg'),
('000004', 'Debate Team', 'Competitive debate on various topics', 10, '19:00', 1, 1, 2, 'Arts', '/images/debate.jpg'),
('000005', 'Startup Club', 'Networking and startup development', 15, '16:00', 0, 1, 2, 'Business', '/images/startup.jpg'),
('000006', 'Board Games Club', 'The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.', 5, '17:00', 0, 0, 0, 'Arts', 'https://static.vecteezy.com/system/resources/previews/006/404/900/original/board-game-logo-free-vector.jpg');

INSERT INTO CLUB (Activity_ID, Discord, Instagram)
VALUES 
('000001', 'https://discord.gg/chessclub', '@chessclub'),
('000002', 'https://discord.gg/roboticsclub', '@roboticsclub'),
('000003', 'https://discord.gg/hikingclub', '@hikingclub'),
('000004', 'https://discord.gg/debateteam', '@debateteam'),
('000005', 'https://discord.gg/startupclub', '@startupclub'),
('000006', 'https://discord.gg/QNtecrqNzv', 'https://www.instagram.com/ucboardgames/');

INSERT INTO CLUB_EXEC (UCID, PositionName, Club_ID)
VALUES 
('123456789', 'President', '000001'),
('987654321', 'Vice President', '000002'),
('456123789', 'Treasurer', '000003'),
('321654987', 'Secretary', '000004'),
('789456123', 'Event Coordinator', '000005');

INSERT INTO MEMBER_OF (Club_ID, Member_UCID)
VALUES 
('000001', '123456789'),
('000002', '987654321'),
('000003', '456123789'),
('000004', '321654987'),
('000006', '789456123'),
('000005', '789456123'),
('000004', '789456123'),
('000003', '789456123'),
('000002', '789456123'),
('000001', '789456123');

-- INSERT INTO VOLUNTEERING_OPPORTUNITY (Activity_ID, Location)
-- VALUES 
-- ('VOL001', 'Community Center'),
-- ('VOL002', 'Local Park'),
-- ('VOL003', 'Animal Shelter'),
-- ('VOL004', 'Library'),
-- ('VOL005', 'Food Bank');

-- INSERT INTO VOLUNTEERS (Volunteer_ID, Student_UCID)
-- VALUES 
-- ('VOL001', '123456789'),
-- ('VOL002', '987654321'),
-- ('VOL003', '456123789'),
-- ('VOL004', '321654987'),
-- ('VOL005', '789456123');

-- INSERT INTO PROGRAM (Activity_ID, Website)
-- VALUES 
-- ('PRG001', 'https://www.program1.com'),
-- ('PRG002', 'https://www.program2.com'),
-- ('PRG003', 'https://www.program3.com'),
-- ('PRG004', 'https://www.program4.com'),
-- ('PRG005', 'https://www.program5.com');

-- INSERT INTO PART_OF (Program_ID, Student_UCID)
-- VALUES 
-- ('PRG001', '123456789'),
-- ('PRG002', '987654321'),
-- ('PRG003', '456123789'),
-- ('PRG004', '321654987'),
-- ('PRG005', '789456123');

INSERT INTO EXTRACURRICULAR_ACTIVITY_PERKS (Activity_ID, Perk)
VALUES 
('000001', 'Free Chess Set'),
('000002', 'Robotics Kit Discount'),
('000003', 'Hiking Gear Coupons'),
('000004', 'Public Speaking Workshops'),
('000005', 'Startup Funding Opportunities'),
('000006', 'Free food at every meet, and countless of board games available for rental');

INSERT INTO BELONGS (FacultyName, Student_UCID)
VALUES 
('Science', '123456789'),
('Arts', '987654321'),
('Engineering', '456123789'),
('Business', '321654987'),
('Education', '789456123');

-- INSERT INTO EVENT (Activity_ID, Name, Description, Type, Location, Date_and_Time)
-- VALUES 
-- ('EVT001', 'Tech Talk', 'Discussion on latest tech trends', 'Seminar', 'Auditorium', '2023-12-01 18:00:00'),
-- ('EVT002', 'Art Exhibition', 'Display of student artwork', 'Exhibition', 'Art Gallery', '2023-12-05 17:00:00'),
-- ('EVT003', 'Engineering Fair', 'Showcase of student projects', 'Fair', 'Engineering Hall', '2023-12-10 10:00:00'),
-- ('EVT004', 'Business Conference', 'Networking event for business students', 'Conference', 'Conference Center', '2023-12-15 09:00:00'),
-- ('EVT005', 'Education Workshop', 'Workshop on innovative teaching methods', 'Workshop', 'Lecture Hall', '2023-12-20 11:00:00');

-- INSERT INTO ANNOUNCEMENT (Activity_ID, Title, Announcement, Author, Date)
-- VALUES 
-- ('000001', 'Chess Tournament', 'Upcoming chess tournament this Saturday.', 'John Doe', '2023-11-30'),
-- ('000002', 'Robotics Workshop', 'Join us for a robotics building workshop.', 'Jane Smith', '2023-12-01'),
-- ('000003', 'Trail Cleanup', 'Volunteers needed for trail cleanup event.', 'Emily Johnson', '2023-12-02'),
-- ('000004', 'Debate Topic', 'Next debate topic: Environmental Policies.', 'Michael Brown', '2023-12-03'),
-- ('000005', 'Startup Pitch', 'Startup pitch event next week. Register now!', 'Sarah Williams', '2023-12-04');

-- INSERT INTO ATTENDS (Student_UCID, Activity_ID, Event_Name, Sign_Up)
-- VALUES 
-- ('123456789', 'EVT001', 'Tech Talk', 1),
-- ('987654321', 'EVT002', 'Art Exhibition', 1),
-- ('456123789', 'EVT003', 'Engineering Fair', 1),
-- ('321654987', 'EVT004', 'Business Conference', 1),
-- ('789456123', 'EVT005', 'Education Workshop', 1);

-- INSERT INTO ANNOUNCED_BY (Event_ID, Announcement_ID, Event_Name, Announcement_Title)
-- VALUES 
-- ('EVT001', '000001', 'Tech Talk', 'Chess Tournament'),
-- ('EVT002', '000002', 'Art Exhibition', 'Robotics Workshop'),
-- ('EVT003', '000003', 'Engineering Fair', 'Trail Cleanup'),
-- ('EVT004', '000004', 'Business Conference', 'Debate Topic'),
-- ('EVT005', '000005', 'Education Workshop', 'Startup Pitch');

INSERT INTO TAG
VALUES
	('000000001', 'Academic'),
	('000000002', 'Arts'),
	('000000003', 'Recreation'),
	('000000004', 'Technology'),
	('000000005', 'Social'),
	('000000006', 'Community');

INSERT INTO CATEGORIZED_BY
VALUES
	('000006', '000000002'),
	('000006', '000000006'),
	('000006', '000000005'),
	('000006', '000000003');
