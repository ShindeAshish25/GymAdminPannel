import * as React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";

const pages = ["Customer", "Overdue Memberships", "Old Memberships"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");

  const handleOpen = (data) => {
    console.log(data);
    setData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const alertData = [
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Ashish Shinde",
      mobNo: "9049831815",
      lastPaymetDate: "27-12-2024",
      lastMembership: "1 month",
      membershipDueDate: "27-12-2024",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Yogesh Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Sunny Shinde",
    },
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Ashish Shinde",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Yogesh Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Sunny Shinde",
    },
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Ashish Shinde",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Yogesh Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Sunny Shinde",
    },
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Ashish Shinde",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Yogesh Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      name: "Sunny Shinde",
    },
  ];

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={`/${page.toLowerCase().replace(/\s+/g, "")}`} // Convert page name to route-friendly format
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "initial",
                  }}
                >
                  <Link
                    to={`/${page.toLowerCase().replace(/\s+/g, "")}`} // Convert page name to route-friendly format
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Over Due Memberships customer">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Badge badgeContent={alertData.length} color="error">
                    <MailIcon sx={{ color: "white" }} color="action" />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                className="alertBox"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {alertData.map((alertData, index) => (
                  <MenuItem
                    className=""
                    key={index}
                    // onClick={handleCloseUserMenu}
                    onClick={() => {
                      handleCloseUserMenu();
                      handleOpen(alertData);
                    }}
                  >
                    {/* {setting} */}
                    <div className="d-flex align-items-center border-bottom pb-2 ">
                      <div className="alertImg">
                        <img src={alertData.img} alt="" />
                      </div>
                      <div className="alertText ms-3">{alertData.name}</div>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="alertCard"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            <div className="row">
              <div className="col-md-6 ">
                <img src={data.img} alt="" />
              </div>
              <div className="col-md-6">
                <Typography
                  className="mb-3"
                  id="modal-modal-title"
                  variant="h4"
                  component="h4"
                >
                  {data.name}
                </Typography>

                <p>
                  <b className="me-3">Last Paymet Date :</b>
                  {data.lastPaymetDate}
                </p>
                <p>
                  <b className="me-3">Last Membership :</b>
                  {data.lastMembership}
                </p>
                <p>
                  <b className="me-3"> Due Date:</b>
                  {data.membershipDueDate}
                </p>
                <p>
                  <b className="me-3">Mobile No :</b>
                  {data.mobNo}
                </p>
                <div className="text-end mt-3">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
