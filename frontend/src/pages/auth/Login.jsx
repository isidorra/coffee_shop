import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    await login(email, password);
  };

  return (
    <div className="max-w-[500px] w-full mx-auto p-5 text-dark-gray mt-5 md:mt-16">
      <h1 className="uppercase font-semibold text-xl md:text-2xl">
        Log in to your account
      </h1>
      <form onSubmit={handleLogin}>
        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          Email Address
        </label>
        <input
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          type="email"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          Password
        </label>
        <input
          value={password} 
          onChange={ev => setPassword(ev.target.value)}
          type="password"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <button
          disabled={loading}
          className="w-full p-2 sm:p-3 bg-secondary uppercase text-primary mt-3 hover:bg-dark-gray duration-200 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        >
          {loading ? <LoaderIcon className="mx-auto"/> : <span>Sign in</span>}
        </button>
      </form>

      <p className="mt-7">
        Don&apos;t have an account?{" "}
        <Link to={"/sign-up"} className="border-b border-secondary">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
