/* eslint-disable react/prop-types */
const InputField = ({ label, id, name, type = "text", onChange, value }) => {
	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-600 mb-1"
			>
				{label}
			</label>
			<input
				className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={`Enter your ${label.toLowerCase()}`}
			/>
		</div>
	);
};

export default InputField;