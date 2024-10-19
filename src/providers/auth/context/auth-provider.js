"use client";

import { useMemo, useEffect, useReducer, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth-context";

import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

import { setSession, isValidToken } from "./utils";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { getUserById } from "@/src/actions/auth.actions";
import { paths } from "@/src/contants";

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

  const setUser = (updatedUser, accessToken) => {
    dispatch({
      type: Types.INITIAL,
      payload: {
        user: {
          ...updatedUser,
        },
      },
    });
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.AUTH.login, data);

      const { accessToken, user } = response.data || {};
      setSession(accessToken, {
        ...user,
      });
      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });
      enqueueSnackbar("Login successfully", { variant: "success" });
      router.push("/");
    } catch (err) {
      enqueueSnackbar(err?.message, { variant: "error" });
      console.log("Login Error", err?.message);
    }
  }, []);

  const register = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.AUTH.signup, data);

      if (response.status === 201) {
        localStorage.setItem("signupEmail", data?.email);
        router.push("/verify-code?step=signup");
      }
    } catch (err) {
      enqueueSnackbar(err?.message, { variant: "error" });
      console.log("errror in register ", err);
    }
  }, []);

  const setupUserType = useCallback(async (user_type) => {
    try {
      const userDetails = JSON.parse(sessionStorage.getItem("user"));
      let data = { id: userDetails?.id, user_type };
      console.log("data", state);

      const response = await axiosInstance.post(
        endpoints.AUTH.setup_user_type,
        data
      );

      const { accessToken, user } = await response.data;

      setSession(accessToken, {
        ...user,
      });

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });

      enqueueSnackbar("Success", { variant: "success" });
      router.push(
        user?.user_type === "HOTEL" ? "/hotel-dashboard" : "/hotel-dashboard"
      );
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
      console.log(error);
    }
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    // router.push(paths.auth.login);
    router.push("/");
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const otpVerification = useCallback(async (step, code) => {
    if (step === "signup") {
      try {
        const email = localStorage.getItem("signupEmail");
        let data = { email, otp: code };
        const response = await axiosInstance.post(
          endpoints.AUTH.verify_user_OTP,
          data
        );
        if (response.status === 201) {
          setSession(response?.data?.data?.accessToken);
          localStorage.removeItem("signupEmail");
          dispatch({
            type: Types.LOGIN,
            payload: {
              user: response.data?.data?.user,
            },
          });
          enqueueSnackbar("User verified successfully", { variant: "success" });
          router.push("/setup-user-profile");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    } else {
      try {
        const email = localStorage.getItem("forgotEmail");
        let data = { email, otp: code };
        const response = await axiosInstance.post(
          endpoints.AUTH.forget_password.verify_forget_password_otp,
          data
        );
        localStorage.setItem("forgotOtp", code);
        if (response.status == 200) {
          router.push("/set-new-password");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    }
  }, []);

  const resetPasswordHandle = useCallback(async (newPassword) => {
    try {
      const email = localStorage.getItem("forgotEmail");
      const otp = localStorage.getItem("forgotOtp");

      if (!email || !otp) {
        enqueueSnackbar(
          "Opps, Unable to Reset password! We think you miss some steps",
          { variant: "warning" }
        );
        router.push("/login");
      }

      let data = { email, otp, newPassword };
      const response = await axiosInstance.post(
        endpoints.AUTH.forget_password.reset_password,
        data
      );

      if (response.status == 201) {
        enqueueSnackbar("Reset Password sucessfully", { variant: "success" });
        const { accessToken, user } = response.data?.data || {};
        localStorage.removeItem("forgotEmail");
        localStorage.removeItem("forgotOtp");

        setSession(accessToken);
        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        });

        router.push("/login");
      }
    } catch (err) {
      enqueueSnackbar(err?.message, { variant: "error" });
      console.log("Reset Error", err?.message);
    }
  }, []);

  const forgotPasswordHandle = useCallback(async (email) => {
    try {
      localStorage.setItem("forgotEmail", email);
      let data = { email };
      const response = await axiosInstance.post(
        endpoints.AUTH.forget_password.request_otp,
        data
      );
      if (response.status === 200) {
        const message =
          response?.data?.message || "Password reset email sent successfully";
        enqueueSnackbar(message, { variant: "success" });
        router.push("/verify-code?step=forgot");
      }
    } catch (error) {
      console.log("forget password error", error);
      const errorMessage =
        error?.message || "Failed to send password reset email";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state?.user,
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
      setupUserType,
      logout,
      setUser,
    }),
    [login, logout, register, state.user, status, setupUserType, setUser]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {children}
      </SnackbarProvider>
    </AuthContext.Provider>
  );
}
