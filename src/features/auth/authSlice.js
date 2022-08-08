import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiContants from "../../constants/Api";
import qs from "qs";
import getErrorMessage from "../../utils/getErrorMessage";
import LoadingState from "../../constants/LoadingState";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import history from "../../customRoutes/history";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ authAPI, ...params }, { rejectWithValue }) => {
    try {
      const response = await authAPI.post(
        ApiContants.LOGIN,
        qs.stringify({ ...params }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      Cookies.set("token", response.data.accessToken, { expires: 1 });
      Cookies.set("refreshToken", response.data.refreshToken, { expires: 1 });
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const refresh_token = Cookies.get("refreshToken");
  if (!refresh_token) throw new Error();
  const response = await axios.get(ApiContants.REFRESH_TOKEN, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  console.log('refresh token success!');
  Cookies.set("token", response.data.accessToken, { expires: 1 });
  Cookies.set("refreshToken", response.data.refreshToken, { expires: 1 });
  return response.data;
});
export const tryLocalSignIn = createAsyncThunk(
  "auth/tryLocalSignIn",
  async ({ dispatch }, thunkAPI) => {
    const token = Cookies.get("token");
    if (token) {
      const user = jwt_decode(token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        return token;
      } else {
        await dispatch(refreshToken());
      }
    }
  }
);

const initialState = {
  user: {},
  token: "",
  loading: LoadingState.IDLE,
  errorMessage: null,
};

// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.token = "";
      state.loading = LoadingState.IDLE;
      state.errorMessage = null;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      history.replace("/");
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading = LoadingState.PENDING;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = LoadingState.FAILED;
      state.errorMessage = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = LoadingState.SUCCEEDED;
      state.errorMessage = null;
      state.token = action.payload.accessToken;
    });
    // refresh token
    builder.addCase(refreshToken.pending, (state, action) => {
      state.loading = LoadingState.PENDING;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.token = "";
      state.loading = LoadingState.FAILED;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      history.replace("/");
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = LoadingState.SUCCEEDED;
      state.token = action.payload.accessToken;
    });
    // tryLocalSignIn
    builder.addCase(tryLocalSignIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload;
      }
    });
  },
});
export const { setLoading, setErrorMessage, logout } = authSlice.actions;
export default authSlice.reducer;
