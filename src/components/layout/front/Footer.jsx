import "./Footer.scss";
import facebook from "../../../assets/images/facebook.svg";
import twitter from "../../../assets/images/twitter.svg";
import instagram from "../../../assets/images/instagram.svg";
import linkedin from "../../../assets/images/linkedin.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-aside">
            <p>Finstreet 118 2561 Fintown</p>
            <a href="#">Hello@finsweet.com 020 7993 2905 </a>
          </div>
          <div className="footer-bside">
            <a href="#">
              <img src={facebook} alt="" />
            </a>
            <a href="#">
              <img src={twitter} alt="" />
            </a>
            <a href="#">
              <img src={instagram} alt="" />
            </a>
            <a href="#">
              <img src={linkedin} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
