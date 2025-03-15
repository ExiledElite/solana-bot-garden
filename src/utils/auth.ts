
// Check if the user has completed payment for access
export const hasUserPaid = (): boolean => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    const user = JSON.parse(userStr);
    return Boolean(user.subscription?.active);
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
