import React from "react"
import { ButtonBase, Typography } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"

const BackButton = () => (
  <ButtonBase
    focusRipple
    style={{ marginTop: 20, width: "fit-content" }}
    onClick={() => window.history.back()}
  >
    <ArrowBack style={{ fontSize: 30, color: "#3c5a99" }} />
    <Typography
      style={{
        marginLeft: 5,
        fontWeight: "bold",
        color: "#3c5a99",
        fontSize: "10pt",
      }}
    >
      BACK
    </Typography>
  </ButtonBase>
)

export default BackButton
