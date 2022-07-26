import NavBar from "./NavBar";
import { Box, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import PropTypes from "prop-types";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Box className="box-center">
        <BlockIcon sx={{ fontSize: 200 }} />
      </Box>
      <Typography variant="h1" align="center" color="textPrimary">
        404
      </Typography>
      <Typography variant="h3" align="center" color="textSecondary">
        Page Not Found
      </Typography>
    </>
  );
};

export default NotFound;
