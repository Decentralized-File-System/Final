import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormValues>();
  const { login, setCurrentUser } = useAuth();

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await login(data.email, data.password);
      setCurrentUser(res.data);
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const anchorHandler = () => {
    history.push("/signup");
  };
  return (
    <div className="login-signup-container">
      <div className="login-signup-card ">
        <h1>Login</h1>
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
      </div>
    </div>
  );
};
