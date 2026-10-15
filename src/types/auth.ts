/**
 * Authentication and Session Types for PiK Music SCuII
 */

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  provider: 'google';
}

export interface GuestUser {
  id: string;
  name: string;
  provider: 'guest';
}

export type AuthUser = GoogleUser | GuestUser;

export interface SessionState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  timestamp: string;
}
