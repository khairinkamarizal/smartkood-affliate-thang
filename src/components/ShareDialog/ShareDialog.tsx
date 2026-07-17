import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import { useRef, useState, type ReactNode } from "react";
import { FormField } from "../FormField";
import type { ShareVariant, Translator } from "../types";

type ShareDialogScreenProps = {
  variant: ShareVariant;
  t: Translator;
};

export function ShareDialogScreen({ variant, t }: ShareDialogScreenProps) {
  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle at 85% 12%, rgba(90,200,250,.72), transparent 35%), radial-gradient(circle at 8% 62%, rgba(255,59,107,.34), transparent 35%), radial-gradient(circle at 75% 88%, rgba(255,159,10,.4), transparent 38%), linear-gradient(145deg, #f2f8ff 0%, #edf7ff 48%, #fff7e8 100%)",
        borderRadius: "8px",
        fontFamily: 'Roboto, sans-serif',
        minHeight: 650,
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backdropFilter: "blur(22px)",
          background: "rgba(24,22,29,.88)",
          color: "#fff",
          display: "flex",
          fontSize: 12,
          fontWeight: 500,
          height: 52,
          justifyContent: "center",
          letterSpacing: 0,
          padding: "14px",
        }}
      >
        SmartKood landing page (background dimmed)
      </Box>

      <Box aria-hidden="true" sx={{ inset: 52, left: 0, opacity: .42, position: "absolute", right: 0 }}>
        <Box sx={{ bgcolor: "rgba(255,255,255,.74)", borderRadius: 3, boxShadow: "0 18px 38px rgba(44,35,80,.12)", height: 160, m: 2 }} />
        <Box sx={{ bgcolor: "rgba(42,38,49,.58)", borderRadius: 1, height: 12, ml: 2, mt: 2, width: "58%" }} />
        <Box sx={{ bgcolor: "rgba(42,38,49,.32)", borderRadius: 1, height: 8, ml: 2, mt: 1.25, width: "76%" }} />
      </Box>
      <Box sx={{ backdropFilter: "blur(5px)", background: "rgba(17,15,24,.38)", inset: 52, left: 0, position: "absolute", right: 0 }} />
      <ShareDialog t={t} variant={variant} />
    </Box>
  );
}

function ShareDialog({ variant, t }: ShareDialogScreenProps) {
  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
      sx={{
        backdropFilter: "blur(30px) saturate(130%)",
        background:
          "radial-gradient(circle at 88% 0%, rgba(90,200,250,.18), transparent 34%), radial-gradient(circle at 8% 8%, rgba(0,113,227,.1), transparent 31%), rgba(255,255,255,.95)",
        border: "1px solid rgba(255,255,255,.88)",
        borderBottom: 0,
        borderRadius: "28px 28px 0 0",
        bottom: 0,
        boxShadow: "0 -24px 64px rgba(18,41,64,.24), inset 0 1px 0 rgba(255,255,255,.9)",
        color: "#19151f",
        left: 0,
        padding: "20px 20px 24px",
        position: "absolute",
        right: 0,
        "--sk-border": "#d9d8e0",
        "--sk-input-bg": "rgba(245,245,248,.9)",
        "--sk-secondary": "#0071e3",
        "--sk-text": "#19151f",
        "--sk-text-dim": "#746f7a",
        "&::before": {
          background: "linear-gradient(90deg, #5ac8fa, #0071e3 34%, #ff3b6b 68%, #ff9f0a)",
          borderRadius: "99px",
          content: '""',
          display: "block",
          height: 4,
          margin: "-4px auto 20px",
          width: 44,
        },
      }}
    >
      {variant === "initial" && (
        <>
          <DialogHeading text={t("dialogTitle")} />
          <DialogCopy>{t("dialogHelper")}</DialogCopy>
          <FormField label={t("emailLabel")} htmlFor="share-email">
            <input id="share-email" defaultValue="aishah@example.com" placeholder="you@example.com" type="email" />
          </FormField>
          <FormActions>
            <CancelButton>{t("cancel")}</CancelButton>
            <SubmitButton>{t("submit")}</SubmitButton>
          </FormActions>
        </>
      )}

      {variant === "submitting" && (
        <>
          <DialogHeading text={t("dialogTitle")} />
          <DialogCopy>{t("dialogHelper")}</DialogCopy>
          <FormField label={t("emailLabel")} htmlFor="share-email-loading">
            <input id="share-email-loading" defaultValue="aishah@example.com" disabled type="email" />
          </FormField>
          <FormActions>
            <CancelButton>{t("cancel")}</CancelButton>
            <SubmitButton disabled state="loading">
              <Box component="span" sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}>
                <CircularProgress size={14} sx={{ color: "inherit" }} />
                {t("submitting")}
              </Box>
            </SubmitButton>
          </FormActions>
        </>
      )}

      {variant === "success" && <ShareSuccess t={t} />}

      {variant === "error-rate" && (
        <>
          <DialogHeading text={t("dialogTitle")} />
          <Alert severity="warning" sx={alertStyles("#fff3cf", "#a66500")}>{t("errorRateLimited")}</Alert>
          <FormField label={t("emailLabel")} htmlFor="share-email-rate">
            <input id="share-email-rate" defaultValue="aishah@example.com" disabled type="email" />
          </FormField>
          <FormActions>
            <CancelButton>{t("cancel")}</CancelButton>
            <SubmitButton disabled state="unavailable">{t("submit")} (60s)</SubmitButton>
          </FormActions>
        </>
      )}

      {variant === "error-revoked" && (
        <>
          <DialogHeading text={t("dialogTitle")} />
          <Alert severity="error" sx={alertStyles("#fff0ee", "#b83c35")}>{t("errorRevoked")}</Alert>
          <SubmitButton fullWidth>{t("done")}</SubmitButton>
        </>
      )}
    </Box>
  );
}

function ShareSuccess({ t }: { t: Translator }) {
  const url = "https://buyer.smartaffiliate.com/shop/products/aerolite-3000?ref=AKLR8MX2";
  const [copied, setCopied] = useState(false);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollMore, setCanScrollMore] = useState(true);
  const shareRailRef = useRef<HTMLDivElement>(null);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(url); } catch { /* preview only */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const updateShareRail = () => {
    const rail = shareRailRef.current;
    if (!rail) return;
    setCanScrollBack(rail.scrollLeft > 4);
    setCanScrollMore(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  };
  const scrollPlatforms = (left: number) => {
    const rail = shareRailRef.current;
    if (!rail) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ behavior: reduceMotion ? "auto" : "smooth", left });
  };

  return (
    <>
      <DialogHeading text={t("successTitle")} />
      <Alert icon={false} severity="success" sx={alertStyles("rgba(229,250,241,.88)", "#087355")}>{t("successCommission")}</Alert>
      <Box sx={{ alignItems: "stretch", bgcolor: "rgba(247,247,250,.9)", border: "1px solid #dedde5", borderRadius: "13px", display: "flex", mb: "16px", overflow: "hidden" }}>
        <Box component="code" sx={{ color: "#19151f", flex: 1, fontFamily: "var(--mono)", fontSize: 10.5, minWidth: 0, overflow: "hidden", p: "12px", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</Box>
        <Button
          onClick={handleCopy}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          sx={{ borderLeft: "1px solid #dedde5", borderRadius: 0, color: copied ? "#087355" : "#0071e3", fontSize: 12, fontWeight: 600, minWidth: 92, textTransform: "none" }}
        >
          {copied ? t("copied") : t("copy")}
        </Button>
      </Box>

      <Typography sx={{ color: "#746f7a", fontSize: 10.5, fontWeight: 500, letterSpacing: ".02em", mb: "12px", textAlign: "center" }}>
        {t("emailUsedFor")}
      </Typography>

      <Box sx={{ mb: "20px", position: "relative", "&::before": { background: "linear-gradient(270deg, rgba(255,255,255,0), rgba(255,255,255,.96) 64%)", bottom: 4, content: canScrollBack ? '""' : "none", left: 0, pointerEvents: "none", position: "absolute", top: 0, width: 64, zIndex: 1 }, "&::after": { background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.96) 64%)", bottom: 4, content: canScrollMore ? '""' : "none", pointerEvents: "none", position: "absolute", right: 0, top: 0, width: 64, zIndex: 1 } }}>
        <Box
          ref={shareRailRef}
          onScroll={updateShareRail}
          sx={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            pb: "4px",
            pr: "48px",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            "& > :nth-of-type(1) .share-icon": { background: "linear-gradient(145deg, #e6fff2, #c6f7df)", color: "#087b55" },
            "& > :nth-of-type(2) .share-icon": { background: "linear-gradient(145deg, #edf4ff, #d9e8ff)", color: "#2466c9" },
            "& > :nth-of-type(3) .share-icon": { background: "linear-gradient(145deg, #ebf8ff, #d7efff)", color: "#2583bc" },
            "& > :nth-of-type(4) .share-icon": { background: "linear-gradient(145deg, #f4f4f5, #e7e7ea)", color: "#19151f" },
            "& > :nth-of-type(5) .share-icon": { background: "linear-gradient(145deg, #fff0f6, #f3e5ff)", color: "#b02d87" },
          }}
        >
          <ShareButton icon={<WhatsAppIcon />} label={t("whatsapp")} />
          <ShareButton icon={<FacebookIcon />} label={t("facebook")} />
          <ShareButton icon={<TelegramIcon />} label={t("telegram")} />
          <ShareButton icon={<XIcon />} label="X" />
          <ShareButton icon={<InstagramIcon />} label="Instagram" />
          <ShareButton icon={<LinkedInIcon />} label="LinkedIn" />
          <ShareButton icon={<RedditIcon />} label="Reddit" />
          <ShareButton icon={<PinterestIcon />} label="Pinterest" />
          <ShareButton icon={<MoreHorizIcon />} label={t("others")} />
        </Box>
        <Button
          aria-label="Previous sharing platforms"
          disabled={!canScrollBack}
          onClick={() => scrollPlatforms(-192)}
          sx={shareRailArrowStyles("left", canScrollBack)}
        >
          <ChevronLeftRoundedIcon />
        </Button>
        <Button
          aria-label={`${t("others")} platforms`}
          disabled={!canScrollMore}
          onClick={() => scrollPlatforms(192)}
          sx={shareRailArrowStyles("right", canScrollMore)}
        >
          <ChevronRightRoundedIcon />
        </Button>
      </Box>
      <SubmitButton fullWidth>{t("done")}</SubmitButton>
      <Box aria-live="polite" sx={{ height: 0, overflow: "hidden" }}>{copied ? t("copied") : ""}</Box>
    </>
  );
}

function ShareButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button sx={{ color: "#746f7a", display: "flex", flex: "0 0 58px", flexDirection: "column", fontSize: 10.5, fontWeight: 500, gap: .6, minHeight: 64, minWidth: 58, p: .5, textTransform: "none" }}>
      <Box className="share-icon" component="span" sx={{ alignItems: "center", bgcolor: "rgba(255,255,255,.88)", border: "1px solid rgba(25,21,31,.06)", borderRadius: "50%", boxShadow: "0 7px 18px rgba(46,37,72,.09)", color: "#35303b", display: "inline-flex", height: 38, justifyContent: "center", width: 38, "& svg": { fontSize: 19 } }}>{icon}</Box>
      <Box component="span" sx={{ maxWidth: 58, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</Box>
    </Button>
  );
}

function shareRailArrowStyles(side: "left" | "right", visible: boolean) {
  return {
    background: "#fff",
    border: "1px solid #dfe3e8",
    borderRadius: "50%",
    boxShadow: "0 8px 22px rgba(22,54,86,.18)",
    color: "#0071e3",
    height: 40,
    minWidth: 40,
    opacity: visible ? 1 : 0,
    p: 0,
    pointerEvents: visible ? "auto" : "none",
    position: "absolute",
    [side]: 0,
    top: 4,
    transition: "opacity .18s ease, transform .18s ease",
    width: 40,
    zIndex: 2,
    "&:hover": { background: "#fff", transform: `translateX(${side === "right" ? 2 : -2}px)` },
    "&:focus-visible": { outline: "3px solid #5ac8fa", outlineOffset: 2 },
  };
}

function DialogHeading({ text }: { text: string }) {
  return <Typography component="h3" id="share-dialog-title" sx={{ color: "#151219", fontSize: 24, fontWeight: 600, letterSpacing: "-.025em", lineHeight: 1.15, m: 0, mb: "8px" }}>{text}</Typography>;
}

function DialogCopy({ children }: { children: ReactNode }) {
  return <Typography sx={{ color: "#746f7a", fontSize: 13.5, lineHeight: 1.5, mb: "20px" }}>{children}</Typography>;
}

function FormActions({ children }: { children: ReactNode }) {
  return <Box sx={{ display: "grid", gap: "12px", gridTemplateColumns: "1fr 2fr" }}>{children}</Box>;
}

function CancelButton({ children }: { children: ReactNode }) {
  return <Button variant="text" sx={{ borderRadius: "12px", color: "#716b78", fontSize: 15, fontWeight: 500, minHeight: 46, textTransform: "none", "&:hover": { bgcolor: "rgba(31,27,38,.05)" } }}>{children}</Button>;
}

function SubmitButton({ children, disabled, fullWidth, state = "active" }: { children: ReactNode; disabled?: boolean; fullWidth?: boolean; state?: "active" | "loading" | "unavailable" }) {
  const unavailable = state === "unavailable";
  const loading = state === "loading";
  return (
    <Button
      variant="contained"
      disabled={disabled}
      disableElevation
      fullWidth={fullWidth}
      sx={{
        background: unavailable ? "#ececef" : "#0071e3",
        border: "1px solid rgba(255,255,255,.25)",
        borderRadius: "13px",
        boxShadow: unavailable || loading ? "none" : "0 11px 26px rgba(0,113,227,.24), inset 0 1px 0 rgba(255,255,255,.18)",
        color: unavailable ? "#8e8991" : "#fff",
        fontSize: loading ? 12.5 : 15,
        fontWeight: 600,
        minHeight: 46,
        minWidth: 0,
        textTransform: "none",
        transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s cubic-bezier(.22,1,.36,1)",
        whiteSpace: "nowrap",
        "&:hover": { background: unavailable ? "#ececef" : "#0064c8", boxShadow: unavailable || loading ? "none" : "0 14px 32px rgba(0,113,227,.3)", transform: unavailable || loading ? "none" : "translateY(-1px)" },
        "&.Mui-disabled": {
          background: unavailable ? "#ececef" : "#0071e3",
          boxShadow: "none",
          color: unavailable ? "#8e8991" : "#fff",
          opacity: unavailable ? 1 : .72,
        },
        "&:focus-visible": { outline: "3px solid #73c8f2", outlineOffset: 2 },
      }}
    >
      {children}
    </Button>
  );
}

function alertStyles(background: string, color: string) {
  return { bgcolor: background, border: `1px solid ${color}33`, borderRadius: "11px", color, fontSize: 12.5, lineHeight: 1.5, mb: "16px" };
}
