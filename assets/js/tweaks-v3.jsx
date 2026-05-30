/* ============================================================
   Tweaks bridge (v3) — dark + red accent default
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#e5484d",
  "displayFont": "Space Grotesk",
  "glass": true,
  "motion": true
}/*EDITMODE-END*/;

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function applyTweaks(t) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t.theme);
  root.setAttribute("data-motion", t.motion ? "on" : "off");
  root.setAttribute("data-glass", t.glass ? "on" : "off");
  const [r, g, b] = hexToRgb(t.accent);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-glow", `rgba(${r},${g},${b},${t.theme === "dark" ? 0.26 : 0.18})`);
  root.style.setProperty("--accent-soft", `rgba(${r},${g},${b},${t.theme === "dark" ? 0.13 : 0.09})`);
  const lum = (0.299*r + 0.587*g + 0.114*b);
  root.style.setProperty("--accent-ink", lum > 150 ? "#16151a" : "#ffffff");
  root.style.setProperty("--display", `"${t.displayFont}", system-ui, sans-serif`);
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel>
      <TweakSection label="Theme" />
      <TweakRadio label="Mode" value={t.theme} options={["dark", "light"]}
                  onChange={(v) => setTweak("theme", v)} />
      <TweakColor label="Accent" value={t.accent}
                  options={["#6d4aff", "#e5484d", "#2f7df6", "#1ba35d", "#d98a1f"]}
                  onChange={(v) => setTweak("accent", v)} />
      <TweakSection label="Type" />
      <TweakSelect label="Display font" value={t.displayFont}
                   options={["Space Grotesk", "Sora", "IBM Plex Sans"]}
                   onChange={(v) => setTweak("displayFont", v)} />
      <TweakSection label="Surface" />
      <TweakToggle label="Liquid glass" value={t.glass}
                   onChange={(v) => setTweak("glass", v)} />
      <TweakSection label="Motion" />
      <TweakToggle label="Animations" value={t.motion}
                   onChange={(v) => setTweak("motion", v)} />
    </TweaksPanel>
  );
}

applyTweaks(TWEAK_DEFAULTS);

const __twkRoot = document.createElement("div");
document.body.appendChild(__twkRoot);
ReactDOM.createRoot(__twkRoot).render(<TweaksApp />);
