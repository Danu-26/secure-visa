import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";


function BuiltByDevelopers() {
  return (
    <MKBox
      display="flex"
      alignItems="center"
      borderRadius="xl"
      my={2}
      py={6}
      sx={{

        backgroundColor: 'gray',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container >
        <Grid container item xs={12} lg={6} sx={{ ml: { xs: 0, lg: 6 } }}>
          <MKTypography
            variant="h4"
            color="white"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Built for Travelers
          </MKTypography>
          <MKTypography
            variant="h1"
            color="white"
            mb={1}
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, 
              fontWeight: "bold", 
            }}
          >
            Comprehensive Guidance
          </MKTypography>
          <MKTypography
            variant="body1"
            color="white"
            opacity={0.8}
            mb={2}
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" }, 
            }}
          >
            From visa types and document requirements to payment and tracking, our platform provides complete guidance. Follow the step-by-step process and get your visa approved with ease.
          </MKTypography>
          <MKTypography
            component={Link}
            to="/stepbystep"
            variant="body2"
            color="white"
            fontWeight="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, 
              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translateX(3px)`,
                transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
              },
              "&:hover .material-icons-round, &:focus .material-icons-round": {
                transform: `translateX(6px)`,
              },
            }}
          >
            Guide <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default BuiltByDevelopers;
