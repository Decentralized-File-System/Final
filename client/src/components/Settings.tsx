import React from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Divider from "@material-ui/core/Divider";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../Utils/Variables";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);

type FormValues = {
  currentPassword: string;
  newEmail: string;
  newPassword: string;
};

export const Settings = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const submitForm: SubmitHandler<FormValues> = async (data) => {
    if (!data.newEmail && !data.newPassword) {
      alert("please fill the password or the email");
      return;
    }
    let url;
    if (data.newEmail && data.newPassword) {
      url = `${BASE_URL}/user/change-props?currentPassword=${data.currentPassword}&newEmail=${data.newEmail}&newPassword=${data.newPassword}`;
    } else if (data.newEmail) {
      url = `${BASE_URL}/user/change-props?currentPassword=${data.currentPassword}&newEmail=${data.newEmail}`;
    } else {
      url = `${BASE_URL}/user/change-props?currentPassword=${data.currentPassword}&newPassword=${data.newPassword}`;
    }
    try {
      const res = await axios.put(url, [currentUser], {
        withCredentials: true,
      });
      swal.fire({
        title: "✔",
        text: "Information updated successfully, you will be redirect to login page.",
        timer: 3000,
        showConfirmButton: true,
      });
      await logout();
      history.push("/login");
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="settings-container">
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group className="mb-3">
          <Form.Label> Enter your current password to continue</Form.Label>
          <Form.Control
            type="password"
            required
            {...register("currentPassword")}
          />
        </Form.Group>
        <Divider />
        <br />
        <Form.Group className="mb-3">
          <Form.Label>New Email (Optional)</Form.Label>
          <Form.Control type="email" {...register("newEmail")} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password (Optional)</Form.Label>
          <Form.Control type="password" {...register("newPassword")} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};
