import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { Box, Typography, Button } from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">User Profile</Typography>
      <Typography variant="subtitle1">Email: {email}</Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
