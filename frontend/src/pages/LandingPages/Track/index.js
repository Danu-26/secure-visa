import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DefaultNavbar from "examples/DefaultNavbar";
import Footer from "pages/LandingPages/Track/sections/Footer";
import routes from "routes";

function Track() {
  const [refId, setRefId] = useState(""); 

  const navigate = useNavigate(); 

  // Fetch status data and send to the next page
  const gotoStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/visa/status/${refId}`);
      // console.log(response.data)


      navigate('/view/status', {
        state: {
          status: response.data.status,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          visaType: response.data.visaType,
          travelFrom: response.data.travelFrom,
          travelTo: response.data.travelTo,
        }
      });

    } catch (error) {
      console.error("Error fetching status:", error);
      alert("Error fetching application status. Please try again.");
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#A4DFFD",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            p: { xs: 3, sm: 4 },
            boxShadow: 5,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
          >
            Track Your Application
          </Typography>

          <TextField
            fullWidth
            label="Reference Number"
            placeholder="Enter your reference number"
            variant="outlined"
            margin="normal"
            value={refId}
            onChange={(e) => setRefId(e.target.value)} 
            sx={{ fontSize: { xs: "14px", sm: "16px" } }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={gotoStatus}
            sx={{
              mt: 2,
              p: 1.5,
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "bold",
              backgroundColor: '#003a6b',
              color: 'white',
              '&:hover': {
                backgroundColor: '#002c53',
              },
            }}
          >
            Track Application
          </Button>
        </Card>
      </Box>
      <Footer />
    </>
  );
}

export default Track;
