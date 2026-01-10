// src/api/index.js
import { useAuth } from '../context/useAuth';

export const apiFetch = async (url, options = {}) => {
  // Get the current user and token from Auth context
  const { currentUser } = useAuth();
  let token = null;

  if (currentUser) {
    try {
      token = await currentUser.getIdToken(); // Firebase ID token
    } catch (err) {
      console.error('Failed to get Firebase ID token:', err);
    }
  }

  // Merge headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json();
};
