import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import type { User } from "../shared.types";
import userService from "../utils/userService";

type AuthState = {
  user: User | null;
};

type AuthAction = { type: "SET_USER"; payload: User | null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { user: action.payload };
    default:
      return state;
  }
}

type AuthContextValue = {
  user: User | null;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: userService.getUser(),
  });

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
