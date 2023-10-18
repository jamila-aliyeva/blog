import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        color: "#fff",
      }}>
      <h2
        style={{
          textAlign: "center",
          paddingTop: "200px",
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "38px",
        }}>
        OOPS! YOU RUN OUT OXYGEN{" "}
      </h2>
      <h4
        style={{
          textAlign: "center",
          paddingTop: "30px",
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "30px",
        }}>
        The Page You're looking for is now beyond our reach
      </h4>
      <h4
        style={{
          textAlign: "center",
          paddingTop: "30px",
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "30px",
        }}>
        Let's get you...
      </h4>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          to="/"
          style={{
            padding: "20px",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "30px",
            cursor: "pointer",
            background: "#fff",
          }}>
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
