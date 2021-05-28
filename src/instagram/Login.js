import Container from "../components/LoginSignupContainer";
import logo from "../assets/images/logo1.jpg";
import { useForm } from "react-hook-form";
import useToken from "../hooks/useToken";
import { Link } from "react-router-dom";
import { Logo, InputContainer, Input, SubmitBtn, ErrorMsg } from "./Signup";
import { useHistory } from "react-router-dom";
import { login } from "../services/authService";
import { useState } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitting },
  } = useForm({
    mode: "all",
  });

  const { token, setToken } = useToken();
  const history = useHistory();
  const [loginErr, setLoginErr] = useState(false);

  const onSubmit = async (data) => {
    var response = await login(data);
    console.log(response);
    if (!response.data.error) {
      setToken(response.data.token);
      history.push("/");
      return;
    }
    console.log(loginErr);
    setLoginErr(true);
    console.log(loginErr);
  };

  return (
    <>
      <Container>
        <InputContainer>
          <Logo src={logo} />
        </InputContainer>
        <InputContainer>
          <h2 style={{ color: "#8e8e8e", fontSize: "17px" }}>
            Connect With Your Friends by signing up.
          </h2>
        </InputContainer>
        <hr style={{ color: "d9d9d9" }} />
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
          {loginErr && (
            <InputContainer>
              <ErrorMsg>Invalid Credentials!!</ErrorMsg>
            </InputContainer>
          )}
          <InputContainer>
            <Input
              type="Email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
            />
            {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
          </InputContainer>

          <InputContainer>
            <Input
              type="Password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
              })}
            />
            {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          </InputContainer>

          <InputContainer>
            <SubmitBtn
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                </>
              ) : (
                <>Login</>
              )}
            </SubmitBtn>
          </InputContainer>
        </form>
      </Container>
      <Container>
        <InputContainer
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#8e8e8e",
            marginTop: "0px",
          }}
        >
          Don't have an Account?
          <Link to="/signup/">Sign Up</Link>
        </InputContainer>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default LoginPage;
