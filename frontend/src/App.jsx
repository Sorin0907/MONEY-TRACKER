import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Transaction from "./pages/Transaction";
import NotFound from "./pages/NotFound";
import Header from './components/UI/Header';
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/queries/get-auth-user.query";
import { Toaster } from "react-hot-toast";


function App() {
  const {data, loading, error } = useQuery(GET_AUTH_USER);
  if (loading) return <p>Loading...</p>;
	return (
		<>
		{data?.AuthUser && <Header />}
			<Routes>
				<Route path='/' element={data?.AuthUser ? <Home /> :<Navigate to="/login" />} />
				<Route path='/login' element={!data?.AuthUser ? <Login /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!data?.AuthUser ? <Signup /> : <Navigate to={"/"} />} />
				<Route path='/transaction/:id' element={data?.AuthUser ? <Transaction /> :<Navigate to="/login" />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
      <Toaster />
		</>
	);
}
export default App;
