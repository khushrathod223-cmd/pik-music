import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { PlaceholderHomeScreen } from './components/PlaceholderHomeScreen';
import { AuthUser, SessionState } from './types/auth';

export default function App() {
  const [session, setSession] = useState<SessionState>({
    isAuthenticated: false,
    user: null,
    timestamp: '',
  });

  const handleLoginSuccess = (user: AuthUser) => {
    setSession({
      isAuthenticated: true,
      user,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  const handleSignOut = () => {
    setSession({
      isAuthenticated: false,
      user: null,
      timestamp: '',
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white">
      {!session.isAuthenticated || !session.user ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <PlaceholderHomeScreen user={session.user} onSignOut={handleSignOut} />
      )}
    </div>
  );
}
