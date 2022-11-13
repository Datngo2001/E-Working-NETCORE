import React from "react";
import NoLoginRoute from "../../routes/NoLoginRoute";
import styles from "./noLoginLayout.module.css";

function NoLoginLayout() {
  return (
    <div>
      {/* <Appbar /> */}
      <div className={styles["app-route-container"]}>
        <NoLoginRoute />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default NoLoginLayout;
