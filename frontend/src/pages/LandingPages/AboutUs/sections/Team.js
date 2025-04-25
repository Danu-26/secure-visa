

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";



function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
             Meet Our Dedicated Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
            Together, our team is here to ensure that your visa application process is as simple, fast, and secure as possible
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="member1"
                position={{ color: "info", label: " Founder & CEO" }}
                description="With a deep understanding of the visa application process and a vision to simplify it for everyone, [Name] is dedicated to driving the company’s mission forward. [Name]'s leadership ensures that every aspect of our platform meets the highest standards"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="member2"
                position={{ color: "info", label: " Head of Technology" }}
                description="Leading the tech team, [Name] brings innovation and technical expertise to the platform. [Name] ensures that our system runs smoothly, from the backend infrastructure to the seamless user interface you experience"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team3}
                name="member3"
                position={{ color: "info", label: "Customer Support Manager" }}
                description="With a passion for helping others, [Name] heads our customer support team, ensuring every query is answered quickly and accurately. [Name] is always available to help users with any issues "
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="member4"
                position={{ color: "info", label: "Visa Specialist" }}
                description="[Name] has years of experience in navigating the complexities of visa applications. They work closely with clients to ensure that their applications are accurate, complete, and processed in a timely manner"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
