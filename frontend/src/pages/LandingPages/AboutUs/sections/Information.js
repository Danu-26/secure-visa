

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";

import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10} lg={8}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="public"
                    title="Seamless Visa Application Experience"
                    description="We provide an easy and efficient visa application process. Our platform ensures every step is simple, transparent, and secure."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="payments"
                    title="Secure Payment Functionality"
                    description="Your security is our priority. Our payment system is fully encrypted to ensure safe transactions and peace of mind."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="apps"
                    title="User-Friendly Interface"
                    description="Designed with you in mind, our platform offers intuitive navigation, making the visa application process stress-free."
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="3p"
                    title="Reliable and Efficient Service"
                    description="Our platform is continuously improving, providing reliable support and real-time tracking of your visa status."
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              title="Get our support"
              description="Our goal is to provide an easy-to-use platform that makes visa applications simple and ensures they are processed on time"
              action={{
                type: "internal",
                route: "/view/visapaymentsdetails",
                color: "info",
                label: "find visa price",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
