import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobHeader from "../../components/JobHeader/JobHeader";
import JobPreferences from "../../components/JobPreferences/JobPreferences";
import JobDescription from "../../components/JobDescription/JobDescription";
import JobBenefits from "../../components/JobBenefits/JobBenefits";
import JobSidebar from "../../components/JobSidebar/JobSidebar";
import ActionButtons from "../../components/ActionButtons/ActionButtons";

// Mock Database of Jobs expanded to support detailed specs
const DETAILED_JOBS = [
  {
    id: 1,
    date: "25 May, 2026",
    closingDate: "25 June, 2026",
    daysRemaining: 14,
    company: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    title: "Senior Product Designer",
    tags: ["Full Time", "Remote", "Design"],
    schedule: "Full Time",
    type: "Remote",
    salary: "$120,000/Yr",
    salaryVal: 120000,
    location: "San Francisco, CA",
    cardBg: "bg-[#E8F4FF]",
    isBookmarked: true,
    openPositions: 2,
    experienceRequired: "5+ Years",
    department: "Design",
    education: "Bachelor's of Design",
    prefGender: "Any",
    prefNationality: "Any / Global",
    prefAge: "24-45 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Yearly Range",
    companyRating: "4.8",
    companyReviews: 1240,
    companyFounded: "2009",
    companySize: "1000-5000 Employees",
    companyWebsite: "https://slack.com",
    industry: "Enterprise SaaS",
    description: "Slack is looking for a Senior Product Designer to join our Core Product team. You will lead design initiatives, crafting slick and user-centric features for millions of active teams around the world. We believe design is a core differentiator, and you will collaborate directly with Engineering and Product leaders to define the next chapter of professional communication.",
    responsibilities: [
      "Own design solutions end-to-end, from wireframes and flowcharts to interactive high-fidelity specs.",
      "Collaborate with Engineering to ensure interface designs are implemented to pixel perfection.",
      "Incorporate data insights and design feedback into subsequent product iterations.",
      "Champion design standards, helping to scale our design system library across Slack.",
      "Facilitate product ideation sessions with engineering managers and directors.",
    ],
    requirements: [
      "5+ years of design experience at a fast-growing software or technology company.",
      "Exceptional visual and interaction design skills, backed by a strong portfolio of shipped products.",
      "Proficiency in modern design workspace environments (Figma, Sketch, Adobe Creative Suite).",
      "Basic understanding of frontend constraints (HTML, CSS, JS layout modules).",
      "Demonstrated ability to present design logic and explain design trade-offs.",
    ],
    qualifications: [
      "Bachelor's Degree in Human-Computer Interaction, Design, or equivalent industry experience.",
      "Track record of working closely with engineering partners to deliver software interfaces.",
    ],
    preferredSkills: [
      "Experience designing collaborative or productivity software systems.",
      "Prototyping tools competency (ProtoPie, Framer, Principle).",
      "Strong understanding of web accessibility (WCAG 2.1 AA) principles.",
    ],
    communicationSkills: [
      "Stellar communication skills, both in synchronous discussions and clear written updates.",
      "Empathy-driven collaborator who loves brainstorming and constructive critiques.",
      "Self-directed and comfortable navigating ambiguity in a remote environment.",
    ],
  },
  {
    id: 2,
    date: "22 May, 2026",
    closingDate: "20 June, 2026",
    daysRemaining: 10,
    company: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    title: "Lead UX Researcher",
    tags: ["Part Time", "Flexible", "Research"],
    schedule: "Part Time",
    type: "Flexible",
    salary: "$95,000/Yr",
    salaryVal: 95000,
    location: "New York, NY",
    cardBg: "bg-[#FFEBF0]",
    isBookmarked: false,
    openPositions: 1,
    experienceRequired: "6+ Years",
    department: "User Research",
    education: "Master's in HCI or Psychology",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "25-50 Years",
    prefLanguages: "English (Fluent), Spanish (Optional)",
    salaryType: "Yearly Range",
    companyRating: "4.9",
    companyReviews: 890,
    companyFounded: "2012",
    companySize: "500-1000 Employees",
    companyWebsite: "https://figma.com",
    industry: "Design Tech",
    description: "Figma is seeking a Lead UX Researcher to shape the future of design tools. You will lead research programs to understand how creative teams collaborate, design, and developer-handoff products. Your findings will directly impact product decisions, visual layout systems, and roadmap choices across all Figma platforms.",
    responsibilities: [
      "Design and execute end-to-end research studies using qualitative and quantitative methods.",
      "Conduct in-depth user interviews, usability testing sessions, and field surveys.",
      "Synthesize research data into actionable frameworks, user profiles, and design principles.",
      "Collaborate with UX designers and developers to test prototypes and explore layout strategies.",
      "Socialize research insights across the Figma design organization.",
    ],
    requirements: [
      "6+ years of user research experience, preferably on digital tools or design environments.",
      "Strong methodology command, including usability testing, survey design, and analytics.",
      "Ability to formulate research questions and identify appropriate methodology approaches.",
      "Expertise in presenting qualitative/quantitative data to technical teams.",
      "Familiarity with visual wireframing tools to sketch concepts.",
    ],
    qualifications: [
      "Master's Degree or PhD in HCI, Cognitive Psychology, Anthropology, or equivalent.",
      "Proven track record of influencing product direction through research deliverables.",
    ],
    preferredSkills: [
      "Experience conducting research with developer or designer audiences.",
      "Strong statistics knowledge and quantitative analytics skills.",
      "Familiarity with international/cross-cultural research challenges.",
    ],
    communicationSkills: [
      "Clear, persuasive presenter who can convey insights dynamically.",
      "Excellent writer capable of compiling concise study summaries.",
      "Active listener who loves digging deep to find root user goals.",
    ],
  },
  {
    id: 3,
    date: "20 May, 2026",
    closingDate: "15 June, 2026",
    daysRemaining: 5,
    company: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
    title: "Senior React Developer",
    tags: ["Full Time", "Remote", "React"],
    schedule: "Full Time",
    type: "Remote",
    salary: "$145,000/Yr",
    salaryVal: 145000,
    location: "Stockholm, SE",
    cardBg: "bg-[#FFF3EB]",
    isBookmarked: false,
    openPositions: 3,
    experienceRequired: "4+ Years",
    department: "Engineering",
    education: "Bachelor's in Computer Science",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "22-45 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Yearly Range",
    companyRating: "4.7",
    companyReviews: 3100,
    companyFounded: "2006",
    companySize: "5000+ Employees",
    companyWebsite: "https://spotify.com",
    industry: "Music Streaming & Tech",
    description: "Spotify is searching for a Senior React Developer to join our Web Player team. You will lead UI engineering efforts, building responsive, beautiful, and fluid audio streaming web applications. You will champion design systems, web performance, and modern JavaScript craft to deliver high-quality audio experience to millions of listeners worldwide.",
    responsibilities: [
      "Build high-performance web components using modern React patterns, hooks, and context.",
      "Collaborate with designers to implement fluid transitions and smooth responsive interfaces.",
      "Optimize applications for loading speed, audio stream stability, and browser accessibility.",
      "Contribute to shared libraries and our design system implementation guidelines.",
      "Participate in architectural discussions, code reviews, and technical documentation.",
    ],
    requirements: [
      "4+ years of React development experience in a product engineering environment.",
      "Advanced CSS/Tailwind skills, with an eye for pixel-perfect alignment and layouts.",
      "Deep understanding of modern JavaScript, asynchronous operations, and browser APIs.",
      "Experience with testing frameworks (Jest, Vitest, React Testing Library).",
      "Familiarity with routing patterns, state managers, and REST/GraphQL APIs.",
    ],
    qualifications: [
      "Degree in Computer Science or Software Engineering, or equivalent practical experience.",
      "Experience working on consumer-facing web applications with high active traffic.",
    ],
    preferredSkills: [
      "Familiarity with Web Audio APIs or streaming media technologies.",
      "Experience with Next.js or server-side rendering systems.",
      "Basic understanding of CI/CD setups and cloud server management.",
    ],
    communicationSkills: [
      "Ability to explain programming choices clearly to product managers.",
      "Strong written and verbal communication in English.",
      "A teamwork mindset, comfortable paired-programming and mentoring juniors.",
    ],
  },
  {
    id: 4,
    date: "18 May, 2026",
    closingDate: "18 June, 2026",
    daysRemaining: 8,
    company: "Airbnb",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    title: "Staff Product Manager",
    tags: ["Full Time", "Full Day", "Product"],
    schedule: "Full Time",
    type: "Full Day",
    salary: "$195,000/Yr",
    salaryVal: 195000,
    location: "Los Angeles, CA",
    cardBg: "bg-[#F2F4F7]",
    isBookmarked: true,
    openPositions: 1,
    experienceRequired: "8+ Years",
    department: "Product Management",
    education: "MBA or MS in Engineering",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "28-50 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Yearly Range",
    companyRating: "4.8",
    companyReviews: 2450,
    companyFounded: "2008",
    companySize: "5000+ Employees",
    companyWebsite: "https://airbnb.com",
    industry: "Travel Tech",
    description: "Airbnb is looking for a Staff Product Manager to lead our marketplace growth. You will drive initiatives to optimize the user journey, improve search discovery, and build frictionless reservation flows. You will work alongside world-class engineering, design, and data science teams to deliver products that make anyone feel at home anywhere.",
    responsibilities: [
      "Define growth roadmaps and coordinate execution across multi-functional squads.",
      "Translate product vision into actionable user stories, metrics, and technical requirements.",
      "Analyze behavioral metrics and product dashboards to locate conversion dropoffs.",
      "Run AB testing protocols to validate new onboarding layouts and design variations.",
      "Present strategic product updates to company vice presidents and directors.",
    ],
    requirements: [
      "8+ years of product management experience at high-growth consumer technology firms.",
      "Proven track record of owning growth metrics, onboarding flows, or checkout funnels.",
      "Strong analytical skills, with the ability to query SQL databases and run metric analysis.",
      "Experience coordinating with UX design leads to build simple, gorgeous interfaces.",
      "Ability to handle competing priorities and manage complex dependencies.",
    ],
    qualifications: [
      "Degree in Engineering, Math, Business, or another quantitative field.",
      "Experience managing consumer marketplace products or booking platforms.",
    ],
    preferredSkills: [
      "Master's of Business Administration (MBA) or equivalent.",
      "Deep understanding of SEO practices and digital growth loops.",
      "Basic programming literacy to coordinate effectively with architects.",
    ],
    communicationSkills: [
      "Extraordinary presentation and narrative skills.",
      "Persuasive negotiator who builds consensus among varied business departments.",
      "Clear, structured writer of specs and product briefs.",
    ],
  },
  {
    id: 5,
    date: "14 May, 2026",
    closingDate: "14 June, 2026",
    daysRemaining: 4,
    company: "Stripe",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    title: "Technical Writer",
    tags: ["Internship", "Remote", "Documentation"],
    schedule: "Internship",
    type: "Remote",
    salary: "$75,000/Yr",
    salaryVal: 75000,
    location: "Seattle, WA",
    cardBg: "bg-[#E6FAFA]",
    isBookmarked: false,
    openPositions: 1,
    experienceRequired: "1-2 Years",
    department: "Developer Relations",
    education: "Bachelor's in English or CS",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "20-35 Years",
    prefLanguages: "English (Native/Fluent)",
    salaryType: "Hourly / Internship Scale",
    companyRating: "4.9",
    companyReviews: 1780,
    companyFounded: "2010",
    companySize: "5000+ Employees",
    companyWebsite: "https://stripe.com",
    industry: "Fintech",
    description: "Stripe is recruiting a Technical Writer Intern to refine our developer documentation. In this role, you will assist in writing clean, understandable API references, coding guides, and tutorials. You will participate in making fintech integration as simple and straightforward as possible for developers around the world.",
    responsibilities: [
      "Write documentation drafts, coding tutorials, and step-by-step API integration guides.",
      "Review user developer logs and support threads to discover document gaps.",
      "Coordinate with software engineers to verify that documentation matches core API changes.",
      "Maintain document formatting style guides and formatting consistency.",
      "Format code snippets in multiple popular coding languages (React, Node, Python, Ruby).",
    ],
    requirements: [
      "1+ years of writing experience, with technical documentation or blog samples.",
      "Basic coding knowledge (ability to read scripts and locate parameters in code).",
      "Familiarity with markup formats (Markdown, MDX, HTML components).",
      "Understanding of developer needs and fintech payment architectures.",
      "Attention to detail concerning formatting, grammar, and typography.",
    ],
    qualifications: [
      "Enrollment in or completion of a Bachelor's Degree in English, CS, or Technical Communication.",
      "Samples of technical writing (blogs, guides, github readme, projects).",
    ],
    preferredSkills: [
      "Familiarity with static site generators (Docusaurus, Nextra).",
      "Basic Git usage (pull requests, branching, formatting).",
      "Understanding of REST API architectures and JSON payloads.",
    ],
    communicationSkills: [
      "Exceptional descriptive writing ability, simplifying technical terms.",
      "A helpful, feedback-driven personality who enjoys collaborative editing.",
      "Strong research skills, eager to ask questions to engineers.",
    ],
  },
  {
    id: 6,
    date: "10 May, 2026",
    closingDate: "10 June, 2026",
    daysRemaining: 2,
    company: "Notion",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    title: "Lead Brand Designer",
    tags: ["Project Work", "Flexible", "Brand"],
    schedule: "Project Work",
    type: "Flexible",
    salary: "$105,000/Yr",
    salaryVal: 105000,
    location: "San Francisco, CA",
    cardBg: "bg-[#F3E8FF]",
    isBookmarked: false,
    openPositions: 1,
    experienceRequired: "6+ Years",
    department: "Marketing / Brand Design",
    education: "Bachelor's of Fine Arts",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "25-45 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Project / Contract Scale",
    companyRating: "4.8",
    companyReviews: 670,
    companyFounded: "2013",
    companySize: "100-500 Employees",
    companyWebsite: "https://notion.so",
    industry: "Productivity Software",
    description: "Notion is looking for a Lead Brand Designer to run marketing visual design projects. You will guide brand identity campaigns, designing beautiful website layout schemes, marketing illustrations, and branding guidelines that express Notion's clean, minimalist, and playful aesthetic personality.",
    responsibilities: [
      "Develop brand visual assets for marketing campaigns, product announcements, and websites.",
      "Maintain Notion's unique minimalist illustration style and design identity guidelines.",
      "Collaborate with marketing managers and copywriters to define visual storyboards.",
      "Provide constructive creative feedback and mentor junior marketing designers.",
      "Ensure all design assets conform to web publishing size and speed requirements.",
    ],
    requirements: [
      "6+ years of branding or marketing design experience at technology or design agencies.",
      "Outstanding typography and illustration skills, supported by a creative design portfolio.",
      "Advanced mastery of design environments (Figma, Illustrator, Photoshop).",
      "Experience directing projects from brainstorm sketches to high-quality files.",
      "Deep understanding of design history and minimalist aesthetic patterns.",
    ],
    qualifications: [
      "Bachelor's Degree in Graphic Design, Fine Arts, or related visual discipline.",
      "Experience with brand systems, visual assets, and marketing layouts.",
    ],
    preferredSkills: [
      "Motion graphics development and animations literacy.",
      "Understanding of HTML/CSS web layout architectures.",
      "3D modeling or illustration experience.",
    ],
    communicationSkills: [
      "Ability to present creative layouts and explain artistic choices clearly.",
      "Strong written storytelling abilities.",
      "Receptive collaborator who loves bouncing ideas in visual brainstorms.",
    ],
  },
  {
    id: 7,
    date: "08 May, 2026",
    closingDate: "15 June, 2026",
    daysRemaining: 12,
    company: "Dribbble",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
    title: "Visual Designer",
    tags: ["Part Time", "Remote", "UI/UX"],
    schedule: "Part Time",
    type: "Remote",
    salary: "$90,000/Yr",
    salaryVal: 90000,
    location: "New York, NY",
    cardBg: "bg-[#E8F4FF]",
    isBookmarked: false,
    openPositions: 1,
    experienceRequired: "3+ Years",
    department: "Product Design",
    education: "Bachelor's in Design/UI",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "22-40 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Yearly Range",
    companyRating: "4.6",
    companyReviews: 430,
    companyFounded: "2009",
    companySize: "100-500 Employees",
    companyWebsite: "https://dribbble.com",
    industry: "Creative Social Network",
    description: "Dribbble is looking for a part-time Visual Designer to help craft landing pages, graphics, and interface assets. You will collaborate directly with our marketing and core product design teams to ensure that our platform maintains its premium reputation as the leading social network for designers worldwide.",
    responsibilities: [
      "Create visuals for social media channels, landing pages, and email campaigns.",
      "Assist in updating our UI system library and preparing assets for engineering implementation.",
      "Draft interactive storyboards and visual prototypes for product features.",
      "Deliver assets on schedule that meet all visual standards.",
      "Participate in design critiques, providing feedback on peer deliverables.",
    ],
    requirements: [
      "3+ years of visual designer experience in marketing or product groups.",
      "Stunning portfolio showing strong composition, typography, and color theory.",
      "Expert knowledge of Figma, Photoshop, and vector asset utilities.",
      "Self-directed schedule management, comfortable with remote part-time workflows.",
      "Familiarity with design templates and web publishing guidelines.",
    ],
    qualifications: [
      "Degree in Graphic Design, UI/UX, or portfolio-proven industry background.",
      "Proven history of developing graphics for marketing or web platforms.",
    ],
    preferredSkills: [
      "Basic HTML/CSS layouts knowledge.",
      "Micro-interactions design or video editing capabilities.",
      "Branding systems development background.",
    ],
    communicationSkills: [
      "Articulate visual storyteller who is responsive in remote chats.",
      "Proactive organizer who communicates status updates regularly.",
      "Collaborative and receptive to visual edits and suggestions.",
    ],
  },
  {
    id: 8,
    date: "04 May, 2026",
    closingDate: "10 June, 2026",
    daysRemaining: 7,
    company: "Vercel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    title: "DevOps Engineer",
    tags: ["Full Time", "Remote", "Cloud"],
    schedule: "Full Time",
    type: "Remote",
    salary: "$165,000/Yr",
    salaryVal: 165000,
    location: "Remote, US",
    cardBg: "bg-[#FFEBF0]",
    isBookmarked: false,
    openPositions: 2,
    experienceRequired: "4+ Years",
    department: "Infrastructure / DevOps",
    education: "Bachelor's in CS or InfoSec",
    prefGender: "Any",
    prefNationality: "USA / Canada resident (Tax compliance)",
    prefAge: "24-48 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Yearly Range",
    companyRating: "4.9",
    companyReviews: 1100,
    companyFounded: "2015",
    companySize: "500-1000 Employees",
    companyWebsite: "https://vercel.com",
    industry: "Cloud & Dev Tools",
    description: "Vercel is seeking a DevOps Engineer to optimize our serverless infrastructure deployment engines. In this role, you will scale systems that build and host Next.js web applications, managing Kubernetes nodes, CDN architectures, and build cache networks to guarantee low latency everywhere.",
    responsibilities: [
      "Manage and deploy serverless functions platforms and containers (Kubernetes, Docker).",
      "Build CI/CD automation flows and build scripts using Github Actions or related tools.",
      "Monitor application performance metrics, locating resource limits and resolving pipeline latency.",
      "Coordinate server security standards and data encryption protocols.",
      "Write scripts to automate infrastructure tasks (Terraform, Python, Go).",
    ],
    requirements: [
      "4+ years of DevOps or Cloud infrastructure engineering experience.",
      "Expert knowledge of AWS, Google Cloud, and container orchestrations.",
      "Strong scripting skills (Golang, Python, or advanced Bash).",
      "Understanding of DNS architectures, HTTP cache networks, and CDN routing.",
      "Familiarity with server metrics monitoring platforms (Datadog, Prometheus).",
    ],
    qualifications: [
      "Degree in Computer Science, Security Systems, or equivalent experience.",
      "AWS Certified Solutions Architect or equivalent professional certificate.",
    ],
    preferredSkills: [
      "Experience hosting Next.js or React server-side rendering configurations.",
      "Understanding of Edge network computing models.",
      "Security compliance (SOC 2, ISO 27001) execution background.",
    ],
    communicationSkills: [
      "Structured documentation writer who records configuration details clearly.",
      "Calm under pressure during service degradation scenarios.",
      "Clear speaker who coordinates cleanly with core frontend groups.",
    ],
  },
  {
    id: 9,
    date: "02 May, 2026",
    closingDate: "12 June, 2026",
    daysRemaining: 13,
    company: "Linear",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    title: "Backend Engineer",
    tags: ["Project Work", "Shift Work", "NodeJS"],
    schedule: "Project Work",
    type: "Shift Work",
    salary: "$135,000/Yr",
    salaryVal: 135000,
    location: "London, UK",
    cardBg: "bg-[#FFF3EB]",
    isBookmarked: false,
    openPositions: 2,
    experienceRequired: "3+ Years",
    department: "Backend Engineering",
    education: "Bachelor's in CS or Info Systems",
    prefGender: "Any",
    prefNationality: "Any",
    prefAge: "22-45 Years",
    prefLanguages: "English (Fluent)",
    salaryType: "Hourly / Contract scale",
    companyRating: "4.8",
    companyReviews: 540,
    companyFounded: "2019",
    companySize: "50-100 Employees",
    companyWebsite: "https://linear.app",
    industry: "Productivity SaaS",
    description: "Linear is recruiting a Backend Engineer to scale our core sync architectures. You will develop APIs, optimize databases, and build real-time sync systems that keep work items organized and synchronized across client applications worldwide with zero latency.",
    responsibilities: [
      "Design and document scalable JSON APIs and WebSockets connections.",
      "Optimize SQL database indexes and queries to manage millions of active items.",
      "Implement data synchronization pipelines, handling merge conflicts and replication logs.",
      "Conduct security audits and audit server access controls.",
      "Participate in paired-programming and review code changes systematically.",
    ],
    requirements: [
      "3+ years of backend development experience (TypeScript, Node.js, Go, or Python).",
      "Advanced database management skills (PostgreSQL, Redis caching, schema structures).",
      "Experience building real-time websockets synchronization services.",
      "Familiarity with writing backend automated tests (unit, integration).",
      "Basic understanding of frontend state management requirements.",
    ],
    qualifications: [
      "Degree in Computer Engineering or Computer Science, or equivalent experience.",
      "Proven history of developing stable backend systems for web applications.",
    ],
    preferredSkills: [
      "Experience with TypeScript in fullstack environments.",
      "Knowledge of Docker container deploy patterns.",
      "Performance optimization in high concurrency environments.",
    ],
    communicationSkills: [
      "Excellent technical writing for API documentation.",
      "Proactive communicator who keeps progress updates accurate.",
      "A developer who enjoys direct collaboration and code reviews.",
    ],
  },
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find job from mock DB. Fallback to Slack (ID 1) if not found.
  const currentJob = useMemo(() => {
    const job = DETAILED_JOBS.find((j) => j.id === Number(id));
    return job || DETAILED_JOBS[0];
  }, [id]);

  // Route handlers for navigation buttons in JobHeader
  const handlePrev = () => {
    const currentIndex = DETAILED_JOBS.findIndex((j) => j.id === currentJob.id);
    if (currentIndex > 0) {
      navigate(`/jobs/${DETAILED_JOBS[currentIndex - 1].id}`);
    } else {
      navigate(`/jobs/${DETAILED_JOBS[DETAILED_JOBS.length - 1].id}`);
    }
  };

  const handleNext = () => {
    const currentIndex = DETAILED_JOBS.findIndex((j) => j.id === currentJob.id);
    if (currentIndex < DETAILED_JOBS.length - 1) {
      navigate(`/jobs/${DETAILED_JOBS[currentIndex + 1].id}`);
    } else {
      navigate(`/jobs/${DETAILED_JOBS[0].id}`);
    }
  };

  const handleApply = () => {
    alert(`Thank you for your interest! Your application has been submitted to ${currentJob.company} for the ${currentJob.title} position.`);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] px-4 md:px-10 py-8 flex flex-col space-y-8 select-none relative pb-24 lg:pb-8">
      {/* Top Navbar */}
      <Navbar
        searchVal=""
        onSearchChange={() => {}}
        salaryVal={500000}
        onSalaryChange={() => {}}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-8 py-2 sm:py-6 flex-1">
        {/* Top Header Card */}
        <JobHeader
          job={currentJob}
          onApply={handleApply}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Content Layout Grid (70% main, 30% sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start w-full mt-8">
          {/* Left section (70%) */}
          <div className="space-y-8 flex-1">
            {/* Preferences */}
            <JobPreferences job={currentJob} />

            {/* Description */}
            <JobDescription job={currentJob} />

            {/* Benefits */}
            <JobBenefits />
          </div>

          {/* Right sidebar section (30%) */}
          <div className="w-full lg:w-[360px] shrink-0">
            <JobSidebar job={currentJob} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <ActionButtons job={currentJob} onApply={handleApply} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetails;
export { DETAILED_JOBS };
