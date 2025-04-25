import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import MKTypography from "components/MKTypography";

// Import MUI Icons
import PassportIcon from "@mui/icons-material/RememberMe";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import HotelIcon from "@mui/icons-material/Hotel";



function Information() {
  return (
    <MKBox component="section" py={6} my={6} sx={{ bgcolor: "#f8f9fa" }}>
      <Container>
        <Grid container spacing={4} alignItems="center" justifyContent="center">

          {/* Rotating Card Section */}
          <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <RotatingCard>
              <RotatingCardFront
                sx={{
                  backgroundColor: "	#003A6B"}}
                icon="touch_app"
                title={
                  <>
                    UAE Visa
                    <br />
                    Requirements
                  </>
                }
                description="Find out all the essential visa requirements for your travel."
              />
              <RotatingCardBack
                sx={{
                  backgroundColor: "	#003A6B"
                }}
                title="Visa Price Calculator"
                description="Quickly estimate your visa costs with our easy-to-use calculator."
                action={{
                  type: "internal",
                  route: "/view/visapaymentsdetails",
                  label: "View Payment",
                }}
              />
            </RotatingCard>
          </Grid>

          {/* Visa Requirements List */}
          <Grid item xs={12} md={7}>
            <MKTypography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              mb={3}
              sx={{
                color: "#533440",
                fontFamily: '"Playfair Display", serif',
                textTransform: "uppercase",
              }}
              className="text-[#0f172a] font-serif"
            >
              Essential Visa Requirements
            </MKTypography>

            <Grid container spacing={3}>
              {/* Passport & Photos */}
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <DefaultInfoCard
                  icon={
                    <PassportIcon sx={{ fontSize: 50, color: "initial", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }} />
                  }
                  title="Passport"
                  description="Valid for at least 6 months from date of travel."
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <DefaultInfoCard
                  icon={
                    <PhotoCameraIcon sx={{ fontSize: 50, color: "initial", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }} />
                  }
                  title="Photos"
                  description="2 recent passport-size photographs with white background."
                />
              </Grid>
            </Grid>

            {/* Flight Tickets & Hotel Booking */}
            <Grid container spacing={3} sx={{ mt: { xs: 2, md: 4 } }}>
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <DefaultInfoCard
                  icon={
                    <FlightTakeoffIcon sx={{ fontSize: 50, color: "initial", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }} />
                  }
                  title="Flight Tickets"
                  description="Return flight booking confirmation."
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <DefaultInfoCard
                  icon={
                    <HotelIcon sx={{ fontSize: 50, color: "initial", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }} />
                  }
                  title="Hotel Booking"
                  description="Confirmed hotel reservation for the duration of stay."
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
