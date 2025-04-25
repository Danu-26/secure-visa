

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import MKButton from "components/MKButton";
import { Link } from "react-router-dom";
import { FormControl, Select, MenuItem } from "@mui/material";


const visaTypes = [
  { type: "14 Days Visa - Adult (Over 12) - Single Entry", price: 32000 },
  { type: "14 Days Visa - Child (Under 12) - Single Entry", price: 16500 },
  { type: "30 Days Visa - Adult (Over 12) - Single Entry", price: 33500 },
  { type: "30 Days Visa - Child (Under 12) - Single Entry", price: 16500 },
  { type: "30 Days Visa - Adult (Over 12) - Multiple Entry", price: 80000 },
  { type: "60 Days Visa - Adult (Over 12) - Single Entry", price: 85000 },
  { type: "60 Days Visa - Adult (Over 12) - Multiple Entry", price: 95000 },
];

const ViewPriceDetails = () => {
  const [selectedVisa, setSelectedVisa] = useState("");

  // Handle visa type change
  const handleVisaChange = (event) => {
    setSelectedVisa(event.target.value);
  };

  // Find selected visa details
  const selectedVisaDetails = visaTypes.find((visa) => visa.type === selectedVisa);

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
        sx={{
          position: "absolute",
          top: "64px",
          left: "0",
          width: "100%",
          height: "calc(100vh - 64px)",
          // backgroundColor: "#ADC4DD",
          // backgroundColor: "#A4DFFD",
          // backgroundColor: "#c3c6c8",
          backgroundColor: "#e3f2fd",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
       
        }}
      />

      {/* Main Content */}
      <MKBox
        sx={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          paddingTop: "80px",
        }}
      >
        <MKBox
          sx={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            border: "1px solid transparent",
            transition: "border 0.3s ease-in-out",
            "&:hover": {
              border: "1px solid #d3d3d3", 
            },
            position: "relative",
          }}
        >
      
          <MKBox
            variant="gradient"
            bgColor="info"
            coloredShadow="info"
            borderRadius="lg"
            p={2}
            mx="auto"
            sx={{
              position: "absolute",
              top: "-25px", 
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              textAlign: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MKTypography variant="h3" color="white">
              Visa Price Calculator
            </MKTypography>
          </MKBox>

          {/* Selection Form */}
          <MKBox p={3} mt={3.5}> 
            <MKTypography variant="body2" color="text" mb={2}>
              Select a visa type to see the price details.
            </MKTypography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    value={selectedVisa}
                    onChange={handleVisaChange}
                    displayEmpty
                    sx={{
                      minHeight: 50,
                      borderRadius: "8px",
                      border: "1px solid transparent",
                      transition: "border 0.3s ease-in-out",
                      "&:hover": {
                        border: "1px solid #d3d3d3", 
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      -- Select Visa Type --
                    </MenuItem>
                    {visaTypes.map((visa) => (
                      <MenuItem key={visa.type} value={visa.type}>
                        {visa.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {selectedVisaDetails && (
                <Grid item xs={12}>
                  <MKTypography variant="h5" color="text" fontWeight="bold">
                    Price: Rs. {selectedVisaDetails.price.toLocaleString("en-IN")}
                  </MKTypography>
                </Grid>
              )}

            </Grid>

      
            <Grid container justifyContent="center" mt={4}>
              <MKButton
                component={Link}
                to="/startyourapplication"
                variant="gradient"
                color="primary"
                size="large"
              >
                Start your Application
              </MKButton>
            </Grid>
          </MKBox>
        </MKBox>
      </MKBox>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default ViewPriceDetails;
