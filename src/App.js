import "./App.css";
import LoginForm from "./LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PowerPage from "./PowerPage";
import AdminPage from "./admin/AdminPage";
import UserPage from "./UserPage";
function App() {
  return (
    <div>
      {/* <LoginForm></LoginForm> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="pp" element={<PowerPage />} />
          <Route path="adminlogin" element={<AdminPage />} />
          <Route path="userlogin" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
