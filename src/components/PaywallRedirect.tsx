
import { useEffect } from 'react';
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
  
  useEffect(() => {
    // Skip all checks for public paths
    if (PUBLIC_PATHS.includes(pathname)) {
      return;
    }
    
    // If user is not logged in, redirect to home
    if (!isUserLoggedIn()) {
      navigate('/', { replace: true });
      return;
    }
    
    // If user is logged in but hasn't paid, redirect to payments
    if (isUserLoggedIn() && !hasUserPaid()) {
      navigate('/payments', { replace: true });
      return;
    }
    
    // If we reach here, user is logged in and has paid - no redirection needed
  }, [navigate, pathname]);
  
  return <>{children}</>;
};

export default PaywallRedirect;
