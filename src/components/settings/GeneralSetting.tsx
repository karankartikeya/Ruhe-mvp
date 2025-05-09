import {
  Address,
  BackupEmail,
  City,
  Country,
  DateOfBirth,
  Email,
  FirstName,
  Gender,
  GeneralSettings,
  LastName,
  SaveChanges,
  State,
} from "../../utils/constant";
import { FormEvent, useRef, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { Href } from "../../utils/constant/index";
import { User } from "../../../types";
import { useAppSelector } from "@/utils/hooks";
import { checkPhone, updateUser } from "@/lib/server/appwrite";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import LoadingLoader from "@/layout/LoadingLoader";

const GeneralSetting: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.data);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const checkPhoneValidorNot = async (phone: string) => {
    setIsCheckingPhone(true);
    const phoneValid = await checkPhone(phone);
    setPhoneValid(phoneValid);
    setIsCheckingPhone(false);
    console.log("phoneValid", phoneValid);
  };

  const [formData, setFormData] = useState({
    docId: user.$id,
    fullName: user.name,
    email: user.email,
    username: user.username,
    phone: user.phone,
  });
  const { fullName, email, username, phone } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(FormData);
    const fullName: string =
      formData.fullName == "" ? user.name : formData.fullName;
    const email: string = formData.email == "" ? user.email : formData.email;
    // const username: string = formData.username == "" ? user.username : formData.username;
    const phone: string = formData.phone == "" ? user.phone : formData.phone;
    console.log("Hi guys I am here at the start");
    const updatedUser = await updateUser({
      docId: user.$id,
      name: fullName,
      email: email,
      phone: phone,
    });
    if (!updatedUser) {
      console.log("Error updating user");
      toast.error("Error updating user");
    }
    toast.success("User updated successfully");
    console.log("User updated successfully");
  };
  return (
    <div className="setting-wrapper">
      <div className="setting-title">
        <h3>{GeneralSettings}</h3>
      </div>
      <div className="form-sec">
        <div>
          <form
            className="theme-form form-sm"
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              event.preventDefault()
            }
          >
            <Row>
              <Col md="6" className="form-group">
                <Label>FullName</Label>
                <Input
                  type="text"
                  value={fullName}
                  placeholder="FullName"
                  disabled
                />
              </Col>
              <Col md="6" className="form-group">
                <Label>{Email}</Label>
                <Input type="email" value={email} disabled />
              </Col>
              {/* <Col xs="12" className="form-group">
                <Label>{Address}</Label>
                <Input type="text" placeholder="1234 Main St"/>
              </Col>
              <Col md="4" className="form-group">
                <Label>{City}</Label>
                <Input defaultValue="london" type="text"/>
              </Col>
              <Col md="4" className="form-group">
                <Label >{State}</Label>
                <Input type="select" >
                  <option value="">Choose...</option>
                  <option>...</option>
                </Input>
              </Col>
              <Col md="4" className="form-group">
                <Label >{Country}</Label>
                <Input type="select" >
                  <option value="">Choose...</option>
                  <option>...</option>
                </Input>
              </Col> */}
              <Col md="6" className="form-group">
                <Label>{DateOfBirth}</Label>
                <div className="gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group">
                  <Input placeholder="DD/MM/YYYY" disabled />
                  <span className="input-group-append">
                    <Button className="btn-outline-secondary border-left-0">
                      <i className="gj-icon">event</i>
                    </Button>
                  </span>
                </div>
              </Col>
              <Col md="6" className="form-group">
                <Label>phone no:</Label>
                <input
                  type="number"
                  value={phone}
                  disabled
                  className="form-control"
                  id="inputCity"
                />
              </Col>
              {/* <Col md="4" className="form-group col-md-4">
                <Label >{Gender}</Label>
                <Input type="select" disabled>
                  <option value="">Choose...</option>
                  <option>...</option>
                </Input>
              </Col> */}
            </Row>
            <div className="text-right">
              <button className="btn btn-solid" type="submit" disabled>
                {SaveChanges}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralSetting;
