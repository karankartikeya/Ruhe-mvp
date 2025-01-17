"use client";
import Calender from "@/components/Event/Calender";
import CalenderBottom from "@/components/Event/CalenderBottom";
import EventCategory from "@/components/Event/EventCategory";
import EventSlider from "@/components/Event/EventSlider";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import ActivityFeed from "@/components/profile/ActivityFeed";
import ProfileLayout from "@/layout/ProfileLayout";
import { Col, Container, Row } from "reactstrap";

const ProfileTimeLine = () => {
  return (
    <ProfileLayout title="moodfeed" loaderName="profileTimeLine">
      <Container fluid className="section-t-space px-0">
        <Row className="event-body">
          <Col xl="6">
            <EventSlider />
            <EventCategory />
          </Col>
          <Col xl="6">
            <div className="calender-section custom-calender section-t-space  section-b-space">
              <Calender />
              <CalenderBottom />
            </div>
          </Col>
        </Row>
      </Container>
    </ProfileLayout>
  );
};

export default ProfileTimeLine;
