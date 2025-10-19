// FIX: Import React types to make JSX-related types like React.ReactNode available.
import type * as React from 'react';

export interface Donor {
  id: number;
  name: string;
  labhType: string;
  imageUrl: string;
  isMajor: boolean;
}

export interface LabhTier {
  name: string;
  amount: string;
  tags: string[];
  description: string;
  // FIX: Changed from JSX.Element to React.ReactNode to fix "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
}

export interface CampaignProgress {
  goal: number;
  raised: number;
}

export interface AdminUser {
  username: string;
  password: string;
}

export type TabKey = 'cause' | 'arch' | 'labhs' | 'donors' | 'contact' | 'faq' | 'donate-form' | 'labh-benefits' | 'admin';