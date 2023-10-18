import "./index.scss";

import Image1 from "../../../assets/images/about-us-1.png";
import Image2 from "../../../assets/images/about-us-2.png";
const AboutusPage = () => {
  return (
    <>
      <section className="about-top">
        <div className="container">
          <div className="about-us-wrapper">
            <div className="about-card">
              <h5>our mision</h5>
              <h3>
                Creating valuable content for creatives all around the world
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
            <div className="about-card">
              <h5>our virsion</h5>
              <h3>A platform that empowers individuals to improve</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-cards">
        <div className="container">
          <div className="cards-wrapper">
            <div className="card-aside">
              <h2>Our team of creatives</h2>
              <h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
            <div className="card-bside">
              <img src={Image1} alt="" />
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="card-bside">
              <img src={Image2} alt="" />
            </div>
            <div className="card-aside">
              <h2>Our team of creatives</h2>
              <h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutusPage;
