
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/visa/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Extract token from response
        localStorage.setItem("token", token); // Store token in localStorage
        navigate("/userapplicationdetails"); 
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <MKBox position="absolute" top={0} left={0} zIndex={1} width="100%" height="100%"
        sx={{
          backgroundColor: "#f2f2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      />
      <MKBox px={1} width="100%" minHeight="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: "100%", maxWidth: 400, pb: 3 }}>
              <MKBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} p={2} mb={1} textAlign="center">
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>Sign in</MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  {error && <MKTypography color="error" textAlign="center">{error}</MKTypography>}
                  <MKBox mb={2}>
                    <MKInput type="email" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                  </MKBox>

                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                      Sign in
                    </MKButton>
                  </MKBox>
                  {/* <MKBox mt={3} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography component={Link} to="/signup" variant="button" color="info"
                        fontWeight="medium" textGradient>
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox> */}
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignIn;
