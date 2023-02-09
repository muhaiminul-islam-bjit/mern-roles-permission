import { Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/logo.svg";
import LoginForm from "../../../components/forms/auth/loginForm";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { Title } = Typography;
  const loginSuccess = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <Card style={{ width: "400px" }}>
        <div>
          <Link to="/">
            <img
              className="mx-auto h-12 w-auto"
              src={logoImage}
              alt="Learn with sumit"
              height="150px"
              width="250px"
            />
          </Link>
          <Title level={2}>Welcome</Title>
          <div className="login__form">
            <LoginForm onSuccess={loginSuccess} />
          </div>
        </div>
      </Card>
    </div>
  );
}
