import * as React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for routing
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
import { Close, Home, HomeRepairServiceTwoTone } from "@mui/icons-material";
import { baseURL } from "./config";
import axios from "axios";

const pages = ["Customer", "Overdue Memberships", "Old Memberships", "Report"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [alertData, setAlertData] = React.useState([]);

  const handleOpen = (data) => {
    console.log(data);
    setData(data);
    setOpen(true);
  };

  const navigate = useNavigate();

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

  const alertDataa = [
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Ashish ",
      lastName: "Shinde",
      mobNo: "9049831815",
      lastPaymetDate: "27-12-2024",
      lastMembership: "1 month",
      membershipDueDate: "27-12-2024",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Yogesh ",
      lastName: "Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Sunny ",
      lastName: "Shinde",
    },
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Ashish ",
      lastName: "Shinde",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Yogesh ",
      lastName: "Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Sunny ",
      lastName: "Shinde",
    },
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Ashish ",
      lastName: "Shinde",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Yogesh ",
      lastName: "Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Sunny ",
      lastName: "Shinde",
    },
    {
      id: "1",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Ashish ",
      lastName: "Shinde",
    },
    {
      id: "2",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Yogesh ",
      lastName: "Shinde",
    },
    {
      id: "3",
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
      firstName: "Sunny ",
      lastName: "Shinde",
    },
  ];

  React.useEffect(() => {
    getAlertData();
  }, []);

  const getAlertData = async () => {
    await axios
      .get(baseURL + "/getAlertData")
      .then((response) => {
        if (response?.data?.status === true) {
          setAlertData(response?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              O3 Fitnesss
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
              variant="h4"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              O3 Fitness
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
              <IconButton
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  navigate("/"); // Navigate programmatically
                }}
                sx={{ p: 0 }}
              >
                <Home sx={{ color: "white" }} color="action" className="me-3" />
              </IconButton>
              <Tooltip title="Over Due Memberships customer">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Badge badgeContent={alertData?.length} color="error">
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
                {alertData?.length > 0 ? (
                  <>
                    {alertData?.map((alertData, index) => (
                      <MenuItem
                        className=""
                        key={index}
                        onClick={() => {
                          handleCloseUserMenu();
                          handleOpen(alertData);
                        }}
                      >
                        <div className="d-flex align-items-center border-bottom pb-2 ">
                          <div className="alertImg">
                            <img src={alertData?.photo} alt="" />
                          </div>
                          <div className="alertText ms-3">
                            {alertData?.firstName + " " + alertData?.lastName}
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                  </>
                ) : (
                  <div className="p-3">No Record Found</div>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="alertCard"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            <div className="row">
              <div className="col-md-6 ">
                <img src={data.photo} alt="" />
              </div>
              <div className="col-md-6">
                <Typography
                  className="mb-3"
                  id="modal-modal-title"
                  variant="h4"
                  component="h4"
                >
                  {data.firstName + " " + data.lastName}
                </Typography>

                <p>
                  <b className="me-3">Last Paymet Date :</b>
                  {data.paymentDate}
                </p>
                <p>
                  <b className="me-3">Last Membership :</b>
                  {data.memberships} month
                </p>
                <p>
                  <b className="me-3"> Due Date:</b>
                  {data.membershipDueDate}
                </p>
                <p>
                  <b className="me-3"> Remaining Amount:</b>
                  {data.remainingAmount}
                </p>
                <p>
                  <b className="me-3">Mobile No :</b>
                  {data.mobileNo}
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
