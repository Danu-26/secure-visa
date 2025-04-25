import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { Link } from "react-router-dom";


function Download() {
  return (
    <MKBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="xl"
      my={4}
      sx={{
        backgroundColor: "	#f8f9fa",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "60vh", 
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "800px", 
          textAlign: "center",
          px: 3,
          py: { xs: 6, sm: 8 },
          zIndex: 2,
          position: "relative",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <MKTypography
              variant="h3"
              color="dark"
              sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, mb: 2 }}
            >
              Apply for your visa online with ease.
            </MKTypography>
            <MKTypography
              variant="h4"
              color="light"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: 2 }}
            >
              Quick, Secure &amp; Reliable
            </MKTypography>
            <MKTypography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem' }, mb: 4 }}
            >
              You can check the progress of your visa application at any time by visiting the Track Your Application page. Simply enter your reference ID to see the current status.
            </MKTypography>
            <MKButton
              variant="gradient"
              color="info"
              size="large"
              component={Link}
              to="/startyourapplication"
            >
              START YOUR APPLICATION
            </MKButton>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Download;
