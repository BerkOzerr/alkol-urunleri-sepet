import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { useDispatch, useSelector } from "react-redux";
import { login, registerClickOpen } from "../lib/userSlice";
function LoginForm() {
  const [userlogic, setUserLogic] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.login_user.authonticate) {
      navigate("/");
    }
    if (user.login_user.error) {
      console.log(user.login_user.error);
      setErrorMessage(user.login_user.error);
    }
  }, [user]);

  const handleChange = (e) => {
    // console.log(e.target.name + e.target.value);
    setUserLogic({
      ...userlogic,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.name);

    if (e.target.name === "submit") {
      if (
        userlogic.email === "" ||
        userlogic.password === "" ||
        userlogic.email === null ||
        userlogic.password === null
      ) {
        setErrorMessage("E-mail password not null.");
        return;
      }
      dispatch(login(userlogic));
    }
    if (e.target.name === "cancel") {
      setUserLogic({
        email: "",
        password: "",
      });
      return;
    }
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center w-full min-h-svh">
      <form className="w-full max-w-sm">
        <Card className="w-auto max-w-sms flex dark:bg-white dark:text-black items-center justify-center p-10">
          <FieldGroup>
            <Field className="w-full flex flex-row items-center justify-between">
              <FieldTitle>Login Form</FieldTitle>
              <Link className="max-w-fit" to={"/"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  className="cursor-pointer hover:fill-indigo-400"
                >
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
              </Link>
            </Field>
            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                onChange={(e) => handleChange(e)}
                id="form-email"
                type="email"
                placeholder="john@example.com"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                value={userlogic.email}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-password">Password</FieldLabel>
              <Input
                onChange={(e) => handleChange(e)}
                id="form-password"
                type="password"
                placeholder="Şifrenizi Girin"
                name="password"
                value={userlogic.password}
                required
              />
            </Field>
            <Field>
              <Link
                onClick={() => dispatch(registerClickOpen())}
                to={"/register"}
              >
                Register
              </Link>
            </Field>
            <Field>
              <Button
                id="cancel"
                onClick={(e) => handleSubmit(e)}
                type="button"
                className=""
                name="cancel"
                variant="destructive"
              >
                Cancel
              </Button>
              <Button
                className="dark:bg-black dark:text-white"
                onClick={(e) => handleSubmit(e)}
                type="submit"
                name="submit"
                variant="default"
              >
                Submit
              </Button>
            </Field>
            <Field>
              {errorMessage ? (
                <FieldDescription className="font-bold text-red-600 animate-bounce">
                  {errorMessage}
                </FieldDescription>
              ) : (
                <FieldDescription></FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </Card>
      </form>
    </div>
  );
}

export default LoginForm;
