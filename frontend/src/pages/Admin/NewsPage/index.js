import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import AdminNavBar from "pages/Admin/AdminNavBar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [newsData, setNewsData] = useState({ title: "", content: "", date: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleChange = (e) => {
        setNewsData({ ...newsData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newsData.title || !newsData.content || !newsData.date) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5001/api/visa/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newsData),
            });

            if (!response.ok) {
                throw new Error("Failed to add news");
            }

            const result = await response.json();
            setNewsList((prevList) => [...prevList, result]); // Add the saved news to the list
            setNewsData({ title: "", content: "", date: "" });

            // Show the snackbar with success message
            setSnackbarMessage("News added successfully!");
            setOpenSnackbar(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <AdminNavBar />
            <MKBox
                minHeight="60vh"
                width="100%"
                sx={{
                    backgroundColor: "#fff0f3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: { xs: 2, md: 6 },
                    pt: 12,
                    pb: 6,
                }}
            >
                <Container sx={{ py: 4, px: 2 }}>
                    <Card sx={{ p: 4, boxShadow: 3 }}>
                        <MKTypography variant="h4" gutterBottom>
                            Add Latest News
                        </MKTypography>
                   
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={() => setOpenSnackbar(false)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            sx={{ mt: 8 }} 
                        >
                            <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </MuiAlert>
                        </Snackbar>
                        {error && <MKTypography color="error">{error}</MKTypography>}
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth label="Title" name="title" value={newsData.title} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Content" name="content" multiline rows={4} value={newsData.content} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={newsData.date} onChange={handleChange} margin="normal" required />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                                {loading ? "Adding..." : "Add News"}
                            </Button>
                      
                        </form>
                    </Card>
                </Container>
            </MKBox>

            <MKBox pt={6} px={1} mt={6}>
                <Container>
                    <Card sx={{ p: 3, boxShadow: 3 }}>
                        <MKTypography variant="h4" gutterBottom>
                            Latest News
                        </MKTypography>
                        {newsList.length > 0 ? (
                            newsList.map((news, index) => (
                                <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5" }}>
                                    <MKTypography variant="h5">{news.title}</MKTypography>
                                    <MKTypography variant="body1" sx={{ mt: 1 }}>{news.content}</MKTypography>
                                    <MKTypography variant="caption" color="textSecondary">Date: {news.date}</MKTypography>
                                </Card>
                            ))
                        ) : (
                            <MKTypography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                                No news available. Add some news to display here.
                            </MKTypography>
                        )}
                    </Card>
                </Container>
            </MKBox>

            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default NewsPage;
