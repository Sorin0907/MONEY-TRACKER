import { useState } from "react";
import { Link } from "react-router-dom";
import RadioButton from "../components/UI/RadioButton";
import InputField from "../components/UI/InputField";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations/create-user.mutation";
import toast from "react-hot-toast";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: ["GetAuthUser"],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("signUpData", signUpData);
      await createUser({
        variables: {
          input: signUpData,
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
				<h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Create an Account</h1>
				<p className="text-sm text-gray-500 text-center mb-6">
					Join us to keep track of your expenses
				</p>
				<form className="space-y-5" onSubmit={handleSubmit}>
					<InputField
						label="Full Name"
						id="name"
						name="name"
						value={signUpData.name}
						onChange={handleChange}
					/>
					<InputField
						label="Username"
						id="username"
						name="username"
						value={signUpData.username}
						onChange={handleChange}
					/>
					<InputField
						label="Password"
						id="password"
						name="password"
						type="password"
						value={signUpData.password}
						onChange={handleChange}
					/>
					<div className="flex justify-between items-center">
						<RadioButton
							id="male"
							label="Male"
							name="gender"
							value="male"
							onChange={handleChange}
							checked={signUpData.gender === "male"}
						/>
						<RadioButton
							id="female"
							label="Female"
							name="gender"
							value="female"
							onChange={handleChange}
							checked={signUpData.gender === "female"}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? "Creating Account..." : "Sign Up"}
					</button>
				</form>
				<p className="mt-6 text-sm text-center text-gray-600">
					Already have an account?{" "}
					<Link to="/login" className="text-indigo-500 font-medium hover:underline">
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
