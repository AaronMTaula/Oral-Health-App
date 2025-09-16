// frontend/src/services/authService.js

export const loginUser = async (firebaseIdToken) => {
  const response = await fetch('http://localhost:5000/api/auth/login-firebase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken: firebaseIdToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to login with backend');
  }

  return response.json(); // returns { token, user }
};
