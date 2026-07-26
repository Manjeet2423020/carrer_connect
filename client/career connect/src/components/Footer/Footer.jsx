import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const Footer = () => {
  // Columns data structure for navigation mapping
  const jobSeekerLinks = [
    { label: "Find Jobs", path: "/" },
    { label: "Browse Companies", path: "/" },
    { label: "Remote Jobs", path: "/" },
    { label: "Internships", path: "/" },
    { label: "Career Advice", path: "/" },
    { label: "Resume Builder", path: "/" },
  ];

  const employerLinks = [
    { label: "Post a Job", path: "/" },
    { label: "Browse Candidates", path: "/" },
    { label: "Hiring Solutions", path: "/" },
    { label: "Pricing", path: "/" },
    { label: "Recruitment Services", path: "/" },
    { label: "Employer Dashboard", path: "/" },
  ];

  const resourceLinks = [
    { label: "Blog", path: "/" },
    { label: "Help Center", path: "/" },
    { label: "FAQs", path: "/" },
    { label: "Terms & Conditions", path: "/" },
    { label: "Privacy Policy", path: "/" },
    { label: "Contact Us", path: "/" },
  ];

  const socialLinks = [
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaGithub />, url: "https://github.com", label: "GitHub" },
    { icon: <FaXTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
  ];

  const bottomLinks = [
    { label: "Privacy Policy", path: "/" },
    { label: "Terms", path: "/" },
    { label: "Cookies", path: "/" },
    { label: "Accessibility", path: "/" },
  ];

  return (
    <footer className="w-full bg-[#151515] rounded-t-[24px] text-white select-none border-t border-neutral-800/20 shadow-2xl">
      {/* Top Footer Sections */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-[#56A8FF] flex items-center justify-center text-black font-extrabold text-sm">
                L
              </span>
              <span className="text-white">Lucky<span className="text-[#56A8FF]">Job</span></span>
            </Link>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">
              Helping professionals find the right opportunity and helping companies hire the best talent worldwide.
            </p>
            {/* Social Media circular buttons */}
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#202020] text-neutral-400 flex items-center justify-center hover:bg-[#56A8FF] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Job Seekers */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Job Seekers</h4>
            <nav className="flex flex-col space-y-3">
              {jobSeekerLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-sm text-neutral-400 font-semibold hover:text-[#56A8FF] hover:translate-x-0.5 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Employers */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Employers</h4>
            <nav className="flex flex-col space-y-3">
              {employerLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-sm text-neutral-400 font-semibold hover:text-[#56A8FF] hover:translate-x-0.5 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Resources */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Resources</h4>
            <nav className="flex flex-col space-y-3">
              {resourceLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-sm text-neutral-400 font-semibold hover:text-[#56A8FF] hover:translate-x-0.5 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 5: Contact Address */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Contact</h4>
            <address className="flex flex-col space-y-3.5 not-italic text-sm text-neutral-400">
              <a
                href="mailto:support@luckyjob.com"
                className="flex items-center space-x-3.5 group hover:text-[#56A8FF] transition-colors duration-300 font-semibold"
              >
                <FiMail className="text-base text-[#56A8FF] shrink-0" />
                <span className="break-all">support@luckyjob.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center space-x-3.5 group hover:text-[#56A8FF] transition-colors duration-300 font-semibold"
              >
                <FiPhone className="text-base text-[#56A8FF] shrink-0" />
                <span>+91 98765 43210</span>
              </a>

              <div className="flex items-start space-x-3.5 font-semibold">
                <FiMapPin className="text-base text-[#56A8FF] shrink-0 mt-0.5" />
                <span>New Delhi, India</span>
              </div>

              <div className="flex items-start space-x-3.5 font-semibold">
                <FiClock className="text-base text-[#56A8FF] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>Mon - Fri</span>
                  <span className="text-xs text-neutral-500 font-medium">9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </address>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-neutral-800/60 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-white tracking-tight">Stay Updated</h3>
            <p className="text-sm text-neutral-400 font-semibold">
              Get the latest jobs and career tips directly in your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center w-full max-w-md bg-[#202020] rounded-full p-1 border border-neutral-800/40 focus-within:border-brand-blue/30 focus-within:bg-[#252525] transition-all duration-200"
          >
            <input
              type="email"
              required
              placeholder="Email Address"
              aria-label="Email address for newsletter"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-neutral-500 outline-none w-full"
            />
            <button
              type="submit"
              className="bg-[#56A8FF] hover:bg-[#56A8FF]/90 hover:scale-105 active:scale-95 text-black font-extrabold text-xs px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-neutral-500 font-semibold">
            © 2026 LuckyJob. All rights reserved.
          </p>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {bottomLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="text-xs text-neutral-500 font-semibold hover:text-[#56A8FF] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
