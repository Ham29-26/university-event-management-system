import { db } from "../tools/db.js";

db.exec(`
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS contacts;

    CREATE TABLE categories (
       category_id INTEGER PRIMARY KEY AUTOINCREMENT,
       category_name TEXT UNIQUE NOT NULL
    );


    CREATE TABLE events (
       event_id INTEGER PRIMARY KEY AUTOINCREMENT,
       category_id INTEGER NOT NULL,
       event_name TEXT NOT NULL,
       event_date TEXT NOT NULL,
       event_short_description TEXT NOT NULL,
       event_image_link TEXT NOT NULL,

       event_long_description TEXT NOT NULL,
       event_section1_title TEXT,
       event_section1_content TEXT,
       event_section2_title TEXT,
       event_section2_content TEXT,
       event_section3_title TEXT,
       event_section3_content TEXT,
       registration_deadline TEXT NOT NULL,

       event_start_time TEXT NOT NULL,
       event_end_time TEXT,
       event_location TEXT NOT NULL,

       FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );


    CREATE TABLE contacts (
       contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
       event_id INTEGER NOT NULL,
       contact_designation TEXT NOT NULL,
       contact_name TEXT NOT NULL,
       contact_email TEXT NOT NULL,
       contact_phone TEXT NOT NULL,

       FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
    );



    INSERT INTO categories (category_name) VALUES
    ('Sports'),
    ('Music'),
    ('Theatre'),
    ('Academic');


    INSERT INTO events (
   category_id,
   event_name,
   event_date,
   event_short_description,
   event_image_link,
   event_long_description,
   event_section1_title,
   event_section1_content,
   event_section2_title,
   event_section2_content,
   event_section3_title,
   event_section3_content,
   registration_deadline,
   event_start_time,
   event_end_time,
   event_location
) VALUES

-- ================= SPORTS =================

(1,
'Football Tryouts 2026',
'2026-02-20',
'Open tryouts for students wishing to join the university football squad for the upcoming season.',
'https://goccusports.com/images/2025/10/31/DSC04982.jpg',
'Ready to represent Imaginary University on the pitch? We''re inviting all students to take part in the official Football Tryouts for the 2026 season. This is your chance to showcase your skills, meet fellow players, and compete in inter-university tournaments and national collegiate leagues.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– A valid student ID is required on the day of tryouts.
– Previous competitive experience is welcome but not required.',
'Tryout Structure',
'Separate evaluation sessions will be held for the Men''s and Women''s teams. Players will be assessed on technical ability, tactical awareness, fitness, and teamwork in a supportive and competitive environment.',
'Tryout Locations',
'– Men''s Team: Main Football Ground (Pitch A) 
– Women''s Team: Secondary Football Ground (Pitch B)',
'2026-02-15',
'09:00', 
'12:00',
'University Main Football Ground'
),

(1,
'Campus Marathon 5K Run',
'2026-04-02',
'A fun and inclusive 5K marathon open to all students and staff.',
'https://www.eusa.eu/files/News/2014/cze_marathon-marathon.jpg',
'Lace up your running shoes and join us for the Campus Marathon 5K Run! This fun and inclusive event is open to all students and staff, whether you''re a seasoned runner or just looking to enjoy an active morning with the university community.',
'Who Can Participate?',
'– Open to all enrolled students and university staff.
– No prior running experience required.
– Participants must register in advance.',
'Route & Event Details',
'The 5K route will begin at the University Main Gate and follow a designated path around the campus perimeter and nearby park area. Water stations and first-aid support will be available along the route.',
'Participation Perks',
'– Official race bib
– Finisher certificate
– Light refreshments at the finish line',
'2026-03-28',
'07:00',
'09:30',
'Central City Square'
),

(1,
'Basketball Team Tryouts',
'2026-04-30',
'Open tryouts for students interested in joining the university basketball team.',
'https://images.sidearmdev.com/convert?url=https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/blinnc.sidearmsports.com/images/2025/2/9/Blinn_MBB_vs_Panola_2-1-25-27.JPG&type=webp',
'Calling all aspiring basketball players! Imaginary University invites students to join the official Basketball Team Tryouts for the 2026 season. Showcase your skills, meet fellow players, and compete in inter-university tournaments.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– Valid student ID required on the day of tryouts.
– Prior basketball experience is welcome but not required.',
'Tryout Structure',
'Separate sessions will be held for Men''s and Women''s teams. Players will be assessed on shooting, dribbling, teamwork, fitness, and court awareness in a supportive environment.',
'Tryout Locations',
'– Men''s Team: Main Basketball Court (Court A) 
– Women''s Team: Secondary Basketball Court (Court B)',
'2026-04-25',
'10:00',
'13:00',
'University Indoor Sports Complex'
),

-- ================= MUSIC =================

(2,
'Battle of the Bands',
'2026-03-10',
'Student bands compete live on stage for the title of Campus Band of the Year.',
'https://img.freepik.com/premium-photo/silhouetted-rock-band-performing-passionately-smoky-atmosphere_255669-27630.jpg?semt=ais_hybrid&w=740&q=80',
'Get ready for an electrifying night of live music as student bands take the stage to compete for the title of Campus Band of the Year. Whether you''re into rock, indie, pop, or fusion, this event celebrates talent, creativity, and pure stage energy.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– Bands must consist of at least 2 and no more than 6 members.
– At least one band member must be a current Imaginary University student.',
'Competition Format',
'Each band will perform a 10-15 minute live set, including at least one original composition. Performances will be evaluated by a panel of university faculty and guest music professionals based on musicality, stage presence, originality, and audience engagement.',
'Prizes',
'– Trophy for Campus Band of the Year
– Professional studio recording session
– Featured performance at the University Spring Festival',
'2026-03-05',
'18:00', 
'21:00',
'University Open Air Auditorium'
),

(2,
'Classical Music Performance Competition',
'2026-04-09',
'Showcase your classical music talent in a formal performance judged by faculty.',
'https://i0.wp.com/www.orartswatch.org/wp-content/uploads/2024/07/8D238F3B-1FA6-42EC-BE09-B331E0E2C67C.jpeg?w=1800&ssl=1',
'The University Music Department invites talented student musicians to participate in the Classical Music Performance Competition. This formal event provides an opportunity to showcase technical skill, musical interpretation, and stage presence in front of a distinguished panel of faculty judges.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– Solo performances only.
– Participants must perform a classical piece from a recognized composer.',
'Performance Guidelines',
'Each participant will perform one prepared classical composition (5-10 minutes in length). Performances may include piano, strings, woodwinds, brass, or classical vocal repertoire.',
'Judging Criteria',
'– Technical accuracy and control
– Musical expression and interpretation
– Stage confidence and presentation
– Overall artistic impact',
'2026-04-03',
'17:00',
null,
'Northbridge Conservatory Concert Hall'
),

(2,
'Campus Choir & Orchestra Festival',
'2026-05-15',
'An inter-university choir and orchestra festival celebrating classical and contemporary ensemble music.',
'https://music.ua.edu/wp-content/uploads/2025/05/Campus-Orchestra.png',
'Hosted at the Grand City Exhibition Centre, this large-scale music festival gathers university choirs and orchestras from across the region. Our university is honored to participate in this cultural showcase.',
'Participation Format',
'– Each ensemble will perform a 20-minute curated repertoire.
– Students may participate in choir, orchestra, or both.',
'Technical Requirements',
'– Sheet music must be submitted in advance for sound balancing and stage coordination.
– Instruments must be tuned and tested during rehearsal.',
'Additional Notes',
'– Conductors and ensemble leaders must attend the orientation session prior to the festival.
– Venue and performance slots will be shared one week before the event.',
'2026-05-08',
'16:00',
'19:00',
'Grand City Exhibition Centre'
),


-- ================= THEATRE =================

(3,
'Hamlet Auditions',
'2026-03-18',
'Auditions for the university spring production of Hamlet. Open to all drama enthusiasts.',
'https://media.istockphoto.com/id/1210331665/photo/theater-director-multicultural-actors-and-actress-rehearsing-on-stage.jpg?s=612x612&w=0&k=20&c=nC57yULDa3hRvPeJ4djvLL7TL5eyb_tJUlwqLRC9Sxk=',
'The University Theatre Society invites all aspiring actors, performers, and backstage enthusiasts to audition for our Spring 2026 production of William Shakespeare''s Hamlet. Whether you''re a seasoned performer or stepping onto the stage for the first time, this is your opportunity to be part of one of the most iconic plays in theatrical history.',
'Who Can Audition?',
'– Open to all enrolled undergraduate and postgraduate students.
– No prior acting experience required.
– Students interested in backstage or technical roles are also encouraged to apply.',
'Audition Format',
'Participants will perform a short prepared monologue (1-2 minutes). You may choose a Shakespearean piece or a monologue of your preference. A short cold-reading session from Hamlet will also be included.',
'Rehearsal Schedule',
'Rehearsals will begin in late March and will take place during weekday evenings. Full schedule details will be shared with selected cast members.',
'2026-03-14',
'16:00',
'18:00',
'University Drama Studio'
),

(3,
'Romeo and Juliet Auditions',
'2026-04-16',
'Auditions for the summer theatre production of Romeo and Juliet.',
'https://thumbs.dreamstime.com/b/man-women-hold-paper-rehearsing-theater-stock-photo-man-woman-hold-paper-rehearsing-theater-320455590.jpg',
'The University Theatre Society invites all aspiring actors to audition for the summer production of Romeo and Juliet. Show off your acting skills, creativity, and passion for theatre!',
'Who Can Audition?',
'– Open to all enrolled undergraduate and postgraduate students.
– No prior acting experience required, but enthusiasm is a must!',
'Audition Format',
'Each participant will perform a short monologue or scene from the play. Group readings may also be conducted to assess ensemble work and chemistry.',
'Rehearsal Schedule',
'Rehearsals will begin in late April and will take place during weekday evenings. Full schedule details will be shared with selected cast members.',
'2026-04-12',
'17:00', 
'19:00',
'University Main Theatre Hall'
),

(3,
'University Talent Showcase',
'2026-05-08',
'A campus-wide talent showcase featuring drama, monologues, and creative performance.',
'https://img.freepik.com/premium-photo/performer-standing-alone-stage-concert-lighting_1039669-10176.jpg?w=360',
'Step into the spotlight! The University Talent Showcase invites students from all disciplines to perform and showcase their creative talents, including drama, monologues, music, and other performance arts.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– Participants must register before the deadline to secure a slot.
– No prior performance experience required — enthusiasm and creativity are key!',
'Showcase Details',
'Performances will be presented on the University Auditorium stage. Each participant or group will have 5-10 minutes to present their act.',
'What to Bring / Prepare',
'– Any props or instruments needed for your act.
– Appropriate attire for your performance.
– Confidence and a positive attitude!',
'2026-05-03',
'18:30',
'20:00',
'University Cultural Centre Auditorium'
),

-- ================= ACADEMIC =================

(4,
'University Debate Championship',
'2026-02-28',
'Compete in a structured debate on university-announced topics and showcase your critical thinking skills.',
'https://edge.ua.edu/wp-content/uploads/2016/05/Debate.jpg',
'Sharpen your public speaking and analytical skills by competing in the University Debate Championship. Participants will engage in structured debates on topics announced by the university, judged by faculty and guest experts.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– Teams of 2-4 participants.
– Prior debate experience is helpful but not required.',
'Format',
'Debates will follow the British Parliamentary style. Teams will be assigned sides randomly, and will have 15 minutes preparation time for each round. Rounds will include preliminary, semi-final, and final stages.',
NULL,
NULL,
'2026-02-23',
'15:00',
'18:00',
'American University Dubai Conference Hall'
),

(4,
'24-Hour Hackathon',
'2026-03-25',
'Collaborate, code, and innovate in this intense 24-hour software development challenge.',
'https://ideascale.com/wp-content/uploads/2024/09/What-is-a-Hackathon.png',
'Ready to build something amazing in just 24 hours? Join the University Hackathon and collaborate with fellow innovators to design, develop, and present a creative tech solution. Whether you''re a coder, designer, or problem-solver, this is your chance to turn ideas into reality.',
'Eligibility / Team Requirements',
'– Teams of 3–5 members.
– Participants should have basic coding or design skills.',
'Judging Criteria',
'– Innovation and creativity
– Technical implementation
– Practical impact and feasibility
– Presentation and teamwork',
NULL,
NULL,
'2026-03-20',
'9:00',
'9:00',
'TechSphere Institute Innovation Lab'
),

(4,
'Model United Nations Conference',
'2026-04-23',
'Represent countries and debate global issues in this simulated UN conference.',
'https://iibuffalo.org/wp-content/uploads/2023/03/Model-UN-MAIN-scaled-1.jpg',
'Step into the shoes of global diplomats and participate in the University''s Model United Nations (MUN) Conference. Represent assigned countries, debate pressing international issues, and hone your diplomacy, negotiation, and public speaking skills.',
'Eligibility',
'– Open to all enrolled undergraduate and postgraduate students.
– No prior Model UN experience required, but enthusiasm for global affairs is encouraged.',
'Conference Structure',
'Each participant will be assigned a country by the university. Seats are limited to ensure one delegate per country, so early registration is recommended. Students will prepare and present policy positions, participate in committee debates, and work collaboratively to draft resolutions.',
NULL,
NULL,
'2026-04-18',
'10:00',
'16:00',
'Westbridge University Convention Centre'
);


INSERT INTO contacts (
    event_id,
    contact_designation,
    contact_name,
    contact_email,
    contact_phone
) VALUES

-- ================= SPORTS =================

-- 1 Football Tryouts
(1, '⚽ Men''s Football Team Coach', 'Daniel Carter', 'daniel.carter@university.edu', '+971502101001'),
(1, '⚽ Women''s Football Team Coach', 'Sophia Martinez', 'sophia.martinez@university.edu', '+971562101002'),

-- 2 Campus Marathon
(2, '🏃‍♂️ Event Coordinator', 'Liam Johnson', 'liam.johnson@citysports.org', '+971563202001'),

-- 3 Basketball Tryouts
(3, '🏀 Men''s Basketball Team Coach', 'Marcus Reynolds', 'marcus.reynolds@university.edu', '+971552103001'),
(3, '🏀 Women''s Basketball Team Coach', 'Emily Foster', 'emily.foster@university.edu', '+971582103002'),

-- ================= MUSIC =================

-- 4 Battle of the Bands
(4, '🎸 Music Club President', 'Aiden Brooks', 'aiden.brooks@university.edu', '+971554104001'),

-- 5 Classical Music Competition
(5, '🎻 Faculty Music Director', 'Dr. Isabella Clarke', 'isabella.clarke@northbridge.edu', '+971565105001'),

-- 6 Choir & Orchestra Festival
(6, '🎼 Festival Coordinator', 'Oliver Bennett', 'oliver.bennett@grandexpo.org', '+971556106001'),
(6, '🎤 Ensemble Liaison Officer', 'Charlotte Hayes', 'charlotte.hayes@university.edu', '+971586106002'),

-- ================= THEATRE =================

-- 7 Hamlet Auditions
(7, '🎭 Drama Society Director', 'Nathan Collins', 'nathan.collins@university.edu', '+971587107001'),

-- 8 Romeo & Juliet
(8, '🎭 Theatre Production Manager', 'Grace Mitchell', 'grace.mitchell@university.edu', '+971557208001'),

-- 9 Talent Showcase
(9, '🌟 Cultural Events Coordinator', 'Lucas Anderson', 'lucas.anderson@university.edu', '+971507309001'),

-- ================= ACADEMIC =================

-- 10 Debate Championship
(10, '🗣 Debate Society Chair', 'Benjamin Wright', 'benjamin.wright@american-university.edu', '+971558101001'),

-- 11 Hackathon
(11, '💻 Technical Lead', 'Ethan Parker', 'ethan.parker@techsphere.edu', '+971588201101'),
(11, '🧠 Innovation Mentor', 'Dr. Maya Singh', 'maya.singh@techsphere.edu', '+971558201102'),

-- 12 Model UN
(12, '🌍 MUN Secretary-General', 'Hannah Lewis', 'hannah.lewis@westbridge.edu', '+971508301201');
`);
