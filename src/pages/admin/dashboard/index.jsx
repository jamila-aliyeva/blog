import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getPosts } from "../../../redux/action";

import "./index.scss";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { total, loading } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <h2 style={{}}>Dashboard</h2>
        <Link>Admin's full name </Link>
      </div>
      <div className="dashboard-middle">
        <div>
          <h3>Hi, Someone</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            veritatis beatae commodi dolore.
          </p>
        </div>
        <div>
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/software-developer-2-910975.png"
            alt=""
          />
        </div>
      </div>
      <h3 style={{ margin: "50px", textAlign: "center" }}>Overview</h3>
      <div className="dashboard-wrap">
        <div className="dashboard-card">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6821/6821002.png"
              alt=""
            />
          </div>
          <div>Categories: {loading ? "..." : total}</div>
        </div>
        <div className="dashboard-card">
          <div>
            <img
              src="https://w7.pngwing.com/pngs/502/794/png-transparent-white-arrow-going-up-computer-icons-dashboard-car-symbol-dashboard-icon-miscellaneous-angle-logo.png"
              alt=""
            />
          </div>
          <div>Posts: {loading ? "..." : total}</div>
        </div>
      </div>
      <div style={{ marginTop: "60px" }}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptas
          iusto unde hic excepturi possimus. Suscipit cupiditate earum
          recusandae exercitationem maiores voluptates corrupti odit voluptatem
          perferendis aliquam tempora excepturi ullam fugiat odio deleniti
          asperiores fugit, eum inventore! Impedit assumenda fuga tenetur rerum
          optio perferendis. Assumenda quam laboriosam reprehenderit, dolores,
          non voluptatem natus nemo corrupti dolor animi soluta accusantium
          repellat, autem placeat. Provident, quam blanditiis velit enim
          inventore quae neque impedit, natus ex quas aspernatur nam hic saepe
          eligendi. Explicabo minima magni iure quisquam hic quam magnam quae
          esse tempore, sunt eligendi nostrum quaerat! Excepturi aliquam omnis
          debitis eos incidunt necessitatibus?
        </p>
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vitae
          debitis voluptatum, aliquam iste perspiciatis aperiam ipsam, explicabo
          laboriosam exercitationem, quo adipisci dolor pariatur molestias
          delectus ratione cum itaque illum perferendis provident beatae sit
          maxime quidem labore? Inventore, adipisci fuga.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
