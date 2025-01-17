import { settingHomeData } from "@/Data/setting";
import { SvgPath } from "../../utils/constant";
import { Col, Row } from "reactstrap";
import { useAppSelector } from "@/utils/hooks";
import { Dispatch, SetStateAction } from "react";

export interface NavBarInterFace {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const SettingHome: React.FC<NavBarInterFace> = ({
  activeTab,
  setActiveTab,
}) => {
  const user = useAppSelector((state) => state.userSlice.data);
  return (
    <div className="setting-home">
      <div className="top-content">
        <h2>Welcome back {user.name}</h2>
        <p> Choose from the below settings you want to edit.</p>
      </div>
      <Row>
        {settingHomeData.map((data, index) => (
          <Col
            xl="4"
            sm="6"
            key={index}
            onClick={() => setActiveTab(index + 2)}
          >
            <a className="detail-box">
              <img
                src={`${SvgPath}/setting/${data.image}.svg`}
                className="img-fluid blur-up lazyloaded"
                alt=""
              />
              <h3>{data.name}</h3>
              <p>provide all personal detail settings.</p>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SettingHome;
