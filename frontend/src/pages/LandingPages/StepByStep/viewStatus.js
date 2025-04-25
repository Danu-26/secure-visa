import '@fortawesome/fontawesome-free/css/all.min.css';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import DefaultNavbar from "examples/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";



// Routes
import routes from "routes";
import footerRoutes from "footer.routes";



// Images
// import bgImage from "assets/images/bg-about-us.jpg";

function ViewStatus() {
    return (
        <>
            <DefaultNavbar
                routes={routes}
                action={{
                    type: "external",
                    route: "https://www.creative-tim.com/product/material-kit-react",
                    label: "free download",
                    color: "default",
                }}
                transparent
                light
            />
            <MKBox
                minHeight="75vh"
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
                        sx={{ mx: "auto", textAlign: "center" }}
                    >
                        <MKTypography
                            variant="h1"
                            color="white"
                            sx={({ breakpoints, typography: { size } }) => ({
                                [breakpoints.down("md")]: {
                                    fontSize: size["3xl"], 
                                },
                            })}
                        >
                          Your Application status
                        </MKTypography>
                      
              
                    </Grid>
                </Container>
            </MKBox>
            <Card
                sx={{
                    p: 2,
                    mx: { xs: 2, lg: 3 },
                    mt: -8,
                    mb: 4,
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            >
              <h1>status</h1>
            </Card>
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default ViewStatus;
