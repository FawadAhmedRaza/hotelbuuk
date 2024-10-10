"use client";

import { useMemo, useEffect, useReducer, useCallback } from "react";
import { AuthContext } from "./auth-context";
import { setSession, isValidToken } from "./utils";
import { jwtDecode } from "jwt-decode";
import {
  CheckForgetOTP,
  CheckOTP,
  createUser,
  forgetPassword,
  getUserById,
  loginWithCreds,
  resetPasssword,
} from "@/src/actions/auth.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth } from "@/src/auth";
import { useSession } from "next-auth/react";
import { generateToken } from "@/src/service/tokenGenerator";

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------
export const Types = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
};
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();

  console.log("State", state.user);

  const fetchData = async () => {
    try {
      const user = await getUserById(session?.user?.id);
      console.log("user profile", user);
      dispatch({ type: Types.INITIAL, payload: { user: { ...user } } });
    } catch (err) {
      console.log("Error Fetching detail", err);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session?.user?.id]);

  console.log("authStatus in context", authStatus);
  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const user = jwtDecode(accessToken);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (data) => {
    try {
      const { email, password } = data || {};

      const result = await loginWithCreds({ email, password });
      console.log(result);
      if (result.statusCode == 200) {
        toast.success("Login sucessfully.");
        const { accessToken, user } = result.data || {};
        console.log(accessToken);
        setSession(accessToken);
        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        });

        router.push("/");
      } else {
        toast.error(result?.message);
      }
    } catch (err) {
      console.log("Login Error", err?.message);
    }
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {
    try {
      const response = await createUser(data);
      if (response.statusCode == 200) {
        localStorage.setItem("signupEmail", data.email);
        router.push("/verify-code?step=signup");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log("errror in register ", err);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const otpVerification = useCallback(async (step, code) => {
    try {
      if (step == "signup") {
        const email = localStorage.getItem("signupEmail");
        const response = await CheckOTP(email, code);

        if (response.statusCode == 200) {
          setSession(response.accessToken);
          localStorage.removeItem("signupEmail");
          dispatch({
            type: Types.LOGIN,
            payload: {
              user: response.data?.user,
            },
          });
          toast.success("User conrim successfully.");
          router.push("/");
        } else {
          toast.error(response?.message);
        }
      } else {
        const email = localStorage.getItem("forgotEmail");
        const response = await CheckForgetOTP(email, code);
        localStorage.setItem("forgotOtp", code);
        if (response.statusCode == 200) {
          router.push("/set-new-password");
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("Otp Verification Error:", error);
    }
  }, []);

  const resetPasswordHandle = useCallback(async (newPassword) => {
    try {
      const email = localStorage.getItem("forgotEmail");
      const otp = localStorage.getItem("forgotOtp");

      if (!email || !otp) {
        toast.error(
          "Opps, Unable to Reset password! We think you miss some steps"
        );
        router.push("/login");
      }

      const result = await resetPasssword(email, otp, newPassword);

      if (result.statusCode == 200) {
        toast.success("Reset Password sucessfully.");
        const { accessToken, user } = result.data || {};
        localStorage.removeItem("forgotEmail");
        localStorage.removeItem("forgotOtp");

        setSession(accessToken);
        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        });

        router.push("/");
      } else {
        toast.error(result?.message);
      }
    } catch (err) {
      console.log("Reset Error", err?.message);
    }
  }, []);

  const forgotPasswordHandle = useCallback(async (email) => {
    try {
      localStorage.setItem("forgotEmail", email);
      const response = await forgetPassword(email);
      if (response.statusCode == 200) {
        router.push("/verify-code?step=forgot");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      dispatch,
      //
      login,
      otpVerification,
      resetPasswordHandle,
      forgotPasswordHandle,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
