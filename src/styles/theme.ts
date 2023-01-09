import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontSize: {
          base: "16px",
          sm: "24px",
        },
      },
      "body > #root": {
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
