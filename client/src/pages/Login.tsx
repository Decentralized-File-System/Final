import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GridLoader from "react-spinners/GridLoader";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormValues>();
  const { login, setCurrentUser } = useAuth();

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    setError("");
    try {
      setLoading(true);
      const res = await login(data.email, data.password);
      setLoading(false);
      setCurrentUser(res.data);
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  const anchorHandler = () => {
    history.push("/signup");
  };
  return (
    <div className="login-signup-container">
      <div className="login-signup-card " style={{ background: "white" }}>
        {!loading ? (
          <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(submitForm)}>
              <div className="error-div">{error}</div>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  {...register("email")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required
                  {...register("password")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className="login-signup-link">
              <p onClick={anchorHandler}>Sign up Here</p>
            </div>
          </>
        ) : (
          <div className="login-spinner-container">
            <GridLoader size={94} color={"rgb(76, 87, 95)"} css={override} />
          </div>
        )}
      </div>
    </div>
  );
};
