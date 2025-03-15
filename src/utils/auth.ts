
// Check if the user has completed payment for access
export const hasUserPaid = (): boolean => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    const user = JSON.parse(userStr);
    console.log('Checking if user has paid:', user);
    
    // Explicitly check for the existence of the subscription property and its active status
    const hasPaid = user.subscription && user.subscription.active === true;
    console.log('Has user paid:', hasPaid);
    
    return !!hasPaid; // Convert to boolean to ensure true/false is returned
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
};

// Check if the user is logged in
export const isUserLoggedIn = (): boolean => {
  try {
    return localStorage.getItem('user') !== null;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};
