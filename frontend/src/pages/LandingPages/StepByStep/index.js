import React from "react";
import { Container, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Arrow icon
import DefaultNavbar from "examples/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import routes from "routes";
import MKBox from "components/MKBox";
import { Link } from "react-router-dom";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

const steps = [
  {
    title: "Prepare Documents",
    details: ["Valid passport (6+ months validity)", "Recent passport-size photo", "Return flight tickets", "Completed visa application form"],
  },
  {
    title: "Choose Visa Type",
    details: ["Select visa type: 14-Day, 30-Day, 60-Day", "Different pricing for adults & children"],
  },
  {
    title: "Fill Application",
    details: ["Fill out personal details", "Provide travel dates & contact info", "Review for accuracy"],
  },
  {
    title: "Upload Documents",
    details: ["Upload scanned passport copy", "Upload passport-size photo", "Upload flight tickets (if available)", "Ensure document clarity"],
  },
  {
    title: "Make Payment",
    details: ["Review visa fees", "Select payment method", "Complete secure transaction", "Receive confirmation email"],
  },
  {
    title: "Track Application",
    details: ["Receive reference number", "Track visa status online", "Receive visa via email", "Print visa for travel"],
  },
];

function ApplicationProcessGuide() {
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      {/* Header Section */}
      <MKBox
        minHeight="55vh"
        width="100%"
        sx={{
          backgroundColor: "#155790",
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, md: 6 }, 
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center", px: { xs: 2, md: 0 } }}
          >
            <MKTypography
              variant="h3"
              color="white"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" }, 
                textAlign: "center",
              }}
            >
              Visa Application Process
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Follow these simple steps to complete your visa application.
            </MKTypography>
            <MKButton color="default" sx={{ color: ({ palette: { dark } }) => dark.main }} component={Link}
              to="/startyourapplication">
              Start your Application
            </MKButton>
          </Grid>
        </Container>
      </MKBox>

      <Container sx={{ mt: 6, mb: 6 }}>
        {steps.map((step, index) => (
          <Grid container spacing={2} alignItems="flex-start" key={index} sx={{ mb: 3, justifyContent: "center" }}>
            
            <Grid item xs={2} md={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ArrowForwardIcon sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" }, color: "#1976D2" }} />
            </Grid>

      
            <Grid item xs={10} md={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                {step.title}
              </Typography>
              <List sx={{ p: 0 }}>
                {step.details.map((detail, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ color: "#1976D2", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={detail} primaryTypographyProps={{ fontSize: "1rem", color: "#333" }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        ))}
      </Container>

      <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box>
    </>
  );
}

export default ApplicationProcessGuide;
