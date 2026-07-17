import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  htmlFor?: string;
};

export function FormField({ label, children, htmlFor }: FormFieldProps) {
  return (
    <Box sx={{ mb: 1.75 }}>
      <Typography
        component="label"
        htmlFor={htmlFor}
        sx={{
          color: "var(--sk-text-dim)",
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          mb: 0.75,
        }}>
        {label}
      </Typography>
      <Box
        sx={{
          "& input, & select": {
            background: "var(--sk-input-bg)",
            border: "1px solid var(--sk-border)",
            borderRadius: "8px",
            color: "var(--sk-text)",
            font: "inherit",
            fontSize: 15,
            minHeight: 44,
            padding: "11px 13px",
            transition:
              "background 140ms var(--mui-ease), border-color 140ms var(--mui-ease)",
            width: "100%",
          },
          "& input:focus, & select:focus": {
            background: "#fff",
            borderColor: "var(--sk-secondary)",
            outline: 0,
          },
          "& input:disabled": { color: "var(--sk-text-dim)" },
        }}>
        {children}
      </Box>
    </Box>
  );
}
