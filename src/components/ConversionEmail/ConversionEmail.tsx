import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { BalanceCallout } from "../BalanceCallout";
import type { PlaygroundState, Translator } from "../types";

type ConversionEmailProps = {
  state: PlaygroundState;
  t: Translator;
  variant: "stub" | "real";
};

export function ConversionEmail({ state, t, variant }: ConversionEmailProps) {
  const isStub = variant === "stub";
  const href = isStub
    ? "https://buyer.smartaffiliate.com/signup?email=aishah@example.com&claim_widget=true"
    : "https://buyer.smartaffiliate.com/login?email=aishah@example.com";

  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid var(--sa-border)",
        borderRadius: "8px",
        overflow: "hidden",
      }}>
      <Box
        sx={{
          background: "#fafafa",
          borderBottom: "1px solid var(--sa-border)",
          fontSize: 12,
          padding: "14px 20px",
        }}>
        <HeaderRow
          label="From:"
          value="SmartAffiliate <noreply@smartaffiliate.com>"
        />
        <HeaderRow
          label="To:"
          value="aishah@example.com"
        />
        <HeaderRow
          label="Subject:"
          value={t("emailConvSubject")}
        />
      </Box>
      <Box
        sx={{
          color: "var(--sa-text)",
          fontSize: 14,
          lineHeight: 1.65,
          mx: "auto",
          maxWidth: 720,
          padding: "28px 32px",
        }}>
        <Typography
          component="h2"
          sx={{
            color: "#047857",
            fontSize: 22,
            fontWeight: 700,
            mt: 0,
            mb: 1.5,
          }}>
          {t("emailConvSubject")}
        </Typography>
        <Typography sx={{ m: 0, mb: 1.75 }}>{t("emailConvHello")}</Typography>
        <Typography sx={{ m: 0, mb: 1.75 }}>{t("emailConvBody")}</Typography>
        <Box
          sx={{
            background: "#f9fafb",
            border: "1px solid #edf0f3",
            borderRadius: "8px",
            fontSize: 13,
            my: 1.75,
            padding: "12px 16px",
          }}>
          <strong>{t("productName")}</strong>
          <br />
          {t("productPrice")} - {t("earnRate")}
        </Box>
        <BalanceCallout
          amount={`RM ${state.balance.toFixed(2)}`}
          label={t("emailConvBalanceLabel")}
        />
        <Box sx={{ my: 3, textAlign: "center" }}>
          <Link
            href={href}
            underline="none"
            sx={{
              background: "var(--sa-accent)",
              borderRadius: "8px",
              color: "#fff",
              display: "inline-block",
              fontWeight: 600,
              padding: "14px 28px",
              transition: "transform 140ms var(--mui-ease)",
              "&:hover": { transform: "translateY(-1px)" },
            }}>
            {isStub ? t("emailConvCtaStub") : t("emailConvCtaReal")}
          </Link>
        </Box>
        <Box
          sx={{
            borderTop: "1px solid var(--sa-border)",
            color: "var(--sa-text-dim)",
            fontSize: 11,
            mt: 3,
            pt: 2,
          }}>
          {t("emailConvFooter")}
        </Box>
      </Box>
    </Box>
  );
}

function HeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", gap: 1, py: "2px" }}>
      <Box
        component="span"
        sx={{ color: "var(--sa-text-dim)", minWidth: 50 }}>
        {label}
      </Box>
      <Box
        component="span"
        sx={{ color: "var(--sa-text)" }}>
        {value}
      </Box>
    </Box>
  );
}
