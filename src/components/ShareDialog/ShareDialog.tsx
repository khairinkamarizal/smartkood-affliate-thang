import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { useRef, useState, type ReactNode } from "react";
import { FormField } from "../FormField";
import type { ShareVariant, Translator } from "../types";

type ShareDialogScreenProps = {
  variant: ShareVariant;
  t: Translator;
};

export function ShareDialogScreen({ variant, t }: ShareDialogScreenProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          background: "var(--sk-primary)",
          color: "#fff",
          fontSize: 12,
          padding: "14px",
          textAlign: "center",
        }}>
        SmartKood landing page (background dimmed)
      </Box>
      <ShareDialog
        t={t}
        variant={variant}
      />
    </Box>
  );
}

function ShareDialog({ variant, t }: ShareDialogScreenProps) {
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "12px 12px 0 0",
        color: "var(--sk-text)",
        padding: "20px",
        position: "relative",
        "&::before": {
          background: "#d1d5db",
          borderRadius: "999px",
          content: '""',
          display: "block",
          height: 3,
          margin: "-8px auto 14px",
          width: 40,
        },
      }}>
      {variant === "initial" && (
        <>
          <DialogHeading text={t("dialogTitle")} />
          <Typography
            sx={{
              color: "var(--sk-text-dim)",
              fontSize: 12,
              lineHeight: 1.5,
              mb: 1.5,
            }}>
            {t("dialogHelper")}
          </Typography>
          <FormField label={t("emailLabel")}>
            <input
              defaultValue="aishah@example.com"
              placeholder="you@example.com"
              type="email"
            />
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
          <Typography
            sx={{
              color: "var(--sk-text-dim)",
              fontSize: 12,
              lineHeight: 1.5,
              mb: 1.5,
            }}>
            {t("dialogHelper")}
          </Typography>
          <FormField label={t("emailLabel")}>
            <input
              defaultValue="aishah@example.com"
              disabled
              type="email"
            />
          </FormField>
          <FormActions>
            <CancelButton>{t("cancel")}</CancelButton>
            <SubmitButton disabled>
              <Box
                component="span"
                sx={{
                  alignItems: "center",
                  display: "inline-flex",
                  gap: 1,
                }}>
                <CircularProgress
                  size={14}
                  sx={{ color: "#fff" }}
                />
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
          <Alert
            severity="warning"
            sx={{ mb: 1.5, fontSize: 12 }}>
            {t("errorRateLimited")}
          </Alert>
          <FormField label={t("emailLabel")}>
            <input
              defaultValue="aishah@example.com"
              disabled
              type="email"
            />
          </FormField>
          <FormActions>
            <CancelButton>{t("cancel")}</CancelButton>
            <SubmitButton disabled>{t("submit")} (60s)</SubmitButton>
          </FormActions>
        </>
      )}
      {variant === "error-revoked" && (
        <>
          <DialogHeading text={t("dialogTitle")} />
          <Alert
            severity="error"
            sx={{ mb: 1.5, fontSize: 12 }}>
            {t("errorRevoked")}
          </Alert>
          <FormActions>
            <SubmitButton>{t("done")}</SubmitButton>
          </FormActions>
        </>
      )}
    </Box>
  );
}

function ShareSuccess({ t }: { t: Translator }) {
  const url =
    "https://buyer.smartaffiliate.com/shop/products/aerolite-3000?ref=AKLR8MX2";
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollCarousel = (dir: -1 | 1) => {
    carouselRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* noop */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <DialogHeading text={t("successTitle")} />
      <Alert
        icon={false}
        severity="success"
        sx={{
          bgcolor: "#ecfdf5",
          border: "1px solid #6ee7b7",
          borderRadius: "6px",
          color: "#047857",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.02em",
          mb: 1.25,
          py: "6px",
        }}>
        {t("successCommission")}
      </Alert>
      <Box
        sx={{
          alignItems: "stretch",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          display: "flex",
          mb: 1.5,
          overflow: "hidden",
        }}>
        <Box
          sx={{
            color: "var(--sk-text)",
            flex: 1,
            fontFamily: "var(--mono)",
            fontSize: 11.5,
            letterSpacing: "-0.01em",
            minWidth: 0,
            overflow: "hidden",
            padding: "9px 12px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
          {url}
        </Box>
        <Button
          onClick={handleCopy}
          disableRipple
          sx={{
            borderLeft: "1px solid #e5e7eb",
            borderRadius: 0,
            color: copied ? "#047857" : "var(--sk-secondary)",
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 600,
            gap: 0,
            letterSpacing: "0.02em",
            minWidth: 80,
            padding: "0 12px",
            textTransform: "none",
            transition: "color 0.18s ease, background 0.18s ease",
            "&:hover": { background: "#f3f4f6" },
          }}
          startIcon={
            copied ? (
              <CheckIcon fontSize="small" />
            ) : (
              <ContentCopyIcon fontSize="small" />
            )
          }>
          {copied ? t("copied") : t("copy")}
        </Button>
      </Box>
      <Typography
        sx={{
          color: "var(--sk-text-dim)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.06em",
          mb: 0.75,
          mt: 0.5,
          textAlign: "center",
          textTransform: "uppercase",
        }}>
        {t("emailUsedFor")}
      </Typography>
      <Box
        sx={{
          position: "relative",
        }}>
        {canScrollLeft && (
          <Box
            sx={{
              background:
                "linear-gradient(to right, #fff 50%, rgba(255,255,255,0))",
              bottom: 0,
              left: -10,
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              width: 30,
              zIndex: 1,
            }}
          />
        )}
        {canScrollRight && (
          <Box
            sx={{
              background:
                "linear-gradient(to left, #fff 50%, rgba(255,255,255,0))",
              bottom: 0,
              pointerEvents: "none",
              position: "absolute",
              right: -10,
              top: 0,
              width: 30,
              zIndex: 1,
            }}
          />
        )}
        {canScrollLeft && (
          <IconButton
            aria-label="Scroll left"
            onClick={() => scrollCarousel(-1)}
            size="small"
            sx={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "50%",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
              color: "var(--sk-text)",
              height: 24,
              left: -10,
              position: "absolute",
              top: 24,
              transform: "translateY(-50%)",
              width: 24,
              zIndex: 2,
              "&:hover": { background: "#f9fafb", borderColor: "#94a3b8" },
            }}>
            <ChevronLeftIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
        <Box
          ref={carouselRef}
          onScroll={handleScroll}
          sx={{
            display: "flex",
            fontSize: 10,
            gap: 1.5,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}>
          <ShareButton
            icon={<WhatsAppIcon fontSize="small" />}
            label={t("whatsapp")}
          />
          <ShareButton
            icon={<FacebookIcon fontSize="small" />}
            label={t("facebook")}
          />
          <ShareButton
            icon={<TelegramIcon fontSize="small" />}
            label={t("telegram")}
          />
          <ShareButton
            icon={<XIcon fontSize="small" />}
            label="X"
          />
          <ShareButton
            icon={<InstagramIcon fontSize="small" />}
            label="Instagram"
          />
          <ShareButton
            icon={<LinkedInIcon fontSize="small" />}
            label="LinkedIn"
          />
          <ShareButton
            icon={<RedditIcon fontSize="small" />}
            label="Reddit"
          />
          <ShareButton
            icon={<PinterestIcon fontSize="small" />}
            label="Pinterest"
          />
          <ShareButton
            icon={<MoreHorizIcon fontSize="small" />}
            label={t("others")}
          />
        </Box>
        {canScrollRight && (
          <IconButton
            aria-label="Scroll right"
            onClick={() => scrollCarousel(1)}
            size="small"
            sx={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "50%",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
              color: "var(--sk-text)",
              height: 24,
              position: "absolute",
              right: -10,
              top: 24,
              transform: "translateY(-50%)",
              width: 24,
              zIndex: 2,
              "&:hover": { background: "#f9fafb", borderColor: "#94a3b8" },
            }}>
            <ChevronRightIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>
      <SubmitButton fullWidth>{t("done")}</SubmitButton>
    </>
  );
}

function ShareButton({
  icon,
  label,
  primary,
}: {
  icon: ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <Button
      variant="text"
      disableRipple
      sx={{
        alignItems: "center",
        background: "transparent",
        color: "#8b949e",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        fontSize: 11,
        fontWeight: 400,
        gap: 0.75,
        lineHeight: 1,
        letterSpacing: "0.01em",
        minHeight: 64,
        minWidth: 40,
        padding: "4px 0",
        scrollSnapAlign: "start",
        textAlign: "center",
        textTransform: "none",
        width: 40,
        "&:hover": {
          background: "transparent",
          "& .share-btn-icon": {
            background: primary ? "var(--sk-secondary)" : "#f3f4f6",
            borderColor: primary ? "var(--sk-secondary)" : "#cbd5e1",
          },
        },
      }}>
      <Box
        className="share-btn-icon"
        component="span"
        sx={{
          alignItems: "center",
          background: primary ? "var(--sk-secondary)" : "#f9fafb",
          border: "1px solid #e5e7eb",
          borderColor: primary ? "var(--sk-secondary)" : "#e5e7eb",
          borderRadius: "50%",
          color: primary ? "#fff" : "#8b949e",
          display: "inline-flex",
          height: 40,
          justifyContent: "center",
          transition: "background 0.15s ease, border-color 0.15s ease",
          width: 40,
        }}>
        {icon}
      </Box>
      <Box
        component="span"
        sx={{
          maxWidth: 40,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: 40,
        }}>
        {label}
      </Box>
    </Button>
  );
}

function DialogHeading({ text }: { text: string }) {
  return (
    <Typography
      component="h3"
      sx={{
        color: "var(--sk-text)",
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        m: 0,
        mb: 1.25,
      }}>
      {text}
    </Typography>
  );
}

function FormActions({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1.25,
        mt: 1.5,
        "& > *:nth-of-type(1)": { gridColumn: "span 1" },
        "& > *:nth-of-type(2)": { gridColumn: "span 2" },
      }}>
      {children}
    </Box>
  );
}

function CancelButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outlined"
      sx={{
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        color: "var(--sk-text)",
        fontWeight: 500,
        letterSpacing: "0.01em",
        minHeight: 38,
        padding: "8px 14px",
        textTransform: "none",
        "&:hover": { background: "#f9fafb", borderColor: "#9ca3af" },
      }}>
      {children}
    </Button>
  );
}

function SubmitButton({
  children,
  disabled,
  fullWidth,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      disableElevation
      fullWidth={fullWidth}
      sx={{
        bgcolor: "var(--sk-secondary)",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: 600,
        letterSpacing: "0.01em",
        minHeight: 38,
        padding: "8px 14px",
        textTransform: "none",
        lineHeight: 1,
        "&:hover": {
          bgcolor: "var(--sk-secondary)",
          filter: "brightness(1.05)",
        },
        "&.Mui-disabled": {
          bgcolor: "var(--sk-secondary)",
          color: "#fff",
          opacity: 0.5,
        },
      }}>
      {children}
    </Button>
  );
}
