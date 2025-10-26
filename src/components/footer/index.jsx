import { logo_text } from "../../assets/icons";
import Container from "../container";
import Icon from "../icon";
import instagramIcon from "../../assets/icons/instagram.svg";
import tiktokIcon from "../../assets/icons/tiktok2.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import emailIcon from "../../assets/icons/email.svg";
import phoneIcon from "../../assets/icons/phone.svg";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-[#00B4D8] text-light-1">
        <Container className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <Icon
                src={logo_text}
                size="logo"
                description="ifl-malang"
                className="mx-auto md:mx-0"
              />
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/ifutureleaders_malang?igsh=NGMxNm12YTM4eG42"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="h-10 w-10"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@iflchaptermalang?_t=8qszKNCeAJb&_r=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={tiktokIcon} alt="Tiktok" className="h-10 w-10" />
                </a>
                <a
                  href="https://www.linkedin.com/company/indonesian-future-leaders/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    className="h-10 w-10"
                  />
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Feature</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/tentang-kami">About Us</a>
                </li>
                <li>
                  <a href="/program">Events</a>
                </li>
                <li>
                  <a href="/artikel">Article</a>
                </li>
                <li>
                  <a href="/#shop">Catalog</a>
                </li>
                <li>
                  <a href="/donasi">Donate</a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Our Team</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/nondept">Non Department</a>
                </li>
                <li>
                  <a href="/hrd">Human Resource Development</a>
                </li>
                <li>
                  <a href="/dpp">Program & Project</a>
                </li>
                <li>
                  <a href="/comper">Communication & Cooperation</a>
                </li>
                <li>
                  <a href="/cdsi">Creative Design & System Information</a>
                </li>
                <li>
                  <a href="/bismar">Business & Marketing</a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex flex-col items-center md:flex-row md:items-start md:space-x-2">
                  <img src={emailIcon} alt="Email" className="h-6 w-6" />
                  <span className="mt-2 md:mt-0">
                    iflchaptermalang@gmail.com
                  </span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start md:space-x-2">
                  <img src={phoneIcon} alt="Phone" className="h-6 w-6" />
                  <span className="mt-2 md:mt-0">+6281210499440</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <div className="w-full bg-white flex items-center justify-center h-1">
        <p className="text-[#00B4D8] mb-14 font-medium">
          Copyright &copy; 2025 Indonesian Future Leaders Chapter Malang
        </p>
      </div>
    </footer>
  );
};

export default Footer;
