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
import { useSession } from "next-auth/react";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

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

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (data) => {
    try {
      const { email, password } = data || {};

      const result = await loginWithCreds({ email, password });
      if (result.statusCode == 200) {
        toast.success("Login sucessfully.");
        const { accessToken, user } = result.data || {};

        console.log(user);
        setSession(accessToken, {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
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

  const register = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.AUTH.signup, data);

      if (response.status === 201) {
        localStorage.setItem("signupEmail", data?.email);
        router.push("/verify-code?step=signup");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      enqueueSnackbar(err?.message, { variant: "error" });
      console.log("errror in register ", err);
    }
  }, []);

  const setupUserType = useCallback(async (user_type) => {
    try {
      console.log("state", state, user_type);
      let data = { id: state.user.id, user_type };

      const response = await axiosInstance.post(
        endpoints.AUTH.setup_user_type,
        data
      );
      console.log("response", response);

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
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      console.log(error);
    }
  });

  const logout = useCallback(async () => {
    setSession(null);

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
      setupUserType,
      logout,
    }),
    [login, logout, register, state.user, status, setupUserType]
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
