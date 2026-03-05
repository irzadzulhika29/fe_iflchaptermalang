import { Link } from "react-router-dom";

import { logo_text } from "../../assets/icons";

import Backdrop from "../../components/backdrop";
import Icon from "../../components/icon";
import Background from "../../components/background";

const AuthBackgroundLayout = ({ children }) => {
  return (
    <Background
      src="https://ik.imagekit.io/iflmalang/constant-image/backdrop-login.webp"
      className="min-h-screen !bg-bottom !justify-center p-4 text-dark-1"
      description="Login and Register Background"
    >
      <Link to="/" aria-label="navigate-home">
        <Icon src={logo_text} size="logo" className="absolute block z-1 left-4 top-4 sm:left-8 sm:top-8" description="ifl-malang" />
      </Link>
      <Backdrop intent="primary" />
      {children}
    </Background>
  );
};

export default AuthBackgroundLayout;
