import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Transaction from "./pages/Transaction";
import NotFound from "./pages/NotFound";
import Header from './components/UI/Header';


function App() {
  const authUser = true;
	return (
		<>
		{authUser && <Header />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/transaction/:id' element={<Transaction />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}
export default App;
