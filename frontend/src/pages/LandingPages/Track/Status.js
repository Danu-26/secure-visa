import React from "react";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/DefaultNavbar";
import Footer from "pages/LandingPages/Track/sections/Footer";
import routes from "routes";
import { useLocation } from "react-router-dom";

function Status() {
    const location = useLocation();
    const {
        status,
        firstName,
        lastName,
        visaType,
        travelFrom,
        travelTo
    } = location.state || {};

    return (
        <>
            <DefaultNavbar
                routes={routes}
                action={{
                    type: "external",
                    route: "https://www.creative-tim.com/product/material-kit-react",
                    label: "free download",
                    color: "info",
                }}
                transparent
                light
            />
            <MKBox
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#A4DFFD",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: { xs: 2, sm: 4 }, 
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        padding: { xs: 4, sm: 6 },
                        boxShadow: 10,
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        textAlign: "center",
                    }}
                >
                    <MKTypography
                        variant="h4"
                        fontWeight="bold"
                        color="secondary"
                        sx={{ marginBottom: 3, fontSize: { xs: "1.5rem", sm: "2rem" } }}
                    >
                         Your Application Status
                    </MKTypography>

           
                    <MKTypography
                        variant="h5"
                        color="info"
                        sx={{
                            fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            marginBottom: 2,
                        }}
                    >
                        Hi, {firstName} {lastName}! 👋
                    </MKTypography>

                
                    <MKTypography
                        variant="h4"
                        color="info"
                        sx={{
                          
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontWeight: "bold",
                            marginBottom: 4,
                        }}
                    >
                        {status ? "Your Application Status: " + status : "No status available"}
                    </MKTypography>


                 
                    <MKTypography
                        variant="body1"
                        color="dark"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontWeight: "normal",
                            marginBottom: 2,
                        }}
                    >
                        <strong>Visa Type:</strong> {visaType || "N/A"}
                    </MKTypography>
                    <MKTypography
                        variant="body1"
                        color="dark"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontWeight: "normal",
                            marginBottom: 2,
                        }}
                    >
                        <strong>Travel From:</strong> {travelFrom || "N/A"}
                    </MKTypography>
                    <MKTypography
                        variant="body1"
                        color="dark"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontWeight: "normal",
                            marginBottom: 2,
                        }}
                    >
                        <strong>Travel To:</strong> {travelTo || "N/A"}
                    </MKTypography>

                 
                 
                                 <MKTypography
                                     variant="body2"
                                     sx={{ mt: 4, fontStyle: "italic" }}
                                 >
                                     Please wait while your application is processed.
                                 </MKTypography>
                </Card>
            </MKBox>
            <Footer />
        </>
    );
}

export default Status;
