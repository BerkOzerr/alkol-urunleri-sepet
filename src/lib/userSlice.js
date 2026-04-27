import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "./axiosClient";
import { toast } from "react-toastify";

export const login = createAsyncThunk("login", async (user) => {
  try {
    //console.log(user);
    const response = await client.post("/login", user);
    return response;
  } catch (error) {
    return error;
  }
});

export const register = createAsyncThunk("register", async (user) => {
  try {
    console.log(user);
    const response = client.post("/register", user);
    // console.log(response);
    return response;
  } catch (error) {
    //console.error("Error", error);
    return error;
  }
});

const initialState = {
  login_user: {
    email: "",
    password: "",
    error: "",
    authonticate: localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : false,
  },
  register_user: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    error: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Logout: (state) => {
      state.login_user = initialState;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("cartList");
      toast.info("Kullanıcı çıkışı başarılı.", { position: "bottom-center" });
      return;
    },
    registerClickOpen: (state) => {
      state.register_user = initialState;
      state.register_user.regisAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.login_user.authonticate = false;
      state.login_user.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log(action.payload.data.token);
      if (action.payload.status === 403) {
        //console.log(action);
        toast.error("Kullanıcı adı veya şifre hatalı...", {
          position: "bottom-center",
        });
        state.login_user.error = "Kullanıcı adı veya şifre Hatalı...";

        return;
      } else if (action.payload.status === 200) {
        //console.log(JSON.parse(action.payload.config.data));
        const userPass = JSON.parse(action.payload.config.data);
        const tempUser = {
          email: userPass.email,
          password: userPass.password,
          authonticate: true,
        };
        //console.log(tempUser);
        state.login_user = { ...tempUser };
        toast.info("Kullanıcı girişi başarılı.", {
          position: "bottom-center",
        });
        localStorage.setItem("accessToken", action.payload.data.token);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("reject ", action);
      state.login_user.authonticate = false;
      state.login_user.error = action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.register_user.regisAuth = false;
      state.register_user.error = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      console.log(action.payload);

      if (action.payload.status === 200) {
        const userPass = JSON.parse(action.payload.config.data);
        const tempUser = {
          email: userPass.email,
          password: userPass.password,
          firstName: userPass.firstName,
          lastName: userPass.lastName,
          regisAuth: true,
        };
        state.register_user = { ...tempUser };
        toast.info(`${action.payload.data.message}`, {
          position: "bottom-center",
        });
      }
      // state.register_user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      //console.log(action.meta);

      if (action.meta.requestStatus === "rejected") {
        state.register_user.regisAuth = false;
        state.register_user.error = `kayıtlı kullanıcı : ${action.meta.arg.email} `;
        toast.error(`kayıtlı kullanıcı : ${action.meta.arg.email} `, {
          position: "bottom-center",
        });
      }
    });
  },
});
export const { Logout, registerClickOpen } = userSlice.actions;

export default userSlice.reducer;
