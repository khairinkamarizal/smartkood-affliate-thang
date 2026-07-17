import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { PlaygroundState, Translator } from "../types";

type ConversionEmailProps = {
  state: PlaygroundState;
  t: Translator;
  variant: "stub" | "real";
};

export function ConversionEmail({ state, t, variant }: ConversionEmailProps) {
  const isStub = variant === "stub";
  const amount = `RM ${state.lastConv.toFixed(2)}`;
  const href = isStub
    ? "https://buyer.smartaffiliate.com/signup?email=aishah@example.com&claim_widget=true"
    : "https://buyer.smartaffiliate.com/login?email=aishah@example.com";

  return (
    <Box
      sx={{
        background: "radial-gradient(circle at 8% 8%, rgba(90,200,250,.18), transparent 28%), radial-gradient(circle at 92% 92%, rgba(255,59,107,.12), transparent 30%), #f5f5f7",
        borderRadius: "8px",
        fontFamily: 'Roboto, sans-serif',
        padding: { xs: '12px', sm: '20px' },
      }}
    >
      <Box
        sx={{
          background: "rgba(255,255,255,.72)",
          border: "1px solid #e2e3e8",
          borderRadius: "14px 14px 0 0",
          color: "#5c5961",
          fontSize: 11,
          lineHeight: 1.4,
          mx: "auto",
          maxWidth: 600,
          padding: "12px 18px",
        }}
      >
        <HeaderRow label="From:" value="SmartAffiliate <noreply@smartaffiliate.com>" />
        <HeaderRow label="To:" value="aishah@example.com" />
        <HeaderRow label="Subject:" value={t("emailConvSubject")} />
      </Box>

      <Box
        component="article"
        aria-labelledby="email-newsletter-title"
        sx={{
          background: "#fff",
          border: "1px solid #e2e3e8",
          borderRadius: "0 0 22px 22px",
          boxShadow: "0 24px 60px rgba(33,28,49,.1)",
          color: "#171419",
          mx: "auto",
          maxWidth: 600,
          overflow: "hidden",
          position: "relative",
          "&::before": {
            background: "linear-gradient(90deg, #5ac8fa, #0071e3 34%, #ff3b6b 68%, #ff9f0a)",
            content: '""',
            height: 3,
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      >
        <Box
          component="header"
          sx={{
            alignItems: "center",
            background: "#0071e3",
            display: "flex",
            justifyContent: "space-between",
            padding: { xs: "20px", sm: "24px 32px" },
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: 19, fontWeight: 600, letterSpacing: "-.025em" }}>
            smartaffiliate<Box component="span" sx={{ color: "#ffd60a" }}>.</Box>
          </Typography>
          <Box sx={{ alignItems: "center", display: "flex", gap: "12px" }}>
            <Box aria-hidden="true" sx={{ display: "flex", gap: "4px" }}>
              <span style={{ background: '#64d2ff', borderRadius: '50%', height: 8, width: 8 }} />
              <span style={{ background: '#ff375f', borderRadius: '50%', height: 8, width: 8 }} />
              <span style={{ background: '#ffd60a', borderRadius: '50%', height: 8, width: 8 }} />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,.78)", fontSize: 11, fontWeight: 500 }}>SmartKood</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            background:
              "radial-gradient(circle at 4% 0%, rgba(90,200,250,.62), transparent 43%), radial-gradient(circle at 100% 18%, rgba(255,59,107,.42), transparent 40%), radial-gradient(circle at 52% 118%, rgba(255,159,10,.38), transparent 42%), #fff",
            borderBlock: "1px solid #ececf0",
            padding: { xs: "40px 24px", sm: "48px" },
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#77717b", fontSize: 14, mb: "12px" }}>{t("emailConvHello")}</Typography>
          <Typography
            component="div"
            id="email-newsletter-title"
            role="heading"
            aria-level={1}
            sx={{ fontSize: { xs: 34, sm: 40 }, fontWeight: 600, letterSpacing: "-.04em", lineHeight: 1.06, m: "0 auto", maxWidth: 480 }}
          >
            <HighlightedText text={t("emailConvSubject")} highlight={amount} />
          </Typography>
          <Typography sx={{ color: "#68626c", fontSize: 15, lineHeight: 1.55, m: "20px auto 0", maxWidth: 470 }}>
            {t("emailConvBody")}
          </Typography>
        </Box>

        <Box sx={{ padding: { xs: "32px 24px 40px", sm: "32px 48px 40px" } }}>
          <Box
            sx={{
              background: "#f2f8fc",
              border: "1px solid #dceaf1",
              borderRadius: "14px",
              display: "grid",
              gap: "16px",
              gridTemplateColumns: { xs: "56px minmax(0,1fr) auto", sm: "64px minmax(0,1fr) auto" },
              padding: "16px 20px",
            }}
          >
            <Box
              component="img"
              src="/aerolite-air-purifier.png"
              alt={t("productName")}
              sx={{
                alignSelf: "center",
                background: "#fff",
                border: "1px solid #dce6ec",
                borderRadius: "12px",
                height: { xs: 56, sm: 64 },
                objectFit: "cover",
                width: { xs: 56, sm: 64 },
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ color: "#171419", fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t("productName")}</Typography>
              <Typography sx={{ color: "#8a848e", fontSize: 11.5, mt: "4px" }}>{t("earnRate")}</Typography>
            </Box>
            <Typography sx={{ alignSelf: "center", color: "#171419", fontSize: 14, fontWeight: 600 }}>{t("productPrice")}</Typography>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #e4e7eb",
              mt: "24px",
              pt: "24px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#77717b", fontSize: 12.5, fontWeight: 500 }}>{t("emailConvBalanceLabel")}</Typography>
            <Typography sx={{ color: "#171419", fontSize: 36, fontWeight: 600, letterSpacing: "-.045em", lineHeight: 1, mt: "8px" }}>RM {state.balance.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ pt: "24px", textAlign: "center" }}>
            <Link
              href={href}
              underline="none"
              sx={{
                alignItems: "center",
                background: "#0071e3",
                borderRadius: "12px",
                boxShadow: "0 10px 24px rgba(0,113,227,.24)",
                color: "#fff",
                display: "inline-flex",
                fontSize: 14,
                fontWeight: 600,
                gap: "8px",
                justifyContent: "center",
                minHeight: 44,
                padding: "0 21px",
                transition: "transform .2s ease, box-shadow .2s ease",
                "&:hover": { background: "#0064c8", boxShadow: "0 13px 28px rgba(0,113,227,.3)", transform: "translateY(-1px)" },
                "&:focus-visible": { outline: "3px solid #73c8f2", outlineOffset: 3 },
              }}
            >
              {isStub ? t("emailConvCtaStub") : t("emailConvCtaReal")}
              <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>

          <Box
            component="footer"
            sx={{
              background: "#f5f7fa",
              border: "1px solid #e3e8ef",
              borderRadius: "14px",
              color: "#85808b",
              fontSize: 10.5,
              lineHeight: 1.5,
              mt: "32px",
              padding: "20px 22px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#0071e3", fontSize: 12, fontWeight: 600, mb: "8px" }}>SmartAffiliate · SmartKood</Typography>
            {t("emailConvFooter")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  const parts = text.split(highlight);
  if (parts.length === 1) return text;
  return <>{parts[0]}<Box component="span" sx={{ color: "#ff3b6b" }}>{highlight}</Box>{parts.slice(1).join(highlight)}</>;
}

function HeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "45px minmax(0,1fr)", py: "2px" }}>
      <Box component="span" sx={{ color: "#929099", fontSize: 10, fontWeight: 600 }}>{label}</Box>
      <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</Box>
    </Box>
  );
}
