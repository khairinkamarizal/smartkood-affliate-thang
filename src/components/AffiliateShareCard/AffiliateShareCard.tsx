import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Translator } from "../types";

type AffiliateShareCardProps = {
  t: Translator;
};

export function AffiliateShareCard({ t }: AffiliateShareCardProps) {
  const rate = Number.parseFloat(t("earnRate").replace(/[^0-9.]/g, "")) || 5;
  const productPrice = Number.parseFloat(t("productPrice").replace(/[^0-9.]/g, "")) || 459;
  const perSale = productPrice * (rate / 100);
  const amountLabel = `RM${(perSale * 10).toFixed(0)}+`;

  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle at 12% 0%, rgba(90,200,250,.55), transparent 36%), radial-gradient(circle at 100% 18%, rgba(255,59,107,.34), transparent 34%), radial-gradient(circle at 58% 115%, rgba(255,159,10,.38), transparent 40%), linear-gradient(145deg, #ffffff 8%, #f2f8ff 55%, #fff8ed 100%)",
        border: "1px solid rgba(25,21,31,.1)",
        borderRadius: "22px",
        boxShadow: "0 22px 52px rgba(22,54,86,.15), inset 0 1px 0 rgba(255,255,255,.9)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", sans-serif',
        mb: 2,
        overflow: "hidden",
        position: "relative",
        "&::before": {
          background: "linear-gradient(90deg, #5ac8fa, #0071e3 34%, #ff3b6b 68%, #ff9f0a)",
          borderRadius: "999px",
          content: '""',
          height: 4,
          left: 24,
          position: "absolute",
          right: 24,
          top: 0,
        },
      }}
    >
      <Stack spacing={3.25} sx={{ p: 2.75, position: "relative" }}>
        <Stack spacing={1.5}>
          <Chip
            icon={<HandshakeIcon />}
            label={t("affiliateBadge")}
            size="small"
            sx={{
              alignSelf: "flex-start",
              backdropFilter: "blur(16px)",
              bgcolor: "rgba(255,255,255,.6)",
              border: "1px solid rgba(255,255,255,.82)",
              borderRadius: "999px",
              boxShadow: "0 5px 18px rgba(22,54,86,.09)",
              color: "#35303b",
              fontSize: 11.5,
              fontWeight: 600,
              height: 31,
              letterSpacing: 0,
              "& .MuiChip-icon": { color: "#0071e3", fontSize: 16 },
            }}
          />

          <Typography
            component="div"
            sx={{ color: "#141118", fontSize: 30, fontWeight: 600, letterSpacing: "-.035em", lineHeight: 1.08 }}
          >
            <TitleWithAmount text={t("affiliateHeroTitle")} amount={amountLabel} />
          </Typography>

          <Typography sx={{ color: "#625c68", fontSize: 13.5, fontWeight: 400, lineHeight: 1.5 }}>
            {t("affiliateHeroDesc")}
          </Typography>
        </Stack>

        <Box sx={{ borderTop: "1px solid rgba(25,21,31,.09)", pt: 2.5 }}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: "#0071e3",
              border: "1px solid rgba(255,255,255,.28)",
              borderRadius: "13px",
              boxShadow: "0 12px 28px rgba(0,113,227,.24), inset 0 1px 0 rgba(255,255,255,.18)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              minHeight: 48,
              textTransform: "none",
              transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s cubic-bezier(.22,1,.36,1)",
              "&:hover": { background: "#0064c8", boxShadow: "0 16px 34px rgba(0,113,227,.3), inset 0 1px 0 rgba(255,255,255,.2)", transform: "translateY(-1px)" },
              "&:focus-visible": { outline: "3px solid #73c8f2", outlineOffset: 3 },
            }}
          >
            {t("affiliateCta")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function TitleWithAmount({ text, amount }: { text: string; amount: string }) {
  const parts = text.split("{amount}");
  return (
    <>
      {parts.flatMap((part, index, list) => [
        <span key={`text-${index}`}>{part}</span>,
        index < list.length - 1 ? (
          <Box
            key={`amount-${index}`}
            component="span"
            sx={{
              background: "none",
              color: "#ff3b6b",
              display: "inline-block",
              fontWeight: 600,
              lineHeight: 1,
              WebkitTextFillColor: "initial",
              whiteSpace: "nowrap",
            }}
          >
            {amount}
          </Box>
        ) : null,
      ])}
    </>
  );
}
