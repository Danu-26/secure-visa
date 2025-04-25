// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

const date = new Date().getFullYear();

function Footer() {
  return (
    <MKBox component="footer" py={6}>
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            textAlign={{ xs: "center", lg: "left" }}
            mr="auto"
            mb={{ xs: 3, lg: 0 }}
          >
            <MKTypography variant="h6" textTransform="uppercase" mb={{ xs: 2, lg: 3 }}>
              UAE Visa Application Centre
            </MKTypography>
            <Stack
              component="ul"
              direction="row"
              flexWrap="wrap"
              spacing={3}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              pl={0}
              mb={3}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography variant="button" fontWeight="regular" opacity={0.8} component={Link} to="/">
                  Home
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography variant="button" fontWeight="regular" opacity={0.8} component={Link} to="/about">
                  About
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography variant="button" fontWeight="regular" opacity={0.8} component={Link} to="/contact">
                  Contact Us
                </MKTypography>
              </MKBox>
            </Stack>
            <MKTypography variant="button" opacity={0.8}>
              © {date} Oriental Travels & Tours (Pvt) Ltd. All rights reserved
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} ml="auto" textAlign={{ xs: "center", lg: "right" }}>
            <MKTypography variant="body1" fontWeight="bold" mb={6} sx={{ fontSize: "1.125rem" }}>
              Focus on your journey, and let us handle the process.
            </MKTypography>
            <MKTypography component="a" href="#youtube" target="_blank" rel="noreferrer" variant="body2" color="dark" opacity={0.5} mr={3}>
              <i className="fab fa-youtube" />
            </MKTypography>
            <MKTypography component="a" href="#twitter" target="_blank" rel="noreferrer" variant="body2" color="dark" opacity={0.5} mr={3}>
              <i className="fab fa-twitter" />
            </MKTypography>
            <MKTypography component="a" href="#facebook" target="_blank" rel="noreferrer" variant="body2" color="dark" opacity={0.5} mr={3}>
              <i className="fab fa-facebook" />
            </MKTypography>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Footer;
