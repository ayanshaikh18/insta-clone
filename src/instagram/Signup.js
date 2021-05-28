import styled from "styled-components";
import Container, { ContainerDiv } from "../components/LoginSignupContainer";
import logo from "../assets/images/logo1.jpg";
import { useForm } from "react-hook-form";
import useToken from "../hooks/useToken";
import { Link } from "react-router-dom";
import { signup } from "../services/authService";
import { useHistory } from "react-router-dom";

export const Logo = styled.img`
  height: 50px;
`;

export const InputContainer = styled(ContainerDiv)`
  margin-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  background-color: #fafafa;
  text-align: center;
  width: 100%;
  padding: 5px;
  /* padding-left: 10px; */
  border: 1px solid #d9d9d9;
  height: 23px;
  border-radius: 5px;
  font-size: 12px;
  :focus {
    border: 1px solid red;
  }
`;

export const SubmitBtn = styled.button`
  background-color: #0095f6;
  color: #fff;
  width: 100%;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  :disabled {
    background-color: rgba(0, 149, 246, 0.3);
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  font-size: 13px;
  display: inline;
`;

const SignupPage = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitting },
    getValues,
    setError,
  } = useForm({
    mode: "all",
  });

  const { token, setToken } = useToken();
  const history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    var response = await signup(data);
    if (!response.data.error) {
      setToken(response.data.token);
      history.push("/");
      return;
    }
    setError("username", {
      type: "manual",
      message: response.data.error,
    });
  };

  const validateConfirmpassword = (value) => {
    return value == getValues("password") ? true : "passwords not matching";
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
              type="text"
              required
              placeholder="Enter Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && <ErrorMsg>{errors.username.message}</ErrorMsg>}
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
            <Input
              type="Password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required.",
                validate: validateConfirmpassword,
              })}
            />

            {errors.confirmPassword && (
              <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
            )}
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
                <>Sign Up</>
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
          Already Have an Account?
          <Link to="/login/">Login Here</Link>
        </InputContainer>
      </Container>
      <br />
    </>
  );
};

export default SignupPage;
