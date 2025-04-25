import React, { useEffect,useState } from "react";
import { Box, Container, Card, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography } from "@mui/material";
import routes from "routes";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import DefaultNavbar from "examples/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe("pk_test_51L7Te4IqrghmmhfiRwNRTW0XAM5PBnGSDEcETGL5jiPCSTJStSgfR892cw2UnRkHGef4eBJH2QlgwVt0iHplSHFn00Tq4D2jxR");




const visaTypes = [
  {
    label: "14 Days Visa - Adult (Over 12) - Single Entry",
    price: 32000,
    currency: "LKR"
  },
  {
    label: "14 Days Visa - Child (Under 12) - Single Entry",
    price: 16500,
    currency: "LKR"
  },
  {
    label: "30 Days Visa - Adult (Over 12) - Single Entry",
    price: 33500,
    currency: "LKR"
  },
  {
    label: "30 Days Visa - Child (Under 12) - Single Entry",
    price: 16500,
    currency: "LKR"
  },
  {
    label: "30 Days Visa - Adult (Over 12) - Multiple Entry",
    price: 80000,
    currency: "LKR"
  },
  {
    label: "60 Days Visa - Adult (Over 12) - Single Entry",
    price: 85000,
    currency: "LKR"
  },
  {
    label: "60 Days Visa - Adult (Over 12) - Multiple Entry",
    price: 95000,
    currency: "LKR"
  }
];

const nationalities = ["Sri Lanka", "India", "Pakistan", "Bangladesh"];

function Application() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [appId, setAppId] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [price, setPrice] = useState("");


  useEffect(() => {
    if (appId) {
      console.log("Updated App ID from state:", appId);
    }
  }, [appId]);


  // const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    visaType: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    passportNumber: "",
    nationality: "SriLanka",
    address: "",
    travelFrom: "",
    travelTo: "",
    passportFile: null,
    photoFile: null,
    ticketFile: null,
    hotelBookingFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'visaType') {
      const selectedVisa = visaTypes.find(type => type.label === value);
      setPrice(selectedVisa.price)
    }


    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];  
      return newErrors;
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };


  const validateStep = () => {
    let newErrors = {};

    if (step === 1 && !formData.visaType) newErrors.visaType = "Visa Type is required";
    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = "First Name is required";
      if (!formData.lastName) newErrors.lastName = "Last Name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.mobileNumber) {
        newErrors.mobileNumber = "Mobile Number is required";
      } else if (!/^\d+$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Mobile Number should contain only digits";
      }
      if (!formData.passportNumber) newErrors.passportNumber = "Passport Number is required";
      if (!formData.nationality) newErrors.nationality = "Nationality is required";
      if (!formData.address) newErrors.address = "Address is required";
    }
    if (step === 3) {
      if (!formData.travelFrom) newErrors.travelFrom = "Travel From date is required";
      if (!formData.travelTo) newErrors.travelTo = "Travel To date is required";
    }
    if (step === 4) {
      if (!formData.passportFile) newErrors.passportFile = "Passport file is required";
      if (!formData.photoFile) newErrors.photoFile = "Photo file is required";
      if (!formData.ticketFile) newErrors.ticketFile = "Ticket file is required";
      if (!formData.hotelBookingFile) newErrors.hotelBookingFile = "Hotel booking file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all files are selected before submitting
    if (!formData.passportFile || !formData.photoFile || !formData.ticketFile || !formData.hotelBookingFile) {
      setErrors((prev) => ({
        ...prev,
        passportFile: !formData.passportFile ? "Passport file is required" : "",
        photoFile: !formData.photoFile ? "Photo file is required" : "",
        ticketFile: !formData.ticketFile ? "Ticket file is required" : "",
        hotelBookingFile: !formData.hotelBookingFile ? "Hotel booking file is required" : "",
      }));
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:5001/api/visa/upload", data, { headers: { "Content-Type": "multipart/form-data" } })
      console.log("this is app id")
      setAppId(response.data.applicationId)

  
      
      setOpenSnackbar(true);
  
      setTimeout(() => {
        setStep(5); // Move to Payment Step
      }, 2000);
    } catch (error) {
      console.error("Upload failed", error);
      setLoading(false);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
              Start your Application Today
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Welcome to the Visa Application Portal!    We&apos;re here to guide you through the process and make your visa application experience as smooth as possible
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
        <Grid container spacing={3} alignItems="center">
          {/* Left Side: Blog Card */}
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              title="Gain Insights on the Visa Process"
              description="Fill out the required fields with accurate personal details. After completing your application and uploading all necessary documents, you will be asked to make a payment for the visa processing fee."
              action={{
                type: "internal",
                route: "/view/visapaymentsdetails",
                color: "info",
                label: "Find visa payment",
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ p: 4 }}>
              <Container>
                <Card sx={{ p: 4 }}>
                  <Typography variant="h4" mb={3} textAlign="center">
                    UAE Visa Application
                  </Typography>

                  {step === 1 && (
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel id="visa-type-label">Visa Type</InputLabel>
                      <Select
                        labelId="visa-type-label"
                        id="visa-type"
                        name="visaType"
                        value={formData.visaType || ''}
                        onChange={handleChange}
                        label="Visa Type"
                        sx={{
                          borderRadius: '8px',
                          minHeight: 50,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d3d3d3',
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Visa Type
                        </MenuItem>
                        {visaTypes.map((type, index) => (
                          <MenuItem key={index} value={type.label}>
                            {type.label} - {type.price.toLocaleString("en-IN")}{type.currency}
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.visaType && (
                        <Typography color="error" variant="body2" sx={{ fontSize: '0.75rem', mt: 1 }}>
                          {errors.visaType}
                        </Typography>
                      )}
                    </FormControl>

                  )}

                  {step === 2 && (
                    <>
                      <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" error={!!errors.firstName} helperText={errors.firstName} />
                      <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" error={!!errors.lastName} helperText={errors.lastName} />
                      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" error={!!errors.email} helperText={errors.email} />

                      <TextField fullWidth label="Mobile No" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} margin="normal" error={!!errors.mobileNumber} helperText={errors.mobileNumber} />
                      <TextField fullWidth label="Passport No" name="passportNumber" value={formData.passportNumber} onChange={handleChange} margin="normal" error={!!errors.passportNumber} helperText={errors.passportNumber} />


                      <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" error={!!errors.address} helperText={errors.address} />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <TextField
                        fullWidth
                        label="Travel From"
                        name="travelFrom"
                        type="date"
                        value={formData.travelFrom}
                        onChange={handleChange}
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.travelFrom} helperText={errors.travelFrom}
                      />
                      <TextField
                        fullWidth
                        label="Travel To"
                        name="travelTo"
                        type="date"
                        value={formData.travelTo}
                        onChange={handleChange}
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.travelTo} helperText={errors.travelTo}
                      />
                    </>
                  )}

                  {step === 4 && (
                    <>
                      {/* Upload Passport */}
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 2, backgroundColor: "#D3D3D3", '&:hover': { backgroundColor: "#A9A9A9" } }}
                      >
                        Upload Passport
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, "passportFile")}
                          required
                        />
                      </Button>
                      {formData.passportFile && (
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {formData.passportFile.name} uploaded
                        </Typography>
                      )}
                      {errors.passportFile && <Typography color="error" variant="body2">{errors.passportFile}</Typography>}

                      {/* Upload Photo */}
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 2, backgroundColor: "#D3D3D3", '&:hover': { backgroundColor: "#A9A9A9" } }}
                      >
                        Upload Photo
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, "photoFile")}
                          required
                        />
                      </Button>
                      {formData.photoFile && (
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{
                            maxWidth: "300px", 
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {formData.photoFile.name} uploaded
                        </Typography>
                      )}
                      {errors.photoFile && <Typography color="error" variant="body2">{errors.photoFile}</Typography>}

                      {/* Upload Ticket */}
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 2, backgroundColor: "#D3D3D3", '&:hover': { backgroundColor: "#A9A9A9" } }}
                      >
                        Upload Ticket
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, "ticketFile")}
                          required
                        />
                      </Button>
                      {formData.ticketFile && (
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{
                            maxWidth: "300px", 
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {formData.ticketFile.name} uploaded
                        </Typography>
                      )}
                      {errors.ticketFile && <Typography color="error" variant="body2">{errors.ticketFile}</Typography>}

                      {/* Upload Hotel Booking Receipt */}
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 2, backgroundColor: "#D3D3D3", '&:hover': { backgroundColor: "#A9A9A9" } }}
                      >
                        Upload Hotel Booking Receipt
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileChange(e, "hotelBookingFile")}
                          required
                        />
                      </Button>
                      {formData.hotelBookingFile && (
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{
                            maxWidth: "300px", 
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {formData.hotelBookingFile.name} uploaded
                        </Typography>
                      )}
                      {errors.hotelBookingFile && <Typography color="error" variant="body2">{errors.hotelBookingFile}</Typography>}

                      {/* Show success message */}
                      <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000} 
                        onClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                        sx={{ mt: 8,ml:12 }} 
                      >
                        <Alert
                          onClose={() => setOpenSnackbar(false)}
                          severity="success"
                          sx={{ width: '100%' }} 
                        >
                          Files uploaded successfully!
                        </Alert>
                      </Snackbar>
                    </>


                  )}

                  {step === 5 && (
                    <Elements stripe={stripePromise}>
                      <PaymentForm applicationId={appId} payment={price} />
                    </Elements>
                  )}

                  <Box mt={3} display="flex" justifyContent={step > 1 ? "space-between" : "flex-end"}>
                    {step > 1 && step!==5 && <Button startIcon={<ArrowBackIcon />} onClick={handlePrevious}>Back</Button>}
                    {step < 4 && <Button endIcon={<ArrowForwardIcon />} onClick={handleNext}>Next</Button>}
                    {step === 4 && <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={loading} // Disable the button when loading
                      endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <ArrowForwardIcon />}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>}
                  </Box>

                </Card>
              </Container>
            </Card>
          </Grid>
        </Grid>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Application;