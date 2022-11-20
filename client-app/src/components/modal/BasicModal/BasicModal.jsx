import { Box } from "@mui/material";
import React from "react";

import styles from "./modal.module.css";

function BasicModal({ onClose, children }) {
  return (
    <div className={styles["modal"]} onClick={() => (onClose ? onClose() : "")}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ width: "max-content", margin: "auto" }}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </Box>
      </Box>
    </div>
  );
}

export default BasicModal;
