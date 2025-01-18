import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

interface AuthState {
  isLoggedIn: boolean;
  isInitialized: boolean;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

interface AuthAction {
  type: string;
  payload?: Partial<AuthState>;
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const INIT_STATE = 'INIT_STATE';

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case INIT_STATE:
      return { ...state, ...action.payload };
    case LOGIN:
      return { ...state, isLoggedIn: true, isInitialized: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false, isInitialized: true };
    default:
      return state;
  }
}

function validateToken(token?: string | null) {
  return Boolean(token && token.trim() !== '');
}

function applyToken(token?: string | null) {
  if (token) {
    localStorage.setItem('secToken', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('secToken');
    delete axios.defaults.headers.common.Authorization;
  }
}

const initialState: AuthState = {
  isLoggedIn: false,
  isInitialized: false,
  password: '123456'
};

function readPersistedState(): Partial<AuthState> | null {
  try {
    const data = localStorage.getItem('authState');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function writePersistedState(state: AuthState) {
  localStorage.setItem('authState', JSON.stringify(state));
}

const AuthContext = createContext<AuthContextType | null>(null);

export function SessionContext({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const persisted = readPersistedState();
    if (persisted) {
      dispatch({ type: INIT_STATE, payload: persisted });
    }

    const secToken = localStorage.getItem('secToken');
    if (validateToken(secToken)) {
      applyToken(secToken);
      dispatch({ type: LOGIN });
    } else {
      dispatch({ type: LOGOUT });
    }
  }, []);

  useEffect(() => {
    writePersistedState(state);
  }, [state]);

  const login = async (email: string, password: string) => {
    if (email === 'admin@demo.com' && password === state.password) {
      applyToken('demoToken');
      dispatch({ type: LOGIN });
    } else {
      throw new Error('Не удалось войти. Проверьте логин или пароль.');
    }
  };

  const logout = () => {
    applyToken(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email: string) => {
    console.log(`Запрос на сброс пароля для: ${email}`);
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (oldPassword !== state.password) {
      throw new Error('Старый пароль указан неверно.');
    }
    dispatch({ type: INIT_STATE, payload: { password: newPassword } });
    console.log(`Пароль успешно изменён на: ${newPassword}`);
  };

  if (!state.isInitialized) {
    return <>Загрузка...</>;
  }

  return <AuthContext.Provider value={{ ...state, login, logout, resetPassword, changePassword }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
