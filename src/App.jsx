import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./features/auth/authThunks";

const App = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state) => state.auth.isInitialized);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if(!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
      <div>
          <h1>App is ready</h1>
          {/* Routes go here next */}
      </div>
  )
}

export default App;