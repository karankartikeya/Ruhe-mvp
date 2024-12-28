import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FullName, Password, SignUp } from "../../../utils/constant";
import Link from "next/link";
import React, { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { signup } from "@/actions/auth";
import { toast } from "react-toastify";

const RegisterForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("formSubmitHandle");
    event.preventDefault();
    //perform all checks for input fields also check for null
    if (!email || !password || !name) {
      toast.error("Please fill all the fields");
      console.log("Please fill all the fields");
    } else if (email == null || password == null || name == null) {
      toast.error("Please fill all the field122s");
      console.log("Please fill all the field122s");
    } else {
      signup(email, password, name);
    }
  };
  return (
    <form className="theme-form" onSubmit={(event) => formSubmitHandle(event)}>
      <FormGroup>
        <Label>{FullName}</Label>
        <Input
          type="text"
          placeholder="Your Name"
          defaultValue={name}
          onChange={(event) => setName(event.target.value)}
        />
        <DynamicFeatherIcon
          iconName="User"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Input
          type="email"
          placeholder="Enter email"
          defaultValue={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <DynamicFeatherIcon
          iconName="Mail"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        <Label>{Password}</Label>
        <Input
          type={show ? "text" : "password"}
          autoComplete=""
          placeholder="Password"
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
            remember me
          </label> */}
        </div>
        {/* <a href="#">forget password?</a> */}
      </div>
      <div className="btn-section">
        <Button type="submit" className="btn btn-solid btn-lg">
          {SignUp}
        </Button>
        <Link href="/auth/login" className="btn btn-solid btn-lg ms-auto">
          login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
