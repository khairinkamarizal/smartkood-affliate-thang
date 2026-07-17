import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { RangeControl } from "../RangeControl";
import { SegmentedControl } from "../SegmentedControl";
import type {
  Locale,
  PlaygroundState,
  Screen,
  SetPlaygroundState,
} from "../types";

type SidebarProps = {
  screens: Screen[];
  state: PlaygroundState;
  setState: SetPlaygroundState;
};

export function Sidebar({ screens, state, setState }: SidebarProps) {
  return (
    <Box
      component="aside"
      sx={{
        background: "var(--panel)",
        borderRight: "1px solid var(--border)",
        overflowY: "auto",
        padding: 2,
        scrollbarColor: "#3b4552 transparent",
      }}>
      <Typography
        component="h1"
        sx={{
          color: "var(--text)",
          fontSize: 14,
          fontWeight: 600,
          mt: 0,
          mb: 0.5,
        }}>
        Affiliate Widget - Wireframes
      </Typography>
      <Typography sx={{ color: "var(--text-dim)", fontSize: 11, mb: 2 }}>
        2026-05-07 design (replaces 260506)
      </Typography>

      <SectionHeading>Screen</SectionHeading>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {screens.map((screen, index) => {
          const active = state.screen === screen.id;
          return (
            <ButtonBase
              key={screen.id}
              onClick={() =>
                setState((current) => ({ ...current, screen: screen.id }))
              }
              sx={{
                background: active ? "var(--accent)" : "var(--panel-2)",
                border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                borderRadius: "6px",
                color: active ? "#fff" : "var(--text)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                font: "inherit",
                fontSize: 11,
                lineHeight: 1.4,
                padding: "9px 10px",
                textAlign: "left",
                transition:
                  "background 140ms var(--mui-ease), border-color 140ms var(--mui-ease), transform 140ms var(--mui-ease)",
                "&:hover": {
                  background: active ? "var(--accent)" : "var(--border)",
                  transform: "translateX(2px)",
                },
              }}>
              <Box
                component="span"
                sx={{ display: "block", width: "100%" }}>
                <Box
                  component="span"
                  sx={{
                    color: active
                      ? "rgba(255,255,255,0.82)"
                      : "var(--text-dim)",
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    mr: "8px",
                  }}>
                  {String(index + 1).padStart(2, "0")}
                </Box>
                <Box
                  component="span"
                  sx={{ fontWeight: 600 }}>
                  {screen.title}
                </Box>
              </Box>
              <Box
                component="span"
                sx={{
                  color: active ? "rgba(255,255,255,0.82)" : "var(--text-dim)",
                  display: "block",
                  fontSize: 10,
                  mt: "4px",
                }}>
                {screen.meta}
              </Box>
            </ButtonBase>
          );
        })}
      </Box>

      <SegmentedControl
        label="Locale"
        value={state.locale}
        options={[
          { label: "EN", value: "en" },
          { label: "MS", value: "ms" },
          { label: "ZH", value: "zh-CN" },
        ]}
        onChange={(locale: Locale) =>
          setState((current) => ({ ...current, locale }))
        }
      />

      <SectionHeading>State</SectionHeading>
      <RangeControl
        label="Pending balance"
        min={0}
        max={500}
        step={5}
        value={state.balance}
        display={`RM ${state.balance.toFixed(2)}`}
        onChange={(balance) => setState((current) => ({ ...current, balance }))}
      />
      <RangeControl
        label="Commission rate"
        min={1}
        max={15}
        step={1}
        value={state.rate}
        display={`${state.rate}%`}
        onChange={(rate) => setState((current) => ({ ...current, rate }))}
      />
      <RangeControl
        label="Last conversion (RM)"
        min={5}
        max={200}
        step={5}
        value={state.lastConv}
        display={`RM ${state.lastConv.toFixed(2)}`}
        onChange={(lastConv) =>
          setState((current) => ({ ...current, lastConv }))
        }
      />
    </Box>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      sx={{
        color: "var(--text-dim)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        mt: 2,
        mb: 1,
        textTransform: "uppercase",
      }}>
      {children}
    </Typography>
  );
}
