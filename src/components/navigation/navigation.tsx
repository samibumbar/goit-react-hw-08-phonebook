import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { selectAuthData } from "../../redux/authSelectors";

const Navigation = () => {
  const { token } = useSelector(selectAuthData);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/contacts">
                Contacts
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
