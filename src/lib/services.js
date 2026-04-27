import { client } from "./axiosClient";
// import { useDispatch, useSelector } from "react-redux";

export function Register(user) {
  // const { error } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  try {
    const response = client.post("/register", user);
    // console.log(user);
    if (!response.ok) {
      response
        .then((result) => {
          //console.log(result);
        })
        .catch((reject) => {
          // console.log(reject.status);
          return reject.status;
        });
    }
    return response;
  } catch (err) {
    // dispatch(ErrorHand(err));
    console.log(err);
    return err;
  }
}
export async function Login(user) {
  try {
    const response = await client.post("/login", user);
    // console.log(response);
    localStorage.setItem("accessToken", response.data.token);
    return response;
  } catch (error) {
    return error;
  }
}
