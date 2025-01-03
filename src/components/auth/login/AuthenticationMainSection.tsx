import {
  BiLogoFacebook,
  BiLogoGooglePlus,
  BiLogoTwitter,
} from "react-icons/bi";
import { toast } from "react-toastify";
import { Button, Col, Container, Row } from "reactstrap";
import {
  HelloEveryoneWelcome,
  Login,
  SignUp,
  WelcomeFriendBookLoginAccount,
} from "../../../utils/constant";
import AuthenticationForm from "./AuthenticationForm";
import LoginWelcome from "./LoginWelcome";
import Link from "next/link";

const AuthenticationMainSection: React.FC = () => {
  const handlesubmit = () => {
    toast.error(
      "This is only demo purpose, click on the Sign In button to login."
    );
  };
  return (
    <Container>
      <Row>
        <Col xl="6" lg="5" className="d-none d-lg-block">
          <LoginWelcome />
        </Col>
        <Col xl="6" lg="7" md="10" xs="12" className="m-auto">
          <div className="login-form">
            <div>
              <div className="login-title">
                <h2>{Login}</h2>
              </div>
              <div className="login-discription">
                {/* <h3>{HelloEveryoneWelcome}</h3> */}
                <h4>{WelcomeFriendBookLoginAccount}</h4>
              </div>
              <div className="form-sec">
                <div>
                  <AuthenticationForm />
                  <div className="connect-with">
                    <h6>
                      <span>Don&apos;t have an account?</span>
                    </h6>
                    {/* <ul className='social-links'>
                      <li className={"google"}>
                        <Button color='' onClick={handlesubmit}>
                          <BiLogoGooglePlus />
                        </Button>
                      </li>
                      <li className={"facebook"} onClick={handlesubmit}>
                        <Button color=''>
                          <BiLogoFacebook />
                        </Button>
                      </li>
                      <li className={"twitter"} onClick={handlesubmit}>
                        <Button color=''>
                          <BiLogoTwitter />
                        </Button>
                      </li>
                    </ul> */}
                    <div className="btn-section">
                      <Link
                        href="/auth/register"
                        className="btn btn-solid btn-lg auth"
                      >
                        {SignUp}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthenticationMainSection;
