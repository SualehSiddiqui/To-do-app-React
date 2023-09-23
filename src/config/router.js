import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Pages/Login";
import SignPage from "../Pages/sign";
import ToDoPage from "../Pages/todo";
import { useEffect, useState } from "react";

const RouterPage = () => {
  let [userLogin, setUserLogin] = useState(false)
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserLogin(true)
    }
  }, [userLogin])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userLogin ? <Navigate to={"/todo"} /> : <LoginPage setUserLogin={setUserLogin} />} />
        <Route path="/sign" element={userLogin ? <Navigate to={"/todo"} /> : <SignPage setUserLogin={setUserLogin} />} />
        <Route path="/todo" element={userLogin ? <ToDoPage setUserLogin={setUserLogin} /> : <Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RouterPage