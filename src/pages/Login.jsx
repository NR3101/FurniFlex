import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const res = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(res.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        "please re-check your credentials";
      toast.error(errorMsg);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const res = await customFetch.post("auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(res.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("guest user login error.please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="Email" name="identifier" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-accent btn-block "
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-secondary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
