
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hasUserPaid, isUserLoggedIn } from '@/utils/auth';

interface PaywallRedirectProps {
  children: React.ReactNode;
}

// Define public paths that don't require authentication or payment
const PUBLIC_PATHS = ['/', '/signup', '/payments'];

const PaywallRedirect = ({ children }: PaywallRedirectProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hasRedirected = useRef(false);
  
  useEffect(() => {
    // Only run this effect once per navigation
    if (hasRedirected.current) return;
    
    // Skip all checks for public paths
    if (PUBLIC_PATHS.includes(pathname)) {
      return;
    }
    
    // If user is not logged in, redirect to home
    if (!isUserLoggedIn()) {
      hasRedirected.current = true;
      navigate('/', { replace: true });
      return;
    }
    
    // If user is logged in but hasn't paid, redirect to payments
    if (!hasUserPaid()) {
      hasRedirected.current = true;
      navigate('/payments', { replace: true });
      return;
    }
    
    // Reset the redirect flag on successful navigation to a protected route
    hasRedirected.current = false;
    
  }, [navigate, pathname]);
  
  return <>{children}</>;
};

export default PaywallRedirect;
