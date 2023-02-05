import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        overflow: "hidden",
        height: "100%",
        width: "100%",
        position: "relative",
        background: "blackAlpha.50",
        color: "#292929",
        fontFamily: "Pretendard, sans-serif",
        fontSize: {
          base: "16px",
          sm: "16px",
        },
      },
      "body > #root": {
        overflow: "auto",
        height: "100%",
      },
    },
  },
  fontSizes: {
    xs: "0.7rem",
    sm: "0.85rem",
    md: "1rem",
    lg: "1.15rem",
    xl: "1.45rem",
    "2xl": "1.85rem",
  },
});
