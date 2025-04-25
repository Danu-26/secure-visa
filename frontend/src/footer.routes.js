// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import MKTypography from "components/MKTypography";


// Images
import logo from "assets/images/uae-logo.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "UAE Visa Application Centre ",
    image: logo,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "/",
    },
    {
      icon: <TwitterIcon />,
      link: "/",
    },
    {
      icon: <YouTubeIcon />,
      link: "/",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", route: "/about" }

      ],
    },
    {
      name: "help & support",
      items: [
        { name: "Contact Us", route: "/contact" }
      ],
    },
  
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      © {date} Oriental Travels & Tours (Pvt) Ltd. All rights reserved
    </MKTypography>
  ),
};
