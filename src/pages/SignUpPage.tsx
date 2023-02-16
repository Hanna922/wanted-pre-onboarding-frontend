import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import token from "../api/token";
import { ACCESS_TOKEN_KEY } from "./../const";

interface IForm {
  email: string;
  password: string;
}

function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(watch())
      .then((response) => {
        alert(response.statusText);
        navigate("/signin");
      })
      .catch((error) => {
        alert(error.response.data.log || error.log);
      });
  };

  useEffect(() => {
    if (token.getToken(ACCESS_TOKEN_KEY)) {
      navigate("/todo");
    }
  }, []);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSignUp}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@$/,
              message: "Only emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 8 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default SignUpPage;
