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
	Name				    VARCHAR(200)	NOT NULL,
	Description			    VARCHAR(1000),
	Fee				        INT,
	Schedule			    TIME,
	InterviewRequired		VARCHAR(15)		DEFAULT 'No',
	ApplicationRequired		VARCHAR(15)		DEFAULT 'No',
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
	Tag_Name				VARCHAR(30)		NOT NULL,
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
('301789411', '2000-01-01', 'mmmm subway', 'lol', 'lol', 'lol', '222', 'STUDENT'),
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
('000001', 'University of Calgary Chess Club', 'The UCCC is geared towards promoting the sport of chess among all demographics, from beginner to master. Our objective is to assist fellow enthusiasts and players to hone their chess skills and continue to reach new peaks of excellence.', 10, '18:00', 'No', 'Yes', 4, 'Science', 'https://se-images.campuslabs.ca/clink/images/e94e8587-1350-42d4-837d-0d174a7858fe23c0644c-2456-4f7d-b5ef-c87f21acd31d.jpg?preset=med-sq'),
('000002', 'Competitive Programming Club', 'The CPC recruits and trains students to represent the University of Calgary at the ACM International Collegiate Programming Contest. It also organizes programming contest events at the University of Calgary and provides students with an outlet and opportunity to pursue knowledge of computer science and mathematics beyond that which is available in class. Lastly, it serves also as a social gathering hub for people interested in computer science in general.', 0, '18:00', 'No', 'No', 4, 'Engineering', 'https://se-images.campuslabs.ca/clink/images/7d17aabb-3f2a-49d7-98b9-304d795f1f92bcaf4cac-1b93-445f-b39c-35009aa5b6c8.png?preset=med-sq'),
('000003', 'The Information Security Club', 'The Information Security Club focuses on helping students explore and develop information security and cybersecurity related skills.  One of the ultimate goals of the club will be to have students compete in Capture The Flag (CTF - “hacking”) competitions.', 5, '17:00', 'No', 'No', 2, 'Engineering', 'https://se-images.campuslabs.ca/clink/images/ea19a71e-7813-4f29-8887-76ec1618323a5a54d7a2-cc41-4dbd-afc9-01db9339e842.png?preset=med-sq'),
('000004', 'Debate Society, UofC', 'The University of Calgary Debate Society (UCDS) provides students with the opportunity to develop public speaking and critical thinking skills through various formats of debate. At the UCDS, we strive to help students develop these skills as they can be applied to their areas of study as well as help them succeed in competitive tournaments. There are opportunities to compete both domestically and internationally at tournaments hosted by numerous universities including the UCDS.', 10, '17:00', 'No', 'No', 2, 'Science', 'https://se-images.campuslabs.ca/clink/images/b40aec00-9aab-4a10-8c98-04e1c6f23c7a4c70104a-cfd2-4f55-89c0-ad00ff369a7e.PNG?preset=med-sq'),
('000005', 'K-Pop Learn It Together', 'K-pop Learn it Together (K-LiT) is a dance club in the University of Calgary that aims to foster a sense of community and acts as a means for students to cultivate friendships with others who share similar interests. There will be no experience requirements, as a variety of k-pop dances from multiple diverse groups will be taught by fellow students and our VPs.', 5, '18:00', 'No', 'No', 2, 'Arts', 'https://se-images.campuslabs.ca/clink/images/35247248-b55b-488b-ad5a-29bc6c1dd9fe90b7a708-163a-4aac-abed-57c329f8db5a.png?preset=med-sq'),
('000006', 'Board Games Club', 'The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.', 5, '17:00', 'No', 'No', 0, 'Arts', 'https://static.vecteezy.com/system/resources/previews/006/404/900/original/board-game-logo-free-vector.jpg');

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

INSERT INTO TAG
VALUES
	('000000001', 'Academic'),
	('000000002', 'Arts'),
	('000000003', 'Recreation'),
	('000000004', 'Technology'),
	('000000006', 'Community'),
	('000000007', 'STEM'),
	('000000008', 'Cultural'),
	('000000009', 'Career Development'),
	('000000010', 'Computer Science'),
	('000000011', 'Software Engineering'),
	('000000012', 'Coding'),
	('000000013', 'Literary'),
	('000000014', 'Music and Performing Arts'),
	('000000015', 'Health and Wellness'),
	('000000016', 'Gym'),
	('000000017', 'Food and Cooking'),
	('000000018', 'Advocacy and Social Issues'),
	('000000019', 'Leadership'),
	('000000020', 'Gaming');

INSERT INTO CATEGORIZED_BY
VALUES
	('000001', '000000003'),
	('000001', '000000007'),
	('000001', '000000020'),
	('000001', '000000002'),
	('000001', '000000006'),
	('000002', '000000004'),
	('000002', '000000007'),
	('000002', '000000009'),
	('000002', '000000010'),
	('000002', '000000011'),
	('000002', '000000012'),
	('000003', '000000004'),
	('000003', '000000007'),
	('000003', '000000009'),
	('000003', '000000010'),
	('000003', '000000011'),
	('000003', '000000012'),
	('000004', '000000001'),
	('000004', '000000006'),
	('000004', '000000009'),
	('000004', '000000019'),
	('000005', '000000002'),
	('000005', '000000003'),
	('000005', '000000014'),
	('000005', '000000015'),
	('000006', '000000002'),
	('000006', '000000006'),
	('000006', '000000003');
