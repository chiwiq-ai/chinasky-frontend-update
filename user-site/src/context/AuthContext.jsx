import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchProfile,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest,
  updateProfile as updateProfileRequest,
} from '../services/api';
import { setUnauthorizedHandler, tokenStorage } from '../lib/api-client.js';

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'chinasky_user';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  try {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // ignore quota / privacy mode
  }
}

export function AuthProvider({ children }) {
  // Hydrate from localStorage so a page refresh keeps the user signed in.
  const [user, setUser] = useState(() => readStoredUser());
  const [initializing, setInitializing] = useState(() => Boolean(tokenStorage.get()));
  const [error, setError] = useState(null);

  // If we still have a token at boot, try to fetch the live profile so the
  // app starts with fresh data. If the token is stale the request fails and
  // we clear the session.
  useEffect(() => {
    let cancelled = false;
    if (!tokenStorage.get()) {
      setInitializing(false);
      return undefined;
    }
    fetchProfile()
      .then(profile => {
        if (cancelled || !profile) return;
        setUser(profile);
        writeStoredUser(profile);
      })
      .catch(() => {
        if (cancelled) return;
        tokenStorage.clear();
        writeStoredUser(null);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) setInitializing(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Centralized 401 handler — any expired/invalid token clears local state.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      tokenStorage.clear();
      writeStoredUser(null);
      setUser(null);
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const applySession = useCallback((response) => {
    if (!response) return null;
    if (response.token) tokenStorage.set(response.token);
    const nextUser = response.user || response;
    setUser(nextUser);
    writeStoredUser(nextUser);
    return nextUser;
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const response = await loginRequest(email, password);
      return applySession(response);
    } catch (err) {
      setError(err.message || 'Sign in failed');
      throw err;
    }
  }, [applySession]);

  const signup = useCallback(async (data) => {
    setError(null);
    try {
      const response = await signupRequest(data);
      return applySession(response);
    } catch (err) {
      setError(err.message || 'Sign up failed');
      throw err;
    }
  }, [applySession]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // even if the call fails we still clear local state
    }
    tokenStorage.clear();
    writeStoredUser(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    try {
      const next = await updateProfileRequest(data);
      const merged = { ...(user || {}), ...(next || data) };
      setUser(merged);
      writeStoredUser(merged);
      return merged;
    } catch (err) {
      setError(err.message || 'Update failed');
      throw err;
    }
  }, [user]);

  const value = useMemo(
    () => ({ user, initializing, error, login, signup, logout, updateProfile }),
    [user, initializing, error, login, signup, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
