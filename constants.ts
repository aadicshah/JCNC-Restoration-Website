// FIX: Import TabKey to be used for explicit typing of TABS constant.
import React from 'react';
import type { Donor, LabhTier, TabKey } from './types';

export const INITIAL_DONORS: Donor[] = [
  { id: 1, name: "The Shah Family", labhType: "Dining Hall Primary", imageUrl: "https://picsum.photos/seed/shah/220/200", isMajor: true },
  { id: 2, name: "The Vora Family", labhType: "Dining Hall Restoration", imageUrl: "https://picsum.photos/seed/vora/220/200", isMajor: true },
  { id: 3, name: "The Mehta Family", labhType: "Kitchen Restoration", imageUrl: "https://picsum.photos/seed/mehta/220/200", isMajor: true },
  { id: 4, name: "The Gandhi Family", labhType: "Kitchen Restoration", imageUrl: "https://picsum.photos/seed/gandhi/220/200", isMajor: true },
  { id: 5, name: "The Jain Family", labhType: "Classroom A", imageUrl: "https://picsum.photos/seed/jainA/220/200", isMajor: true },
  { id: 6, name: "Anonymous", labhType: "Classroom B", imageUrl: "https://picsum.photos/seed/anonB/220/200", isMajor: true },
  { id: 7, name: "Rathod Family", labhType: "Tile Donor", imageUrl: "https://picsum.photos/seed/rathod1/220/140", isMajor: false },
  { id: 8, name: "Jain Family", labhType: "Tile Donor", imageUrl: "https://picsum.photos/seed/jain1/220/140", isMajor: false },
  { id: 9, name: "Patel Family", labhType: "Tile Donor", imageUrl: "https://picsum.photos/seed/patel1/220/140", isMajor: false },
  { id: 10, name: "Bhansali Family", labhType: "Tile Donor", imageUrl: "https://picsum.photos/seed/bhansali1/220/140", isMajor: false },
];

// FIX: Corrected typo from LabH_TIERS to LabhTier.
// FIX: Converted icon definitions from JSX to React.createElement calls to prevent parsing errors in a .ts file.
export const LABH_TIERS: LabhTier[] = [
    {
        name: 'Dining Hall Primary',
        amount: '$500,000',
        tags: ['2-year split available', 'Multiple Family Split Allowed'],
        description: 'Sponsor the heart of our temple where thousands of meals are served.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("path", { d: "M3 21h18M5 21V7l7-4 7 4v14", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("path", { d: "M9 18h6V9H9v9Z", fill: "#ffd56b" }))
    },
    {
        name: 'Dining Hall Restoration',
        amount: '$300,000',
        tags: ['2-year split available', 'Multiple Family Split Allowed'],
        description: 'Help renew our sacred dining hall that unites our Sangh through shared meals.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("path", { d: "M4 20h16M6 20V8l6-3 6 3v12", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("path", { d: "M10 17h4v-6h-4v6Z", fill: "#ffd56b" }))
    },
    {
        name: 'Kitchen Restoration',
        amount: '$300,000',
        tags: ['2-year split available', 'Multiple Family Split Allowed'],
        description: 'Support our temple kitchen that serves our entire community.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("path", { d: "M4 20h16M6 20V8l6-3 6 3v12", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("path", { d: "M10 17h4v-6h-4v6Z", fill: "#ffd56b" }))
    },
    {
        name: 'Classroom A',
        amount: '$100,000',
        tags: ['2-year split available', 'Multiple Family Split Allowed'],
        description: 'Nurture Gyāna by sponsoring a classroom for our Pathshala kids.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("path", { d: "M3 8 12 4l9 4-9 4-9-4Z", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("path", { d: "M7 12v4c0 2.2 5 2.2 5 0v-4", stroke: "#ffd56b", strokeWidth: "1.6" }))
    },
    {
        name: 'Classroom B',
        amount: '$100,000',
        tags: ['2-year split available', 'Multiple Family Split Allowed'],
        description: 'Nurture Gyāna by sponsoring a classroom for our Pathshala kids.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("path", { d: "M3 8 12 4l9 4-9 4-9-4Z", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("path", { d: "M7 12v4c0 2.2 5 2.2 5 0v-4", stroke: "#ffd56b", strokeWidth: "1.6" }))
    },
    {
        name: 'Sponsor a Tile',
        amount: '$2,500',
        tags: ['Single or multiple tiles'],
        description: 'Donate one or more tiles to support the noble restoration.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("rect", { x: "4", y: "4", width: "7", height: "7", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("rect", { x: "13", y: "4", width: "7", height: "7", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("rect", { x: "4", y: "13", width: "7", height: "7", stroke: "#C89932", strokeWidth: "1.6" }), React.createElement("rect", { x: "13", y: "13", width: "7", height: "7", stroke: "#C89932", strokeWidth: "1.6" }))
    },
     {
        name: 'Flexible Pledge',
        amount: 'Other Amount',
        tags: ['Installments over $10k'],
        description: 'Every contribution helps us reach our goal.',
        icon: React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-11 h-11 mb-2.5" }, React.createElement("path", { d: "M4 12c0-4.418 3.582-8 8-8M20 12c0 4.418-3.582 8-8 8", stroke: "#0A3648", strokeWidth: "1.6" }), React.createElement("path", { d: "M12 4v16", stroke: "#0A3648", strokeWidth: "1.6" }))
    },
];

export const LABH_BENEFITS_DATA = [
    {
        name: 'Dining Hall Primary Sponsor',
        amount: '$500,000',
        benefits: [
            'Permanent wall plaque with donor family name outside Dining Hall',
            'Special Poojan of Dining Hall on Opening Day (as per donor’s tradition)',
            'Recognition on JCNC Website & Email Broadcast',
            'JCNC Board Recognition Certificate',
            'Opportunity for Sangh Poojan on Opening Day',
            'Free Kitchen & Dining rental credit for private events till end of 2027 (up to 3 days)',
        ],
    },
    {
        name: 'Dining Hall Restoration Sponsor',
        amount: '$300,000',
        benefits: [
            'Permanent wall plaque inside Dining Hall',
            'Recognition on JCNC Website & Email Broadcast',
            'JCNC Board Recognition Certificate',
            'Opportunity for Sangh Poojan on Opening Day',
            'Free Kitchen & Dining rental credit for private events till end of 2027 (up to 2 days)',
        ],
    },
    {
        name: 'Kitchen Restoration Sponsor',
        amount: '$300,000',
        benefits: [
            'Permanent wall plaque inside the Kitchen',
            'Special Poojan of Kitchen on Opening Day',
            'Recognition on JCNC Website & Email Broadcast',
            'JCNC Board Recognition Certificate',
            'Opportunity to serve the first meal on Opening Day',
            'Free Kitchen & Dining rental credit for private events till end of 2027 (up to 2 days)',
        ],
    },
    {
        name: 'Classroom A & B Restoration Sponsor',
        amount: '$100,000 each',
        benefits: [
            'Permanent name plaque inside the Classroom',
            'First Gnana Pooja Labh on Gnana Panchami (first year)',
            'Exclusive Classroom Tour & Blessing Ceremony',
            'Recognition on JCNC Website & Email Broadcast',
            'Gnana Prabhavna (Book & Pencil) to Pathshala kids',
            'VIP Invitation to Pathshala Graduation as Guest of Honor (2027)',
        ],
    },
    {
        name: 'Tile Restoration Donor',
        amount: '$2,500 per tile',
        benefits: [
            'Your family name and photo featured on JCNC website and email broadcast (virtual tile)',
            'Become a permanent part of the sacred foundation of our Derasar',
            'Every darshan and puja will take place upon the floor you helped solidify',
        ],
    },
];

export const FAQ_DATA = [
    { q: "What is the primary reason for this restoration project?", a: "The project addresses severe wear, safety concerns, and increased usage over 25 years. It ensures the Bhavan remains safe, compliant, and functional for the next 25+ years." },
    { q: "How was the scope of the project determined?", a: "Through extensive outreach and planning with the Executive Committee, Board of Directors, and community members, incorporating feedback and complaints received over the past year." },
    { q: "Which areas of the Bhavan are being restored?", a: "The Kitchen and Dining Area, Bathrooms and Classrooms, Flooring throughout the Bhavan, and optional Auditorium upgrades." },
    { q: "What specific upgrades are included in the Kitchen and Dining Area?", a: "New plumbing, a roti maker, stove, improved ventilation, new flooring, additional storage, and city code compliance." },
    { q: "How will the project be funded?", a: "Funding comes from community donations, grants, and approved budgets. Fundraising targets are set around $2 million." },
    { q: "What is the expected project cost and timeline?", a: "Estimates range from $3.3M–$3.5M with contingencies. City permits are expected in late 2025, with restoration completion by late 2026." },
];

// FIX: Explicitly type the TABS array to prevent TypeScript from widening the `key` property to `string`.
// This resolves the type error in App.tsx where TABS is passed to the SubNav component.
export const TABS: { key: TabKey, label: string }[] = [
    { key: 'cause', label: '1. Restoration Cause' },
    { key: 'arch', label: '2. Architectural Vision' },
    { key: 'labhs', label: '3. Labhs' },
    { key: 'donors', label: '4. Esteemed Donors' },
    { key: 'contact', label: '5. Contact Us' },
    { key: 'faq', label: '6. FAQ' },
    { key: 'donate-form', label: '7. Pledge Form' },
    { key: 'labh-benefits', label: 'Labh Benefits' }, // Add this for navigation, will be hidden in SubNav
    { key: 'admin', label: 'Admin Login' },
];