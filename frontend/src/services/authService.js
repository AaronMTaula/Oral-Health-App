// frontend/src/services/authService.js

export const loginUser = async (firebaseIdToken) => {
  const response = await fetch('http://localhost:5000/api/auth/login-firebase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken: firebaseIdToken }), // Send Firebase ID token
  });

  if (!response.ok) {
    const errMsg = await response.text();
    throw new Error(`Failed to login with backend: ${errMsg}`);
  }

  return response.json(); // returns { token, user }
};
