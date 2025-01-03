import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FullName, Password, SignUp } from "../../../utils/constant";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  checkPhone,
  checkUsername,
  getLoggedInUser,
  login,
  signup,
} from "@/lib/server/appwrite";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhoneNumber } from "@/utils/validators";
import { redirect } from "next/navigation";
import { set } from "lodash";

const RegisterForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(13);
  const [gender, setGender] = useState("");
  const [customGender, setCustomGender] = useState("");
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [usernameValid, setUsernameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const checkUsernameValidorNot = async (username: string) => {
    // console.log("checkUsernameValidorNot", username);
    setIsChecking(true);
    const usernameValid = await checkUsername(username);
    setUsernameValid(usernameValid);
    // console.log("usernameValid", usernameValid);
    // console.log(
    //   "part1",
    //   "checking=",
    //   isChecking,
    //   "usernameValid=",
    //   usernameValid
    // );
    setIsChecking(false);

    // console.log(
    //   "part2",
    //   "checking=",
    //   isChecking,
    //   "usernameValid=",
    //   usernameValid
    // );
  };

  const checkPhoneValidorNot = async (phone: string) => {
    setIsCheckingPhone(true);
    const phoneValid = await checkPhone(phone);
    setPhoneValid(phoneValid);
    setIsCheckingPhone(false);
    console.log("phoneValid", phoneValid);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      checkUsernameValidorNot(event.target.value);
    }, 2000); //2 second debounce
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      checkPhoneValidorNot(event.target.value);
    }, 2000); //2 second debounce
  };

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    // console.log("formSubmitHandle");
    event.preventDefault();
    //perform all checks for input fields also check for null
    if (
      !email ||
      !password ||
      !name ||
      !phone ||
      !age ||
      !gender ||
      !username
    ) {
      toast.error("Please fill all the fields");
      console.log("Please fill all the fields");
    } else if (
      email == null ||
      password == null ||
      name == null ||
      phone == null ||
      age == null ||
      gender == null
    ) {
      toast.error("Please fill all the field122s");
      console.log("Please fill all the field122s");
    } else if (isValidEmail(email) == false) {
      toast.error("Please enter a valid email");
      console.log("Please enter a valid email");
    } else if (isValidPhoneNumber(phone) == false) {
      toast.error("Please enter a valid phone number");
      console.log("Please enter a valid phone number");
    } else if (usernameValid == false) {
      toast.error("Username is already taken");
      console.log("Username is already taken");
    } else if (phoneValid == false) {
      toast.error("Phone number is already registered");
      console.log("Phone number is already registered");
    } else if (name.length > 50) {
      toast.error("Name should be less than 50 characters");
      console.log("Name should be less than 50 characters");
    } else if (password.length < 8) {
      toast.error("Password should be atleast 8 characters long");
      console.log("Password should be atleast 8 characters long");
    } else if (age < 13) {
      toast.error("Age should be greater than 13");
      console.log("Age should be greater than 13");
    } else if (gender == "custom" && customGender == null) {
      toast.error("Please enter your gender");
    } else if (gender == "custom" && customGender.length == 0) {
      toast.error("Please enter your custom gender");
    } else if (gender == "custom" && customGender.length > 50) {
      toast.error("Please enter the gender less than 50 characters");
    } else if (gender == "custom") {
      const user = signup(
        email,
        password,
        name,
        phone,
        age,
        customGender,
        username
      );
      if (!user) {
        toast.error("Error registering the user");
        return;
      }
      const session = await login(email, password);
      if (!session) {
        toast.error(
          "Something went wrong. Please log into your account after some time"
        );
        return;
      }
      const isLoggedIn = await getLoggedInUser();
      if (isLoggedIn) {
        redirect("/profile/timeline");
      } else {
        toast.error("Logging in error");
      }
      // console.log(
      //   "name",
      //   name,
      //   "phone",
      //   phone,
      //   "age",
      //   age,
      //   "gender",
      //   customGender.length,
      //   gender
      // );
    } else {
      const user = signup(email, password, name, phone, age, gender, username);
      if (!user) {
        toast.error("Error registering the user");
        return;
      }
      const session = await login(email, password);
      if (!session) {
        toast.error(
          "Something went wrong. Please log into your account after some time"
        );
        return;
      }
      const isLoggedIn = await getLoggedInUser();
      if (isLoggedIn) {
        redirect("/profile/timeline");
      } else {
        toast.error("Logging in error");
      }

      // console.log("name", name, "phone", phone, "age", age, "gender", gender);
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

      <FormGroup>
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Username"
          defaultValue={username}
          onChange={(event) => handleUserNameChange(event)}
        />
        <DynamicFeatherIcon
          iconName="User"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>

      <FormGroup>
        {username.length == 0 ? (
          <p></p>
        ) : isChecking ? (
          <p>Checking...</p>
        ) : usernameValid ? (
          <p className="ih-20 username-success">Username is available</p>
        ) : (
          <p className="ih-20 username-warning">Username is not available</p>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          type="text"
          placeholder="Phone Number"
          defaultValue={phone}
          onChange={(event) => handlePhoneChange(event)}
        />
        <DynamicFeatherIcon
          iconName="Phone"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        {phone.length == 0 ? (
          <p></p>
        ) : isCheckingPhone ? null : phoneValid ? null : (
          <p className="ih-20 username-warning">
            PhoneNumber is already registered
          </p>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Age</Label>
        <Input
          type="number"
          placeholder="Age"
          defaultValue={age}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
        <DynamicFeatherIcon
          iconName="Calendar"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        <Label for="genderSelect">Gender</Label>
        <Input
          type="select"
          name="select"
          id="genderSelect"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="" disabled hidden>
            Select Gender
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
          <option value="custom">Custom</option>
        </Input>

        {gender === "custom" && (
          <Input
            type="text"
            name="customGender"
            id="customGender"
            placeholder="Enter your gender"
            value={customGender}
            onChange={(e) => setCustomGender(e.target.value)}
          />
        )}
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
        <Button type="submit" className="btn btn-solid btn-lg auth">
          {SignUp}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
