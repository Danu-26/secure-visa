import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

function DesignBlocks() {
  const [open, setOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsItems, setNewsItems] = useState([]); 

  // Fetch news data on component mount
  useEffect(() => {
 
    axios
      .get("http://localhost:5001/api/visa/news")
      .then((response) => {
        setNewsItems(response.data);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const handleOpen = (news) => {
    setSelectedNews(news);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNews(null);
  };

  const renderData = newsItems.map(({ title, content, date }) => (
    <Grid item xs={12} sm={6} md={4} key={title}>

      <Card
        sx={{
          p: 3,
          maxWidth: "1000px", 
          margin: "auto",
          marginTop: 1,
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          backgroundColor: "#f9f9f9",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <MKTypography
          variant="h5"
          fontWeight="bold"
          mb={1}
          sx={{ color: "#0d47a1", textTransform: "uppercase" }}
        >
          {title}
        </MKTypography>
        <MKTypography
          variant="caption"
          color="textSecondary"
          fontStyle="italic"
          display="block"
          mb={1}
        >
          {date}
        </MKTypography>
        <MKTypography variant="body2" color="textSecondary" sx={{ lineHeight: "1.6" }}>
          {content.substring(0, 130)}... {/* Show short preview */}
        </MKTypography>
        <Link
          to="#"
          style={{ textDecoration: "none" }}
          onClick={() => handleOpen({ title, content, date })}
        >
          <MKTypography
            variant="body2"
            fontWeight="bold"
            color="primary"
            sx={{
              display: "inline-block",
              mt: 2,
              transition: "color 0.3s ease",
              "&:hover": { color: "#ff5722" },
            }}
          >
            Read More →
          </MKTypography>
        </Link>
      </Card>
    </Grid>
  ));

  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Latest Updates"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            sx={{
              color: "#533440",
              fontFamily: '"Playfair Display", serif',
            }}
            className="text-[#0f172a] font-serif"
          >
            Latest News
          </MKTypography>
          <MKTypography variant="body1" color="textSecondary">
            Stay updated with the latest visa policies and travel advisories.
          </MKTypography>
        </Grid>
      </Container>

      <Container sx={{ mt: 6 }}>{renderData}</Container>

      {/* Modal for Full News Content */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#0d47a1" }}>
          {selectedNews?.title}
        </DialogTitle>
        <DialogContent>
          <MKTypography variant="caption" color="textSecondary" fontStyle="italic" display="block">
            {selectedNews?.date}
          </MKTypography>
          <MKTypography variant="body1" color="textSecondary" sx={{ mt: 2, lineHeight: "1.8" }}>
            {selectedNews?.content}
          </MKTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </MKBox>
  );
}

export default DesignBlocks;
