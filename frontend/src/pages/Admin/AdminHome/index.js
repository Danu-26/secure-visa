import '@fortawesome/fontawesome-free/css/all.min.css';
// @mui material components
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import DefaultFooter from "examples/Footers/DefaultFooter";

// Admin page components
import UserStatus from "pages/Admin/AdminHome/UserApplicationCard/UserStatus.js";

// Routes
import AdminNavBar from "pages/Admin/AdminNavBar";
import footerRoutes from "footer.routes";

function AdminHomeView() {
    return (
        <>
            <AdminNavBar />
            <MKBox
                minHeight="100vh"
                width="100%"
                sx={{
                    backgroundColor: "#ffe9ec",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: { xs: 2, md: 6 },
                    pt: { xs: 12, md: 10 }, 
                }}
            >
                <Container>
                    <Card
                        sx={{
                            p: 2,
                            mx: { xs: 2, lg: 3 },
                            mt: { xs: 2, lg: -8 }, 
                            mb: 4,
                            boxShadow: ({ boxShadows: { xxl } }) => xxl,
                        }}
                    >
                        <MKBox
                            sx={{
                                background: "linear-gradient(90deg,#eeeeee, #B2B2B2,#eeeeee)",
                                borderRadius: "8px",
                                padding: "12px",
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <MKTypography variant="h4" color="white">
                                All User Application
                            </MKTypography>
                        </MKBox>
                        <UserStatus />
                    </Card>
                </Container>
            </MKBox>

            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default AdminHomeView;
