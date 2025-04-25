import React from "react";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/contact1.png";

function ContactUs() {
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex="999">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "free download",
            color: "info",
          }}
        />
      </MKBox>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
 

        {/* Static Contact Details Section */}
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={7}
          xl={5}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 12, sm: 20, md: 25 }}  
            mb={{ xs: 10, sm: 18, md: 20 }}  
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                Contact Us
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                For further questions, please email Securevisa.lk@gmail.com
 or use the contact details below.
              </MKTypography>

              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                  <MKTypography variant="h6" fontWeight="bold" align="center">
                    Oriental Travels & Tours (Pvt) Ltd.
                  </MKTypography>
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="body2" align="left">
                    <strong>Address:</strong> 93 2/7 Main Street, Colombo 11, Sri Lanka.
                  </MKTypography>
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="body2" align="left">
                    <strong>Telephone:</strong> 011 2433 469
                  </MKTypography>
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="body2" align="left">
                    <strong>Email:</strong> Securevisa.lk@gmail.com

                  </MKTypography>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
