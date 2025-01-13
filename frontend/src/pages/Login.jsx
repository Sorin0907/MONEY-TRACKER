import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/UI/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/login.mutation";
import toast from "react-hot-toast";

/**
 * @returns Login page
 */
const Login = () => {
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

  const [loginUser, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthUser"],
  });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
		try {
      await loginUser({
        variables: {
          input: loginData,
        },
    });
    } catch (error) {
      console.error(error);
      toast.error(error.message);  
    }
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
				<h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
					Welcome Back
				</h1>
				<p className="text-sm text-gray-500 text-center mb-6">
					Log in to your account
				</p>
				<form className="space-y-5" onSubmit={handleSubmit}>
					<InputField
						label="Username"
						id="username"
						name="username"
						value={loginData.username}
						onChange={handleChange}
					/>
					<InputField
						label="Password"
						id="password"
						name="password"
						type="password"
						value={loginData.password}
						onChange={handleChange}
					/>
					<button
						type="submit"
						className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>
				<p className="mt-6 text-sm text-center text-gray-600">
					Dont have an account?{" "}
					<Link to="/signup" className="text-indigo-500 font-medium hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;