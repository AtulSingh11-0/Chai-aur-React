import { Link } from 'react-router';
import { Logo } from '../index.js';

const linkSections = [
  {
    title: "Company",
    links: [
      { name: "Features", to: "/" },
      { name: "Pricing", to: "/" },
      { name: "Affiliate Program", to: "/" },
      { name: "Press Kit", to: "/" }
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Account", to: "/" },
      { name: "Help", to: "/" },
      { name: "Contact Us", to: "/" },
      { name: "Customer Support", to: "/" }
    ]
  },
  {
    title: "Legals",
    links: [
      { name: "Terms & Conditions", to: "/" },
      { name: "Privacy Policy", to: "/" },
      { name: "Licensing", to: "/" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#f3e9d2] via-[#c6dabf] to-[#88d498] py-24 mt-auto min-h-[400px]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full p-8 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-10">
                <div className='w-16 h-16 bg-[#114b5f] rounded-xl flex items-center justify-center mb-6 shadow-md'>
                  <Logo width="60%" />
                </div>
                <p className='text-[#114b5f] text-base max-w-sm font-medium leading-relaxed mb-6'>
                  A modern blogging platform for writers and readers.
                </p>
                <p className='text-[#114b5f] text-sm max-w-sm'>
                  Share your stories, connect with readers, and join a community of passionate writers.
                </p>
              </div>
              <div>
                <p className="text-sm text-[#114b5f] font-medium">
                  &copy; {new Date().getFullYear()} Blog App. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {linkSections.map((section) => (
            <div
              key={section.title}
              className="w-full p-8 md:w-1/2 lg:w-2/12"
            >
              <h3 className='mb-6 text-sm font-semibold text-[#114b5f] uppercase tracking-wide'>
                {section.title}
              </h3>
              <ul className='space-y-4'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#114b5f] hover:text-[#1a936f] transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
};
