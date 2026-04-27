import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../lib/userSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userReg, SetUserReg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.register_user.error) {
      //console.log(user.register_user.error);
      setErrorMessage(user.register_user.error);
    }
    if (user.register_user.regisAuth) {
      navigate("/login");
    }
  }, [user]);
  const handleChange = (e) => {
    SetUserReg({ ...userReg, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === "cancel") {
      SetUserReg({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      return;
    }
    if (e.target.name === "submit") {
      if (
        userReg.email === "" ||
        userReg.email === null ||
        userReg.password === "" ||
        userReg.password === null ||
        userReg.firstName === "" ||
        userReg.firstName === null ||
        userReg.lastName === null ||
        userReg.lastName === ""
      ) {
        setErrorMessage("Empty or type controled.");
        return;
      }

      dispatch(register(userReg));
    }
    setErrorMessage("");
  };

  return (
    <div className="flex dark:bg-black items-center justify-center w-full min-h-svh">
      <form className="w-full max-w-sm">
        <Card className="w-auto max-w-sms flex items-center dark:bg-white dark:text-black justify-center p-10">
          <FieldGroup>
            <Field className="w-full flex flex-row items-center justify-between">
              <FieldTitle>Register Form</FieldTitle>
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
              <FieldLabel htmlFor="form-name">First Name</FieldLabel>
              <Input
                name="firstName"
                id="form-first-name"
                type="text"
                placeholder="Evil"
                required
                onChange={(e) => handleChange(e)}
                value={userReg.firstName}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-name">Last Name</FieldLabel>
              <Input
                name="lastName"
                id="form-last-name"
                type="text"
                placeholder="Rabbit"
                required
                onChange={(e) => handleChange(e)}
                value={userReg.lastName}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                name="email"
                id="form-email"
                type="email"
                placeholder="john@example.com"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={(e) => handleChange(e)}
                value={userReg.email}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-password">Password</FieldLabel>
              <Input
                name="password"
                id="form-password"
                type="password"
                placeholder="Şifrenizi Girin"
                required
                onChange={(e) => handleChange(e)}
                value={userReg.password}
              />
            </Field>

            <Field>
              <Link to={"/login"}>
                <FieldLabel
                  className="hover:cursor-pointer "
                  htmlFor="form-login"
                >
                  Login
                </FieldLabel>
              </Link>
            </Field>
            <Field>
              <Button
                id="cancel"
                onClick={(e) => handleSubmit(e)}
                type="button"
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
