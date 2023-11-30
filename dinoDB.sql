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
    (Activity_ID			INT				NOT NULL		AUTO_INCREMENT,
	Name				    VARCHAR(200)	NOT NULL,
	Type					VARCHAR(50)		NOT NULL,
	Description			    VARCHAR(1000),
	Fee				        INT				DEFAULT 0,
	Schedule			    VARCHAR(50),
	InterviewRequired		VARCHAR(15)		DEFAULT 'No',
	ApplicationRequired		VARCHAR(15)		DEFAULT 'No',
	WeekCommitmentHour	    INT				DEFAULT 0,
	Faculty_Name			VARCHAR(15),
	Img_file_path			VARCHAR(3000)	NOT NULL,
	PRIMARY KEY(Activity_ID),
	FOREIGN KEY(Faculty_Name) REFERENCES FACULTY(Name) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE CLUB
	(Activity_ID			INT				NOT NULL,
	Discord			        VARCHAR(512),
	Instagram			    VARCHAR(512),
	PRIMARY KEY(Activity_ID),
	FOREIGN KEY(Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE	ON UPDATE CASCADE);

CREATE TABLE ACTIVITY_EXEC
	(UCID				    CHAR(9)			NOT NULL,
	PositionName			VARCHAR(50)		DEFAULT 'Exec',
	Activity_ID			    INT				NOT NULL,
	PRIMARY KEY (UCID, Activity_ID),
	FOREIGN KEY (UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE MEMBER_OF
    (Club_ID				INT				NOT NULL,
	Member_UCID			    CHAR(9)			NOT NULL,
	PRIMARY KEY (Club_ID, Member_UCID),
	FOREIGN KEY (Club_ID) REFERENCES CLUB(Activity_ID) ON UPDATE CASCADE,
	FOREIGN KEY (Member_UCID) REFERENCES STUDENT(UCID) ON UPDATE CASCADE);

CREATE TABLE VOLUNTEERING_OPPORTUNITY
    (Activity_ID			INT			NOT NULL,
	Location				VARCHAR(15),
	PRIMARY KEY (Activity_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE VOLUNTEERS
    (Volunteer_ID			INT				NOT NULL,
	Student_UCID			CHAR(9)			NOT NULL,
	PRIMARY KEY (Volunteer_ID, Student_UCID),
	FOREIGN KEY (Volunteer_ID) REFERENCES VOLUNTEERING_OPPORTUNITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE PROGRAM
    (Activity_ID		    INT				NOT NULL,
	Website				    VARCHAR(512),
	PRIMARY KEY (Activity_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE PART_OF
	(Program_ID				INT				NOT NULL,
	Student_UCID			CHAR(9)			NOT NULL,
	PRIMARY KEY (Program_ID, Student_UCID),
	FOREIGN KEY (Program_ID) REFERENCES PROGRAM(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE EXTRACURRICULAR_ACTIVITY_PERKS
    (Activity_ID			INT				NOT NULL,
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
    (Activity_ID			INT				NOT NULL,
	Name					VARCHAR(50)		NOT NULL,
	Description				VARCHAR(250),
	Type					VARCHAR(50),
	Location				VARCHAR(50),
	OnlineInPerson			VARCHAR(50),
	SignUpInfo				VARCHAR(255),
	Perks					VARCHAR(255),
	Fee						INT				DEFAULT 0,
	Eligibility				VARCHAR(255),
	Date_and_Time			DATETIME,
	PRIMARY KEY (Activity_ID, Name),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE ANNOUNCEMENT
    (Activity_ID			INT				NOT NULL,
	Title					VARCHAR(50)		NOT NULL,
	Announcement			VARCHAR(512)	NOT NULL,
	Author					VARCHAR(30),
	Date					DATETIME,
	PRIMARY KEY (Activity_ID, Title),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE ATTENDS
    (Student_UCID			CHAR(9)			NOT NULL,
    Activity_ID				INT				NOT NULL,
	Event_Name				VARCHAR(50)		NOT NULL,
	Sign_Up				    INT				DEFAULT 0,
	PRIMARY KEY (Student_UCID, Event_Name),
	FOREIGN KEY (Student_UCID) REFERENCES STUDENT(UCID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Activity_ID, Event_Name) REFERENCES EVENT(Activity_ID, Name) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE ANNOUNCED_BY
    (Event_ID				INT				NOT NULL,
    Announcement_ID			INT				NOT NULL,
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
    (Supervisor_ID			INT				NOT NULL	AUTO_INCREMENT,
	FName				    VARCHAR(15)		NOT NULL,
    LName					VARCHAR(15)		NOT NULL,
	Email					VARCHAR(255)	NOT NULL,
	Password				VARCHAR(255)	NOT NULL,
	PRIMARY KEY (Supervisor_ID));

CREATE TABLE CATEGORIZED_BY
    (Activity_ID			INT				NOT NULL,
	Tag_ID					CHAR(9)			NOT NULL,
	PRIMARY KEY (Activity_ID, Tag_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Tag_ID) REFERENCES TAG(Tag_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE INVITES
    (Activity_ID			INT				NOT NULL,
	Org_ID					CHAR(9)			NOT NULL,
	PRIMARY KEY (Activity_ID, Org_ID),
	FOREIGN KEY (Activity_ID) REFERENCES EXTRACURRICULAR_ACTIVITY(Activity_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Org_ID) REFERENCES ORGANIZATION(Org_ID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE SUPERVISED_BY
    (Activity_ID			INT				NOT NULL,
	Supervisor_ID			INT				NOT NULL,
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
('789456123', '1998-11-30', 'Interested in history', 'Sarah', 'Williams', 'sarah.williams@ucalgary.ca', 'password123', 'STUDENT'),
('1', '1998-11-30', 'Admin', 'Admin', 'Admin', 'Admin', '123', 'EXECUTIVE');

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
('Administration'),
('Education');

INSERT INTO EXTRACURRICULAR_ACTIVITY (Activity_ID, Name, Type, Description, Fee, Schedule, InterviewRequired, ApplicationRequired, WeekCommitmentHour, Faculty_Name, Img_file_path)
VALUES 
('1', 'University of Calgary Chess Club', 'club', 'The UCCC is geared towards promoting the sport of chess among all demographics, from beginner to master. Our objective is to assist fellow enthusiasts and players to hone their chess skills and continue to reach new peaks of excellence.', 10, 'Tuesday and Thursdays @ 4:00 PM', 'No', 'Yes', 4, 'Science', 'https://se-images.campuslabs.ca/clink/images/e94e8587-1350-42d4-837d-0d174a7858fe23c0644c-2456-4f7d-b5ef-c87f21acd31d.jpg?preset=med-sq'),
('2', 'Competitive Programming Club', 'club', 'The CPC recruits and trains students to represent the University of Calgary at the ACM International Collegiate Programming Contest. It also organizes programming contest events at the University of Calgary and provides students with an outlet and opportunity to pursue knowledge of computer science and mathematics beyond that which is available in class. Lastly, it serves also as a social gathering hub for people interested in computer science in general.', 0, 'Mondays @ 5:00 PM', 'No', 'No', 4, 'Engineering', 'https://se-images.campuslabs.ca/clink/images/7d17aabb-3f2a-49d7-98b9-304d795f1f92bcaf4cac-1b93-445f-b39c-35009aa5b6c8.png?preset=med-sq'),
('3', 'The Information Security Club', 'club', 'The Information Security Club focuses on helping students explore and develop information security and cybersecurity related skills.  One of the ultimate goals of the club will be to have students compete in Capture The Flag (CTF - “hacking”) competitions.', 5, '17:00', 'No', 'No', 2, 'Engineering', 'https://se-images.campuslabs.ca/clink/images/ea19a71e-7813-4f29-8887-76ec1618323a5a54d7a2-cc41-4dbd-afc9-01db9339e842.png?preset=med-sq'),
('4', 'Debate Society, UofC', 'club', 'The University of Calgary Debate Society (UCDS) provides students with the opportunity to develop public speaking and critical thinking skills through various formats of debate. At the UCDS, we strive to help students develop these skills as they can be applied to their areas of study as well as help them succeed in competitive tournaments. There are opportunities to compete both domestically and internationally at tournaments hosted by numerous universities including the UCDS.', 10, 'Fridays @ 5:00 PM', 'No', 'No', 2, 'Science', 'https://se-images.campuslabs.ca/clink/images/b40aec00-9aab-4a10-8c98-04e1c6f23c7a4c70104a-cfd2-4f55-89c0-ad00ff369a7e.PNG?preset=med-sq'),
('5', 'K-Pop Learn It Together', 'club', 'K-pop Learn it Together (K-LiT) is a dance club in the University of Calgary that aims to foster a sense of community and acts as a means for students to cultivate friendships with others who share similar interests. There will be no experience requirements, as a variety of k-pop dances from multiple diverse groups will be taught by fellow students and our VPs.', 5, 'Every other Wednesday @ 6:00 PM', 'No', 'No', 2, 'Arts', 'https://se-images.campuslabs.ca/clink/images/35247248-b55b-488b-ad5a-29bc6c1dd9fe90b7a708-163a-4aac-abed-57c329f8db5a.png?preset=med-sq'),
('6', 'Board Games Club', 'club', 'The BGC aims to provide regular, weekly events for members to meet and experience the warmth and interpersonal connections fostered by board gaming. Board games offer a unique experience distinct from video games, or even tabletop games or trading card games.', 5, 'Fridays @ 6:00 PM', 'No', 'No', 0, 'Arts', 'https://static.vecteezy.com/system/resources/previews/006/404/900/original/board-game-logo-free-vector.jpg'),
('7', 'Administrative Volunteer Program', 'volunteer', 'It can be difficult to make the transition from being a student to working full-time. While you may have excelled in academics, many employers require proven experience in an office setting. You can gain professional office experience by being part of our Administrative Volunteer Program. You’ll get practical, on-the-job training in a variety of areas, including file management, customer service and event planning by assisting in the Volunteer Services Office.', 0, 'Tuesday and Thursdays @ 4:00 PM', 'Yes', 'Yes', 2, 'Administration', 'https://www.ucalgary.ca/sites/default/files/styles/ucws_image_desktop/public/2019-09/UCalgary_Vertical_logo_colour_1.jpg?h=55272f2a&itok=PrLMnGHO'),
('8', 'Campus Food Bank', 'volunteer', 'The SU Campus Food Bank provides emergency food relief to members of our campus community. Since its inception in 1993, the Food Bank has become a major resource for those in need and we are always looking for volunteers to help us meet the demand. By volunteering with the Food Bank you’ll gain practical, operational experience by organizing donations, stocking shelves, packing hampers, interviewing clients and organizing food drive events, all without ever leaving campus!', 0, 'Mondays and Fridays @ 3:00 PM', 'Yes', 'Yes', 2, 'Administration', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742'),
('9', 'Information Centre/Lost and Found', 'volunteer', 'Are you a people person? Do you enjoy assisting others and providing information to campus visitors? When you volunteer at the Information Centre/Lost and Found, you’ll answer all kinds of questions from students, staff and visitors to the MacEwan Student Centre. You’ll also manage our lost and found service and keep the Information Centre updated with information on events and services. If you’re looking for a volunteer experience that fits between your class schedule, this program is perfect for you!', 0, 'Every other Friday @ 7:00 PM', 'Yes', 'Yes', 2, 'Administration', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742'),
('10', 'Q Centre Volunteering', 'volunteer', 'Are you interested in helping create and maintain a safe and engaging space for the LGBTQA+ community on campus? Q Centre volunteers are the heart of our programming and can focus their work on peer support and conflict resolution, organizing outreach events and host discussion groups, or managing social media.', 0, 'Weekly @ 2:00 PM', 'Yes', 'Yes', 2, 'Administration', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742'),
('11', 'Students for Literacy', 'volunteer', 'Looking to make a difference on campus while developing your teaching skills? Help an adult (either a new Canadian or an adult with disabilities) learn English with Students for Literacy. We train and match you with a learner with whom you will work throughout the academic year. Volunteering with this challenging program may just be one of the most rewarding experiences of your university career. Students for Literacy volunteers meet with their learners at mutually convenient times. Volunteers must commit one to three hours per week (including prep-time) throughout the academic year (September to April). Students from all faculties, not just from English and Education, are welcome to apply!', 0, 'Weekly @ 12:00 PM', 'Yes', 'Yes', 4, 'Business', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742'),
('12', 'Volunteer Tax Program', 'volunteer', 'The Volunteer Tax Program takes place during tax season (February-April). Volunteers of this program assist members of the campus community complete their tax returns. Volunteers are trained by the Canada Revenue Agency. They also get to work one-on-one with actual clients and gain valuable skills to put on their resumes. Each volunteer will receive a certificate from the Canada Revenue Agency at the end of tax season to recognize their efforts.', 0, 'Monthly @ 1:30 PM', 'No', 'Yes', 4, 'Business', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742'),
('13', 'Science Mentorship Program', 'program', 'The Science Mentorship Program (SMP) facilitates peer-to-peer undergraduate mentoring opportunities by matching first- and second-year students with more experienced Science students in third year or above. Mentees shape their learning journey with support from a senior undergraduate student, and Mentors develop leadership skills while sharing their experiences and insights.', 0, 'Monthly', 'No', 'Yes', 0, 'Science', 'https://pbs.twimg.com/profile_images/1225544709294059520/e6MzSKR3_400x400.jpg'),
('14', 'Science Internship Program', 'program', 'The Science Internship Program offers Science students the opportunity to participate in 8 to 16 consecutive months of work experience.', 0, 'N/A', 'No', 'Yes', 0, 'Science', 'https://pbs.twimg.com/profile_images/1225544709294059520/e6MzSKR3_400x400.jpg'),
('15', 'SU Tutor Registry', 'program', 'Struggling with your course work? Need assistance preparing for an exam? Your SU has developed a searchable database of independent tutors that are here to help you in a wide range of subjects. The Tutors listed on the SU Tutor Registry are current or past students of the University of Calgary who provide independent services as Tutors.', 0, 'N/A', 'Yes', 'Yes', 0, 'Administration', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742'),
('16', 'Safewalk', 'program', 'The Safewalk service is provided through Campus Security, 24-7. Safewalk volunteers walk people safely to their destinations on campus. This service is free and available to students, staff and campus visitors for destinations anywhere on campus including McMahon Stadium, Health Sciences, Student Family Housing, the Alberta Children’s Hospital and the University C-Train station. Safewalks are done in male/female pairs.', 0, 'N/A', 'No', 'No', 0, 'Administration', 'https://assets.nationbuilder.com/casaacae/pages/1021/meta_images/original/UofC-StudentUnion.png?1535691742');

INSERT INTO EVENT (Activity_ID, Name, Description, Type, Location, OnlineInPerson, SignUpInfo, Perks, Fee, Eligibility, Date_and_Time)
VALUES
('5', 'K-LIT Meet & Greet', 'Come and meet the whole crew at K-LIT! There will be pizza and drinks and many icebreaker games!', 'event', 'SB 122', 'In Person', 'Check our instagram for sign up!', 'Free pizza and drinks', 0, 'Anyone can join', '2023-09-20 18:00:00'),
('6', 'Card Game Pizza Night', 'Our annual card game and pizza night is happening at The Board Games Club! Come and join us!', 'event', 'MSC 125', 'In Person', 'Check discord for sign up', 'Fee pizza and drinks!', 5, 'Must have paid the club fee to join', '2023-12-05 16:00:00'),
('8', 'Food Bank Donation Run', 'Join us for our monthly food bank donation run!', 'event', 'MSC Event Centre', 'In Person', 'No sign-up needed', 'Free t-shirt', 0, 'Anyone can join', '2023-12-08 17:00:00'),
('4', 'Debate Night!', 'Our weekly debate night is happening this Friday, join to participate or watch.', 'event', 'TFDL 550', 'In Person', 'Check discord for sign-up sheet', 'N/A', 0, 'Exclusive to club members', '2023-11-24 17:00:00');

INSERT INTO PROGRAM (Activity_ID, Website)
VALUES
('13', 'https://science.ucalgary.ca/current-students/undergraduate/student-experience/science-mentorship-program'),
('14', 'https://science.ucalgary.ca/current-students/science-internship-program'),
('15', 'https://www.su.ucalgary.ca/tutor-registry/'),
('16', 'https://www.ucalgary.ca/risk/campus-security/your-safety/safewalk');

INSERT INTO CLUB (Activity_ID, Discord, Instagram)
VALUES 
('1', 'https://discord.gg/chessclub', '@chessclub'),
('2', 'https://discord.gg/roboticsclub', '@roboticsclub'),
('3', 'https://discord.gg/hikingclub', '@hikingclub'),
('4', 'https://discord.gg/debateteam', '@debateteam'),
('5', 'https://discord.gg/startupclub', '@startupclub'),
('6', 'https://discord.gg/QNtecrqNzv', 'https://www.instagram.com/ucboardgames/');

INSERT INTO ACTIVITY_EXEC (UCID, PositionName, Activity_ID)
VALUES 
('123456789', 'President', '1'),
('987654321', 'Vice President', '2'),
('456123789', 'Treasurer', '3'),
('321654987', 'Secretary', '4'),
('789456123', 'Event Coordinator', '5'),
('1', 'Executive', '1'),
('1', 'Executive', '2'),
('1', 'Executive', '3'),
('1', 'Executive', '4'),
('1', 'Executive', '5'),
('1', 'Executive', '7'),
('1', 'Executive', '8'),
('1', 'Executive', '9'),
('1', 'Executive', '10'),
('1', 'Executive', '11'),
('1', 'Executive', '13'),
('1', 'Executive', '14'),
('1', 'Executive', '15');

INSERT INTO MEMBER_OF (Club_ID, Member_UCID)
VALUES 
('1', '123456789'),
('2', '987654321'),
('3', '456123789'),
('4', '321654987'),
('6', '789456123'),
('5', '789456123'),
('4', '789456123'),
('3', '789456123'),
('2', '789456123'),
('1', '789456123');

INSERT INTO VOLUNTEERING_OPPORTUNITY (Activity_ID, Location)
VALUES
('7', 'MSC 225'),
('8', 'MSC 225'),
('9', 'MacEwan Centre'),
('10', 'MSC 210'),
('11', 'ESL Station'),
('12', 'MSC 130');

INSERT INTO EXTRACURRICULAR_ACTIVITY_PERKS (Activity_ID, Perk)
VALUES 
('1', 'Free Chess Set'),
('2', 'Learn career defining skills! (we have no perks)'),
('3', 'N/A'),
('4', 'Public Speaking Workshops'),
('5', 'Free pizza every meet!'),
('6', 'Free food at every meet, and countless of board games available for rental'),
('7', '$10 UniCard funds to spend at UCalgary stores!'),
('8', '$10 UniCard funds to spend at UCalgary stores!'),
('9', '$10 UniCard funds to spend at UCalgary stores!'),
('10', '$10 UniCard funds to spend at UCalgary stores!'),
('11', '$10 UniCard funds to spend at UCalgary stores!'),
('12', '$10 UniCard funds to spend at UCalgary stores!'),
('13', '$10 UniCard funds to spend at UCalgary stores!'),
('14', 'Free LinkedIn training session!'),
('15', 'Free subscription to Kumon'),
('16', 'Invitation to our monthly pizza party!');

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
	('000000012', 'Coding'),
	('000000013', 'Literary'),
	('000000014', 'Music and Performing Arts'),
	('000000015', 'Health and Wellness'),
	('000000017', 'Food and Cooking'),
	('000000018', 'Advocacy and Social Issues'),
	('000000019', 'Leadership'),
	('000000020', 'Gaming');

INSERT INTO CATEGORIZED_BY
VALUES
	('1', '000000006'),
	('2', '000000004'),
	('3', '000000012'),
	('4', '000000019'),
	('5', '000000002'),
	('6', '000000002'),
	('7', '000000001'),
	('8', '000000009'),
	('9', '000000009'),
	('10', '000000009'),
	('11', '000000018'),
	('12', '000000019'),
	('13', '000000009'),
	('14', '000000009'),
	('15', '000000001'),
	('16', '000000018');

INSERT INTO ANNOUNCEMENT
VALUES
	(1, 'Welcome to Chess Club!', 'Welcome!', 'John Doe', '2023-11-30 05:27:52'),
	(2, 'Test Announcement', 'This is a test announcement!', 'Michael Brown', '2023-11-30 05:27:52')