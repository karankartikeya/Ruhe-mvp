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
import { login } from "@/actions/auth";

const AuthenticationForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("karankartikey72@gmail.com");
  const [password, setPassword] = useState("Test123@");

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <Form className="theme-form" onSubmit={(event) => formSubmitHandle(event)}>
      <FormGroup>
        <Label>{EmailAddress}</Label>
        <Input
          type="email"
          placeholder="Test@gmail.com"
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
          placeholder="*********"
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
          <label className="form-check-label" htmlFor="exampleCheck1">
            {RememberMe}
          </label>
        </div>
        <a href="#" className="forget-password">
          {ForgetPassword}
        </a>
      </div>
      <div className="btn-section">
        <Button type="submit" className="btn btn-solid btn-lg">
          {Login}
        </Button>
        <Link href="/auth/register" className="btn btn-solid btn-lg ms-auto">
          {SignUp}
        </Link>
      </div>
    </Form>
  );
};

export default AuthenticationForm;
