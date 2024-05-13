import { useEffect } from "react";
import CategoryTree from "./CategoryTree";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/user-slice";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import SignIn from "./SignIn";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.email) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <>
      {!user.email && <SignIn />}
      {user.email && (
        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(logoutUser());
                console.log(user);
              }}
            >
              Logout
            </Button>
          </Box>
          <Header />
          <CategoryTree />
        </div>
      )}
    </>
  );
};

export default Home;
