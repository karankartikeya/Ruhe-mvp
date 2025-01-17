import { AccountSettings, SaveChanges } from "../../utils/constant";
import { FormEvent, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import { Href } from "../../utils/constant/index";
import { deleteUser } from "@/lib/server/appwrite";
import { useAppSelector } from "@/utils/hooks";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const AccountSetting: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const user = useAppSelector((state) => state.userSlice.data);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toggle) {
      toast.error("Please check the checkbox to delete your account");
      return;
    }
    const deleteUserRequest = await deleteUser(user.$id, user.userId);
    if (deleteUserRequest == null || deleteUserRequest == undefined) {
      toast.error("Error deleting account");
    }
    toast.success("Account deleted successfully");
    redirect("/authentication/login");
  };

  return (
    <div className="setting-wrapper">
      <div className="setting-title">
        <h3>{AccountSettings}</h3>
      </div>
      <div className="form-sec">
        <div>
          <form className="theme-form form-sm" onSubmit={onSubmit}>
            <Row>
              {/* <Col xs="12"  className="form-group">
                <Label>current password</Label>
                <Input type="password" autoComplete="" placeholder="current password"/>
              </Col>
              <Col sm="6" className="form-group">
                <Label>new password</Label>
                <Input type="password" autoComplete="" placeholder="new password"/>
              </Col>
              <Col sm="6"  className="form-group">
                <Label>repeat password</Label>
                <Input type="password" autoComplete="" placeholder="repeat password"/>
              </Col> */}
              <Col xs="12" className="form-group">
                <label>Delete my Account</label>
              </Col>
              <Col xs="12" className="form-group">
                <label>
                  Warning:&nbsp;
                  <span>
                    Deleting your account will delete all of your data,
                    including your profile, posts, comments, and likes. This
                    action cannot be undone. Are you sure you want to delete?
                  </span>
                </label>
              </Col>
              <Col xs="12" className="form-group toggle-sec">
                <div className="button toggle-btn">
                  <input
                    type="checkbox"
                    defaultChecked
                    onClick={() => setToggle(!toggle)}
                    className="checkbox"
                  />
                  <div className="knobs">
                    <span />
                  </div>
                  <div className="layer" />
                </div>
              </Col>
            </Row>

            <div className="text-right">
              <button className="btn btn-solid" type="submit">
                {SaveChanges}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
