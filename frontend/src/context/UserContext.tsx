import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

import type { ReactNode } from "react";
interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
  authLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthLoading(true);
        await getUserIdFromToken(setUserId);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, authLoading }}>
      {children}
    </UserContext.Provider>
  );
};

async function getUserIdFromToken(setUserId: (id: number) => void) {
  try {
    const response = await axios.get(`/api/get-user-id`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      setUserId(response.data.userId);
      console.log(response.data.userId);
    }
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
  }
}
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
