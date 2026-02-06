export type Alumni = {
  id: string;
  name: string;
  avatarUrl: string;
  course: string;
  graduationYear: number;
  company: string;
  jobTitle: string;
  location: string;
};

export type Post = {
  id: string;
  author: Pick<Alumni, 'id' | 'name' | 'avatarUrl' | 'jobTitle' | 'company' | 'graduationYear'>;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
};

export type Memory = {
    id: string;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
};

export type WisdomStory = {
    id: string;
    alumniId: string;
    topic: string;
    originalStory: string;
};

export const alumniData: Alumni[] = [
  {
    id: '1',
    name: 'Jane Doe',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    course: 'Computer Science',
    graduationYear: 2018,
    company: 'Innovate Inc.',
    jobTitle: 'Senior Software Engineer',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'John Smith',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    course: 'Business Administration',
    graduationYear: 2016,
    company: 'Solutions Corp.',
    jobTitle: 'Product Manager',
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    course: 'Mechanical Engineering',
    graduationYear: 2020,
    company: 'BuildIt',
    jobTitle: 'Mechanical Engineer',
    location: 'Austin, TX',
  },
  {
    id: '4',
    name: 'Emily Williams',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    course: 'Graphic Design',
    graduationYear: 2018,
    company: 'Creative Co.',
    jobTitle: 'Lead Designer',
    location: 'Los Angeles, CA',
  },
  {
    id: '5',
    name: 'Michael Brown',
    avatarUrl: 'https://picsum.photos/seed/avatar5/100/100',
    course: 'Economics',
    graduationYear: 2015,
    company: 'Capital Investments',
    jobTitle: 'Financial Analyst',
    location: 'Chicago, IL',
  },
  {
    id: '6',
    name: 'Sarah Miller',
    avatarUrl: 'https://picsum.photos/seed/avatar6/100/100',
    course: 'Marketing',
    graduationYear: 2021,
    company: 'AdZing',
    jobTitle: 'Marketing Coordinator',
    location: 'Bangalore, IN',
  },
];

export const postsData: Post[] = [
  {
    id: 'p1',
    author: {
      id: '1',
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
      jobTitle: 'Senior Software Engineer',
      company: 'Innovate Inc.',
      graduationYear: 2018,
    },
    content: 'Excited to share that our team at Innovate Inc. just launched a new product! It has been an incredible journey. Grateful for the solid foundation I got from my time at the university. #Tech #ProductLaunch',
    timestamp: '2h ago',
    likes: 125,
    comments: 18,
  },
  {
    id: 'p2',
    author: {
        id: '100',
        name: 'Legacy University',
        avatarUrl: 'https://picsum.photos/seed/college/100/100',
        jobTitle: 'Alumni Relations',
        company: 'Legacy University',
        graduationYear: 0
    },
    content: 'Join us for the annual alumni homecoming event next month! We have a fun-filled weekend planned with networking sessions, campus tours, and a gala dinner. Register now to reconnect with old friends and faculty!',
    image: 'https://picsum.photos/seed/postImg1/800/400',
    timestamp: '1d ago',
    likes: 450,
    comments: 72,
  },
  {
    id: 'p3',
    author: {
      id: '2',
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
      jobTitle: 'Product Manager',
      company: 'Solutions Corp.',
      graduationYear: 2016,
    },
    content: 'Currently hiring for a junior product manager role at Solutions Corp. in New York. If you are a recent grad with a passion for building great products, feel free to reach out. Happy to refer fellow alums!',
    timestamp: '3d ago',
    likes: 230,
    comments: 45,
  },
  {
    id: 'p4',
    author: {
        id: '100',
        name: 'Legacy University',
        avatarUrl: 'https://picsum.photos/seed/college/100/100',
        jobTitle: 'Alumni Relations',
        company: 'Legacy University',
        graduationYear: 0
    },
    content: 'We are proud to announce the inauguration of the new Science and Engineering building on campus. This state-of-the-art facility will empower the next generation of innovators. A big thank you to all the alumni who contributed to this project.',
    image: 'https://picsum.photos/seed/postImg2/800/400',
    timestamp: '5d ago',
    likes: 890,
    comments: 150,
  }
];

export const memoriesData: Memory[] = [
    {
        id: "m1",
        title: "Tech Fest 2018",
        description: "The annual tech fest where your team's robotics project won second place.",
        date: "March 2018",
        imageUrl: "https://picsum.photos/seed/memory1/800/400"
    },
    {
        id: "m2",
        title: "Graduation Day",
        description: "The unforgettable day you graduated with a degree in Computer Science.",
        date: "May 2018",
        imageUrl: "https://picsum.photos/seed/memory2/800/400"
    },
    {
        id: "m3",
        title: "Cultural Night 2017",
        description: "A vibrant night of performances where you and your friends from the drama club put on a great show.",
        date: "September 2017",
        imageUrl: "https://picsum.photos/seed/memory3/800/400"
    }
];


export const wisdomStoriesData: WisdomStory[] = [
    {
        id: "w1",
        alumniId: "2",
        topic: "First Job Interview",
        originalStory: "I remember my first job interview like it was yesterday. I was so nervous, but I reminded myself of all the late nights I spent in the library and the challenging projects I completed. The interviewer asked a tough technical question, and for a moment, I blanked. Instead of panicking, I took a deep breath, broke the problem down, and walked them through my thought process. I didn't get the perfect answer, but showing them how I think got me the job. Don't just memorize answers; learn how to solve problems."
    },
    {
        id: "w2",
        alumniId: "4",
        topic: "Finding Your Passion",
        originalStory: "In my second year, I almost switched out of design. I felt my work wasn't good enough compared to my peers. But then I took a typography class just for fun, and I fell in love with it. It taught me that passion isn't always a lightning bolt; sometimes it's a quiet spark you have to nurture. I spent hours in the studio, just playing with letterforms. That 'fun' class became the foundation of my career as a designer. My advice? Explore everything, and don't be afraid to pursue what genuinely excites you, even if it's not on the main path."
    },
    {
        id: "w3",
        alumniId: "5",
        topic: "Networking",
        originalStory: "I used to think networking was just about collecting contacts. An alumni mixer in my final year changed my perspective. I met a senior analyst who didn't just give me his card; he asked me about my goals and gave me pointed advice. We stayed in touch, and he became a mentor. He's the reason I landed my internship. Networking isn't a numbers game. It's about building genuine relationships. Be curious about people's stories, and you'll build a network that truly supports you."
    }
]
