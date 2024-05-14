import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
]);

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
