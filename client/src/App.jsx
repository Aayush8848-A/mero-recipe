import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="light"
        toastClassName="!rounded-xl !font-sans"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
