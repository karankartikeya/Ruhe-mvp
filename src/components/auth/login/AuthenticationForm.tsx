import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  EmailAddress,
  ForgetPassword,
  Login,
  Password,
  RememberMe,
  SignUp,
} from "../../../utils/constant";
import { Client, Account, ID } from "appwrite";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

const AuthenticationForm = async () => {
  const router = useRouter();
  const {account} = await createAdminClient();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("Test123@gmail.com");
  const [password, setPassword] = useState("Test@123");

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("email....", email);
    console.log("password...", password);
    const result = await account.createEmailPasswordSession(
      "karankartikey72@gmail.com",
      "Test123@"
    );
    console.log("result....", result);
    if (result) {
      toast.success("successfully Logged in Rediract......");
      router.push("/newsfeed/style2");
    } else {
      toast.error("Invalid Credential...");
    }
    console.log("result data....", result);
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
