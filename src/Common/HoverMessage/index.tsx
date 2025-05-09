import { UncontrolledPopover, PopoverBody, Media } from "reactstrap";
import ButtonPopover from "./ButtonPopover";
import { ImagePath, SvgPath } from "../../utils/constant";
import Image from "next/image";
import { HoverMessageProps } from "@/layout/LayoutTypes";
import { useEffect } from "react";

const HoverMessage = ({ name, target, placement, imagePath }: HoverMessageProps) => {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any) => {
      if (!/defaultProps/.test(args[0])) {
        originalError(...args);
      }
    };
  
    return () => {
      console.error = originalError; // Restore original error on cleanup
    };
  }, []);
  return (
    <UncontrolledPopover trigger="hover" placement={placement} target={target}>
      <PopoverBody>
        <Media className="popover-media">
          <Image height={60} width={60} className="img-fluid user-img" src={imagePath} alt="user" />
          <Media body>
            <h4>{name}</h4>
            <h6>
              <Image height={15} width={15} src={`${SvgPath}/users.svg`} className="img-fluid" alt="users" />
              30 mutual friend
            </h6>
            <h6>
              <Image height={15} width={15} src={`${SvgPath}/map-pin.svg`} className="img-fluid" alt="users" />
              lives in london
            </h6>
          </Media>
        </Media>
        <ButtonPopover />
      </PopoverBody>
    </UncontrolledPopover>
  );
};

export default HoverMessage;
