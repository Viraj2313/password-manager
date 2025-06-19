import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Home from "./pages/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import { useEffect, useState } from "react";
import AddPassword from "./pages/AddPassword";
import { ToastContainer } from "react-toastify";
import PasswordDetails from "./pages/PasswordDetails";
import Footer from "./components/Footer";
function App() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setColorScheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <MantineProvider forceColorScheme={colorScheme}>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-password" element={<AddPassword />} />
            <Route path="/password/:id" element={<PasswordDetails />} />
          </Routes>
        </MantineProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
