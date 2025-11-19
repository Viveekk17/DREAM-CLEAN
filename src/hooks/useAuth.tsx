import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock User type
interface MockUser {
  email: string;
  id?: string;
}

// ADMIN CREDENTIALS
const ADMIN_EMAIL = 'admin@dreamclean.com';
const ADMIN_PASSWORD = 'admin123';

interface AuthContextType {
  user: MockUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAdmin(parsed.email === ADMIN_EMAIL);
    }
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    // Simulate signup - just store user locally
    const newUser: MockUser = { email, id: crypto.randomUUID() };
    setUser(newUser);
    setIsAdmin(false);
    localStorage.setItem('authUser', JSON.stringify(newUser));
    toast.success('Account created successfully!');
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Check if attempting to login as admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: MockUser = { email: ADMIN_EMAIL, id: 'admin' };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      toast.success('Logged in as Admin!');
      return { error: null };
    }

    // Regular user login - just store email locally
    const newUser: MockUser = { email, id: crypto.randomUUID() };
    setUser(newUser);
    setIsAdmin(false);
    localStorage.setItem('authUser', JSON.stringify(newUser));
    toast.success('Signed in successfully!');
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('authUser');
    toast.success('Signed out successfully!');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      isLoading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
