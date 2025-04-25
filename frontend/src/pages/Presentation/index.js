import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";
import MKButton from "components/MKButton";


import DefaultNavbar from "examples/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";

// import Pages from "pages/Presentation/sections/Pages";
import Testimonials from "pages/Presentation/sections/Testimonials";
import Download from "pages/Presentation/sections/Download";

// Presentation components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
// import bgImage from "assets/images/bg-presentation.jpg";
import { useNavigate } from 'react-router-dom';




// Securevisa.lk@gmail.com - securevisa@1
// Securevisa@gmail.com-jehan@123


function Presentation() {
  const navigate = useNavigate(); 


  const socialButtonRoutes = {
    facebook: "/", 
    twitter: "/", 
    youtube: "/", 
  };


  const handleSocialButtonClick = (platform) => {
    navigate(socialButtonRoutes[platform]); 
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "Free Download",
          color: "info",
        }}
        sticky
      />

      {/* Hero Section */}
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundColor: "#003A6B",
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, sm: 4, md: 6 }, 
        }}
      >
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <MKTypography
                variant="h1"
                color="white"
                sx={{
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  fontWeight: "bold",
                }}
              >
                UAE Visa Application Centre
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" }, 
                  mt: 2,
                  mb: 4,
                }}
              >
                For Sri Lankan Passport Holders
              </MKTypography>
              <MKButton
                component={Link}
                to="/startyourapplication"
                variant="gradient"
                color="primary"
                size="large"
                sx={{ width: { xs: "100%", sm: "auto" } }} 
              >
                Start your Application
              </MKButton>
            </Grid>
          </Grid>
        </Container>
      </MKBox>

      {/* Main Content Section */}
      <Card
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mx: { xs: 2, sm: 3, lg: 4 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette, functions }) => functions.rgba(palette.white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows }) => boxShadows.xxl,
        }}
      >
        <Counters />
        <Information />
        {/* <DesignBlocks /> */}

        <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container>

        {/* Info Cards Section */}
        <Container>
          <Grid container spacing={3}>
            {[
              {
                icon: "flag",
                title: "Getting Started",
                description:
                  "Explore the easy steps to apply for your visa and access all the necessary resources to complete your application",
                route: "https://www.creative-tim.com/learning-lab/react/overview/material-kit/",
                label: "Let's start",
              },
              {
                icon: "precision_manufacturing",
                title: "Visa Requirements",
                description:
                  "Find out the required documents and eligibility criteria for different visa types to ensure a smooth application process.",
                route: "https://www.creative-tim.com/learning-lab/react/overview/datepicker/",
                label: "Read more",
              },
              {
                icon: "apps",
                title: "Application Process",
                description:
                  "Our streamlined system provides a step-by-step guide to help you submit your visa application quickly and track ",
                route: "https://www.creative-tim.com/learning-lab/react/alerts/material-kit/",
                label: "Read more",
              },
            ].map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FilledInfoCard variant="gradient" color="info" {...card} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* <Testimonials /> */}
        <Download />

        {/* Thank You Section */}
        <MKBox pt={12} pb={6}>
          <Container>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} textAlign="center">
                <MKTypography variant="h4" fontWeight="bold" mb={1}>
                  Thank you for your support!
                </MKTypography>
                <MKTypography variant="body1" color="text">
                  You can reach out to us through these our page
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="center" display="flex" justifyContent="center">
                <Stack direction="row" spacing={1} justifyContent="center" wrap="wrap">
                  {["facebook", "twitter", "youtube"].map((platform) => (
                    <MKSocialButton
                      key={platform}
                      onClick={() => handleSocialButtonClick(platform)} 
                      color={platform}
                      sx={{ width: { xs: "100%", sm: "auto" } }} 
                    >
                      <i className={`fab fa-${platform}`} /> &nbsp;Share
                    </MKSocialButton>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
      </Card>

      {/* Footer */}
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
