import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";
import { useState } from "react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormValues>();
  const { signup, setCurrentUser } = useAuth();

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const res = await signup(data.email, data.username, data.password);
      setLoading(false);
      setCurrentUser(res.data);
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const anchorHandler = () => {
    history.push("/login");
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-card" style={{ background: "white" }}>
        {!loading ? (
          <>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit(submitForm)}>
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  required
                  {...register("username")}
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
                Sign Up
              </Button>
            </Form>
          </>
        ) : (
          <div className="login-spinner-container">
            <GridLoader size={94} color={"rgb(76, 87, 95)"} css={override} />
          </div>
        )}
        <div className="login-signup-link">
          <p onClick={anchorHandler}>Login Here</p>
        </div>
      </div>
    </div>
  );
};
