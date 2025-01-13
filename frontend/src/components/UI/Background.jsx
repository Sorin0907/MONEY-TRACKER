/* eslint-disable react/prop-types */
const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Soft glowing radial highlights */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gray-700 blur-3xl opacity-25"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gray-600 blur-2xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] rounded-full bg-gray-700 blur-[100px] opacity-10"></div>
      </div>

      {/* Subtle diagonal pattern for texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(135deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
      </div>

      {/* Dark corner highlights for depth */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-gray-900 via-transparent to-transparent opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-gray-900 via-transparent to-transparent opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
