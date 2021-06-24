import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signup } = useAuth();

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await signup(data.email, data.username, data.password);
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
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
    </div>
  );
};