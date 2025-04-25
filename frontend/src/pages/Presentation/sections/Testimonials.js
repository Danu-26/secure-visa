import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";

function Testimonials() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        {/* Title and Text Section */}
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}>
            Trusted by over
          </MKTypography>
          <MKTypography
            variant="h2"
            color="info"
            textGradient
            mb={2}
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
          >
            1,00,000+  clients
          </MKTypography>
 
        </Grid>

        {/* Review Cards Section */}
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid item xs={12} sm={6} md={4}>
            <DefaultReviewCard
              name="Emily Johnson"
              date="2 days ago"
              review="The visa application process was so smooth and easy to follow. I got my approval faster than expected. Highly recommended!"
              rating={5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DefaultReviewCard
              color="info"
              name="Rahul Mehta"
              date="1 week ago"
              review="Great service! The step-by-step guidance made everything clear, and the support team was very helpful when I had questions."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DefaultReviewCard
              name="Sophia Lee"
              date="3 weeks ago"
              review="Applying for a visa has never been this simple! The website is user-friendly, and I could track my application easily."
              rating={5}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Testimonials;
