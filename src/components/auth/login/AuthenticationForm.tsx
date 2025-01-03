import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  EmailAddress,
  ForgetPassword,
  Login,
  Password,
  RememberMe,
  SignUp,
} from "../../../utils/constant";
import { getLoggedInUser, login, signin } from "@/lib/server/appwrite";
import { isValidEmail } from "@/utils/validators";

const AuthenticationForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
    } else if (isValidEmail(email) == false) {
      toast.error("Please enter valid email");
    } else if (password.length < 8 && password.length > 50) {
      toast.error("Please enter a valid password");
    } else {
      const session = await signin(email, password);
      if (session == null) {
        toast.error(
          "Wrong credentials, please enter correct email and password"
        );
      } else {
        redirect("/newsfeed/style2");
      }
    }
  };

  return (
    <Form className="theme-form" onSubmit={(event) => formSubmitHandle(event)}>
      <FormGroup>
        <Label>{EmailAddress}</Label>
        <Input
          type="email"
          defaultValue={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <DynamicFeatherIcon
          iconName="User"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        <Label>{Password}</Label>
        <Input
          type={show ? "text" : "password"}
          defaultValue={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <DynamicFeatherIcon
          iconName="Eye"
          className="input-icon iw-20 ih-20"
          onClick={() => setShow(!show)}
        />
      </FormGroup>
      <div className="bottom-sec">
        <div className="form-check checkbox_animated">
          <Input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          {/* <label className="form-check-label" htmlFor="exampleCheck1">
            {RememberMe}
          </label> */}
        </div>
        <a href="#" className="forget-password">
          {ForgetPassword}
        </a>
      </div>
      <div className="btn-section">
        <Button type="submit" className="btn btn-solid btn-lg auth">
          {Login}
        </Button>
        {/* <Link href="/auth/register" className="btn btn-solid btn-lg ms-auto">
          {SignUp}
        </Link> */}
      </div>
    </Form>
  );
};

export default AuthenticationForm;
