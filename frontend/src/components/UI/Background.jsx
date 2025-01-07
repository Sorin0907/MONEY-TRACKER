/* eslint-disable react/prop-types */
const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-yellow-900 relative">
  {children}
</div>

  );
};

export default Background;
