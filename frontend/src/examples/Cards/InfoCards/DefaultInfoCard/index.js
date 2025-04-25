import React from "react";
import PropTypes from "prop-types";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// @mui material components
import Icon from "@mui/material/Icon";

function DefaultInfoCard({ color, icon, title, description, direction, small }) {
  return (
    <MKBox lineHeight={1} p={direction === "center" ? 2 : 0} textAlign={direction}>
      {typeof icon === "string" ? (
        <MKTypography
          display="block"
          variant={direction === "center" ? "h2" : "h3"}
          color={color}
          textGradient
        >
          <Icon sx={{ fontSize: 50 }}>{icon}</Icon>
        </MKTypography>
      ) : (
        // Directly render the icon component passed as a prop
        <MKTypography
          display="block"
          variant={direction === "center" ? "h2" : "h3"}
          color={color}
          textGradient
        >
          {React.cloneElement(icon, { sx: { fontSize: 50 } })}
        </MKTypography>
      )}
      <MKTypography
        display="block"
        variant="5"
        fontWeight="bold"
        mt={direction === "center" ? 1 : 2}
        mb={1.5}
      >
        {title}
      </MKTypography>
      <MKTypography
        display="block"
        variant={small ? "button" : "body2"}
        color="text"
        pr={direction === "left" ? 6 : 0}
        pl={direction === "right" ? 6 : 0}
      >
        {description}
      </MKTypography>
    </MKBox>
  );
}

DefaultInfoCard.defaultProps = {
  color: "info",
  direction: "left",
  small: false,
};

DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right", "center"]),
  small: PropTypes.bool,
};

export default DefaultInfoCard;
