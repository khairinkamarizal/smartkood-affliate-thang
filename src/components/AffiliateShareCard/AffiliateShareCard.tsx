import HandshakeIcon from "@mui/icons-material/Handshake";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plasma } from "../Plasma";
import type { Translator } from "../types";

type AffiliateShareCardProps = {
  t: Translator;
};

export function AffiliateShareCard({ t }: AffiliateShareCardProps) {
  const rate = Number.parseFloat(t("earnRate").replace(/[^0-9.]/g, "")) || 5;
  const productPrice =
    Number.parseFloat(t("productPrice").replace(/[^0-9.]/g, "")) || 459;
  const perSale = productPrice * (rate / 100);
  const friends = 10;
  const tenFriends = perSale * friends;
  const amountLabel = `RM${tenFriends.toFixed(0)}+`;

  return (
    <Box
      sx={{
        position: "relative",
        mb: 1.5,
        borderRadius: "10px",
        overflow: "hidden",
        background: "#0f0f12",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
        <Plasma
          color="#b42318"
          scale={2}
          direction="pingpong"
          speed={3}
          mouseInteractive={true}
        />
      </Box>
      <Stack
        spacing={4}
        sx={{
          p: 2,
          position: "relative",
          zIndex: 1,
          borderRadius: "10px",
          background: "rgba(24, 24, 24, 0.35)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
        }}>
        <Stack spacing={1.5}>
          <Chip
            icon={<HandshakeIcon />}
            label={t("affiliateBadge")}
            size="small"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "transparent",
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.01em",
              px: 0,
              "& .MuiChip-icon": {
                bgcolor: "#f5b800",
                color: "#0f0f12",
                borderRadius: "50%",
                width: 24,
                height: 24,
                p: 0.5,
                mr: 0.5,
              },
            }}
          />

          <Typography
            component="div"
            sx={{
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}>
            <TitleWithAmount
              text={t("affiliateHeroTitle")}
              amount={amountLabel}
            />
          </Typography>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 13,
              lineHeight: 1.45,
              fontWeight: 400,
            }}>
            {t("affiliateHeroDesc")}
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            position: "relative",
            isolation: "isolate",
            bgcolor: "#f5b800",
            color: "#0f0f12",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.01em",
            minHeight: 44,
            borderRadius: "8px",
            border: "1px solid #0000",
            textTransform: "none",
            boxShadow: "none",
            transition: "all 0.25s ease",
            "&::before": {
              content: '""',
              borderRadius: "inherit",
              background:
                "conic-gradient(from var(--pro-promo-angle, 0deg), rgba(245,184,0,0), #f5b800, #ffe27a, #f5b800, rgba(245,184,0,0))",
              pointerEvents: "none",
              zIndex: 2,
              padding: "2px",
              animation: "pro-card-promo-spin 4s linear infinite",
              position: "absolute",
              top: "-2px",
              right: "-2px",
              bottom: "-2px",
              left: "-2px",
              WebkitMaskImage:
                "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
              WebkitMaskPosition: "0 0, 0 0",
              WebkitMaskSize: "auto, auto",
              WebkitMaskRepeat: "repeat, repeat",
              WebkitMaskClip: "content-box, border-box",
              WebkitMaskOrigin: "content-box, border-box",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              maskMode: "match-source, match-source",
            },
            "&:hover": {
              bgcolor: "#f5b800",
              transform: "translateY(-1px)",
              boxShadow: "0 0 24px rgba(245, 184, 0, 0.45)",
            },
          }}>
          {t("affiliateCta")}
        </Button>
      </Stack>
    </Box>
  );
}

function TitleWithAmount({ text, amount }: { text: string; amount: string }) {
  const parts = text.split("{amount}");
  return (
    <>
      {parts.flatMap((part, i, arr) => [
        <span key={`t-${i}`}>{part}</span>,
        i < arr.length - 1 ? (
          <Box
            key={`p-${i}`}
            component="span"
            sx={{
              display: "inline-block",
              color: "#f5b800",
              lineHeight: 1,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}>
            {amount}
          </Box>
        ) : null,
      ])}
    </>
  );
}
