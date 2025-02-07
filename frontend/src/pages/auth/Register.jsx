import { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/auth/useRegister";
import { LoaderIcon } from "react-hot-toast";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, register } = useRegister();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await register(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className="max-w-[500px] w-full mx-auto p-5 text-dark-gray mt-5 md:mt-16">
      <h1 className="uppercase font-semibold text-xl md:text-2xl ">Create an account</h1>
      <form onSubmit={handleSubmit}>
        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          First Name
        </label>
        <input
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
          type="text"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          Last Name
        </label>
        <input
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
          type="text"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          Email Address
        </label>
        <input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          type="email"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          Password
        </label>
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <label className="text-xs sm:text-sm uppercase block font-semibold mt-3">
          Confirm Password
        </label>
        <input
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          type="password"
          required
          className="border border-dark-gray bg-transparent w-full p-[6px] sm:p-2 focus:outline focus:outline-offset-1 focus:outline-secondary/20"
        />

        <button disabled={loading} className="w-full p-2 sm:p-3 bg-secondary uppercase text-primary mt-3 hover:bg-dark-gray duration-200 text-center focus:outline focus:outline-offset-1 focus:outline-secondary/20">
          {loading ? <LoaderIcon className="mx-auto"/> : <span>Sign Up</span>}
        </button>
      </form>

      <p className="mt-7">
        Already have an account?{" "}
        <Link to={"/login"} className="border-b border-secondary">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
