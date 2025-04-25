import React, { useEffect, useState } from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/DefaultNavbar";
import Footer from "pages/LandingPages/Track/sections/Footer";
import routes from "routes";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Grid } from "@mui/material";

const PaymentSuccessPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [visaType, setVisaType] = useState("");
    const [travelFrom, setTravelFrom] = useState("");
    const [travelTo, setTravelTo] = useState("");

    const location = useLocation();
    const { appId, payment } = location.state || {};

    useEffect(() => {
        const fetchVisaStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/visa/status/${appId}`);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setVisaType(response.data.visaType);
                setTravelFrom(response.data.travelFrom);
                setTravelTo(response.data.travelTo);
            } catch (error) {
                console.error("Error fetching status:", error);
                alert("Error fetching application status. Please try again.");
            }
        };

        fetchVisaStatus();
    }, [appId]);

    return (
        <>
            <DefaultNavbar routes={routes} transparent light />

            {/* Header Section */}
            <MKBox
                minHeight="55vh"
                width="100%"
                sx={{
                    backgroundColor: "#155790",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: { xs: 2, sm: 4, md: 6 },
                    py: { xs: 4, sm: 5 },
                }}
            >
                <Grid
                    container
                    item
                    xs={12}
                    lg={8}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    sx={{ mx: "auto", textAlign: "center", px: { xs: 2, sm: 4 } }}
                >
                    <MKTypography
                        variant="h3"
                        color="white"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "2.75rem" },
                            fontWeight: "bold",
                            mb: 1,
                        }}
                    >
                        Payment Successful
                    </MKTypography>

                    <MKTypography
                        variant="body1"
                        color="white"
                        opacity={0.8}
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontWeight: "normal",
                        }}
                    >
                        The following are the details of your application:
                    </MKTypography>
                </Grid>
            </MKBox>

            {/* Application Info Section */}
            <MKBox px={{ xs: 2, sm: 4 }} py={6} maxWidth="800px" mx="auto" textAlign="center">
                <MKTypography
                    variant="h4"
                    color="info"
                    sx={{ fontWeight: "bold", mb: 2 }}
                >
                    Application for {firstName} {lastName}
                </MKTypography>

                <MKTypography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        fontStyle: "italic",
                        mb: 4,
                    }}
                >
                    {payment
                        ? `Total Payment: ${payment.toLocaleString("en-IN")} LKR`
                        : "No payment available"}
                </MKTypography>

                <MKTypography variant="body1" sx={{ mb: 2 }}>
                    <strong>Visa Type:</strong> {visaType || "N/A"}
                </MKTypography>
                <MKTypography variant="body1" sx={{ mb: 2 }}>
                    <strong>Travel From:</strong> {travelFrom || "N/A"}
                </MKTypography>
                <MKTypography variant="body1" sx={{ mb: 2 }}>
                    <strong>Travel To:</strong> {travelTo || "N/A"}
                </MKTypography>

                <MKTypography
                    variant="body2"
                    sx={{ mt: 4, fontStyle: "italic" }}
                >
                    Please wait while your application is processed.
                </MKTypography>
            </MKBox>

            <Footer />
        </>
    );
};

export default PaymentSuccessPage;
