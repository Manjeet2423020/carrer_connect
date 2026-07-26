import React from "react";

const JobDescription = ({ job }) => {
  const defaultDesc =
    "We are seeking a talented professional to join our fast-growing engineering department. In this role, you will collaborate with cross-functional teams to design, develop, and deploy scalable solutions that delight our users. The ideal candidate has a strong background in software craft, enjoys solving complex architecture puzzles, and holds a commitment to code quality and accessibility.";

  const responsibilities = job.responsibilities || [
    "Develop clean, well-tested, and maintainable software components following modern industry best practices.",
    "Collaborate with product managers, developers, and UX designers to build user-centered products and interfaces.",
    "Participate in design discussions, code reviews, and architectural planning sessions.",
    "Troubleshoot, debug, and optimize application workloads to guarantee excellent performance and speed.",
    "Identify security and infrastructure issues, proposing resilient fixes and maintaining documentation.",
  ];

  const requirements = job.requirements || [
    "3+ years of experience working with software systems in a professional developer environment.",
    "Strong technical expertise in modern programming patterns and software paradigms.",
    "Familiarity with state management libraries, client-side routing, and API integration flows.",
    "Solid understanding of responsive layout styling using modern CSS frameworks like Tailwind CSS.",
    "Experience with version control tools like Git and automated build deployment setups.",
  ];

  const qualifications = job.qualifications || [
    "Bachelor's Degree in Computer Science, Software Engineering, or equivalent practical industry experience.",
    "Demonstrated portfolio of completed products or open-source projects showing craftsmanship.",
  ];

  const preferredSkills = job.preferredSkills || [
    "Experience working with cloud platforms like AWS, GCP, or Azure.",
    "Understanding of database technologies (SQL/NoSQL) and caching layers.",
    "Framer Motion or canvas animation development experience.",
  ];

  const communicationSkills = job.communicationSkills || [
    "Outstanding verbal and written communication skills.",
    "A positive attitude with the ability to articulate complex technical ideas clearly to non-technical stakeholders.",
    "A proactive collaborator who thrives in asynchronous remote-first configurations.",
  ];

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 p-6 sm:p-8 shadow-xs select-none space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-[#202020] mb-3">Job Description</h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {job.description || defaultDesc}
        </p>
      </div>

      {/* Responsibilities */}
      <div>
        <h3 className="text-sm font-bold text-[#202020] mb-2.5 uppercase tracking-wider text-[#56A8FF]">
          Key Responsibilities
        </h3>
        <ul className="space-y-2 list-disc pl-5">
          {responsibilities.map((item, idx) => (
            <li key={idx} className="text-sm text-neutral-600 leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements & Qualifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-[#202020] mb-2.5 uppercase tracking-wider text-[#56A8FF]">
            Job Requirements
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            {requirements.map((item, idx) => (
              <li key={idx} className="text-sm text-neutral-600 leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#202020] mb-2.5 uppercase tracking-wider text-[#56A8FF]">
            Qualifications
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            {qualifications.map((item, idx) => (
              <li key={idx} className="text-sm text-neutral-600 leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div>
          <h3 className="text-sm font-bold text-[#202020] mb-2.5 uppercase tracking-wider text-[#56A8FF]">
            Preferred Skills
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            {preferredSkills.map((item, idx) => (
              <li key={idx} className="text-sm text-neutral-600 leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#202020] mb-2.5 uppercase tracking-wider text-[#56A8FF]">
            Communication & Work Style
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            {communicationSkills.map((item, idx) => (
              <li key={idx} className="text-sm text-neutral-600 leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
