import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/visa/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/admin/signin"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColor: "#f2f2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, md: 6 },
        }}
      />
      <MKBox px={1} width="100%" height="100vh" position="relative">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox variant="gradient" bgColor="info" borderRadius="lg" mx={2} mt={-3} p={2} textAlign="center">
                <MKTypography variant="h4" fontWeight="medium" color="white">Sign up</MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form">
                  {error && <MKTypography color="error" textAlign="center">{error}</MKTypography>}
                  <MKBox mb={2}>
                    <MKInput type="text" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="email" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" label="Confirm Password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                      Sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography component={Link} to="/signin" color="info" fontWeight="medium" textGradient>
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignUp;
