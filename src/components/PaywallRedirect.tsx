
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hasUserPaid, isUserLoggedIn } from '@/utils/auth';

interface PaywallRedirectProps {
  children: React.ReactNode;
}

const PaywallRedirect = ({ children }: PaywallRedirectProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const processingRef = useRef(false);
  
  // Define public paths that don't require authentication or payment
  const publicPaths = ['/', '/signup', '/payments'];
  
  useEffect(() => {
    // Prevent handling the same path multiple times in a single render cycle
    if (isChecked || processingRef.current) return;
    
    // Set processing flag to prevent multiple redirects
    processingRef.current = true;
    
    const checkAccess = () => {
      console.log('Current path:', location.pathname);
      console.log('Is user logged in:', isUserLoggedIn());
      
      // If we're on a public path, always allow access without any redirection
      if (publicPaths.includes(location.pathname)) {
        console.log('On public path, allowing access');
        setIsChecked(true);
        processingRef.current = false;
        return;
      }
      
      // If user is not logged in, redirect to home only if on a protected path
      if (!isUserLoggedIn()) {
        console.log('User not logged in, redirecting to home');
        navigate('/', { replace: true });
        setIsChecked(true);
        processingRef.current = false;
        return;
      }
      
      console.log('Has user paid:', hasUserPaid());
      
      // If user is logged in but hasn't paid, redirect to payments only if on a protected path
      if (isUserLoggedIn() && !hasUserPaid()) {
        console.log('User logged in but not paid, redirecting to payments');
        navigate('/payments', { replace: true });
        setIsChecked(true);
        processingRef.current = false;
        return;
      }
      
      // User is logged in and has paid, allow access to any page
      console.log('User logged in and paid, allowing access');
      setIsChecked(true);
      processingRef.current = false;
    };
    
    // Small timeout to avoid immediate execution which can cause issues
    const timer = setTimeout(checkAccess, 50);
    return () => clearTimeout(timer);
  }, [navigate, location.pathname, isChecked]);
  
  // Reset the check when the path changes
  useEffect(() => {
    setIsChecked(false);
    processingRef.current = false;
  }, [location.pathname]);
  
  return <>{children}</>;
};

export default PaywallRedirect;
