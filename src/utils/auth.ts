
// Check if the user has completed payment for access
export const hasUserPaid = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('Checking if user has paid:', user);
  let hasPaid = user.subscription && user.subscription.active;
  console.log('Has user paid:', hasPaid);
  if (hasPaid == 'undefined') {
    hasPaid = false;
  }
  return hasPaid;
};

// Check if the user is logged in testttt
export const isUserLoggedIn = () => {
  return localStorage.getItem('user') !== null;
};
