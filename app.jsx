/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakColor, TweakToggle, TweakRadio */
const { useState, useEffect, useMemo } = React;

/* ============================================================
   TOOL DATA
   id-tag, name, subtitle (description / version), category,
   size, version, tier (norm / warn / crit), url
============================================================ */
const TOOLS = [
  { id: "ECO-001", name: "EcoSetup",       sub: "Instalador principal do sistema Eco",         cat: "CORE",    size: "412 MB", ver: "v7.4.2",  tier: "warn", url: "https://drive.google.com/drive/folders/1LIN4U6YiDpQNT8r33H1eCv6xz_2fxYG2?usp=drive_link"},
  { id: "RMT-002", name: "Team Viewer",    sub: "Acesso remoto / suporte assistido",            cat: "REMOTE",  size: "39 MB",  ver: "v15.51",  tier: "norm", url: "https://get.teamviewer.com/6f4sv6y" },
  { id: "PAY-003", name: "Tef / Pix",      sub: "Módulo de pagamento + integração Pix",          cat: "PAYMENT", size: "84 MB",  ver: "v3.0.1",  tier: "warn", url: "https://drive.google.com/drive/folders/17h-menxMtAfZ6oyvkc_Hw9VAdjf3nsxP?usp=drive_link" },
  { id: "RMT-004", name: "AnyDesk",        sub: "Sessão remota leve / fallback",                 cat: "REMOTE",  size: "5.2 MB", ver: "v8.0.9",  tier: "norm", url: "https://anydesk.com/pt/downloads/thank-you?dv=win_exe" },
  { id: "DB-005",  name: "IBExpert",       sub: "GUI admin Firebird / Interbase",                cat: "DATABASE",size: "26 MB",  ver: "v2024.1", tier: "norm", url: "https://drive.google.com/file/d/1o89OovuZN7ofZtDLcadA6xASkZ2OfAzE/view?usp=drive_link" },
  { id: "DB-006",  name: "PostgreSQL 9.5", sub: "Servidor PostgreSQL legado",                    cat: "DATABASE",size: "192 MB", ver: "v9.5.25", tier: "crit", url: "https://sbp.enterprisedb.com/getfile.jsp?fileid=1257548" },
  { id: "RPT-007", name: "CrystalReports", sub: "Runtime / engine de relatórios",                cat: "REPORTS", size: "118 MB", ver: "v13.0.34",tier: "norm", url: "https://drive.google.com/file/d/1kZf4oItKAaF4ZskAJy2C_a7zRL3Onrj6/view?usp=drive_link" },
  { id: "DB-008",  name: "PostgreSQL 12",  sub: "Servidor PostgreSQL produção",                  cat: "DATABASE",size: "224 MB", ver: "v12.18",  tier: "norm", url: "https://sbp.enterprisedb.com/getfile.jsp?fileid=1259186" },
  { id: "DB-009",  name: "Firebird 32",    sub: "Servidor / cliente Firebird x86",               cat: "DATABASE",size: "12 MB",  ver: "v3.0.11", tier: "norm", url: "https://github.com/FirebirdSQL/firebird/releases/download/R2_5_9/Firebird-2.5.9.27139_0_Win32.exe" },
  { id: "DRV-010", name: "ODBC 32",        sub: "Driver ODBC x86 para PG/FB",                    cat: "DRIVER",  size: "6 MB",   ver: "v13.02",  tier: "norm", url: "https://sourceforge.net/projects/firebird/files/firebird-ODBC-driver/2.0.5-Release/Firebird_ODBC_2.0.5.156_Win32.exe/download" },
  { id: "DB-011",  name: "Firebird 64",    sub: "Servidor / cliente Firebird x64",               cat: "DATABASE",size: "14 MB",  ver: "v3.0.11", tier: "norm", url: "https://github.com/FirebirdSQL/firebird/releases/download/R2_5_9/Firebird-2.5.9.27139_0_x64.exe" },
  { id: "DRV-012", name: "ODBC 64",        sub: "Driver ODBC x64 para PG/FB",                    cat: "DRIVER",  size: "7 MB",   ver: "v13.02",  tier: "norm", url: "https://sourceforge.net/projects/firebird/files/firebird-ODBC-driver/2.0.5-Release/Firebird_ODBC_2.0.5.156_x64.exe/download" },
];

const CATS = ["ALL", "CORE", "REMOTE", "PAYMENT", "DATABASE", "DRIVER", "REPORTS"];

/* ============================================================ */
function StatusBar({ time, theme }) {
  return (
    <div className="status-bar">
      <div className="item"><span className="dot" /><span className="accent">SYS://ONLINE</span></div>
      <div className="sep" />
      <div className="item"><span className="key">NODE</span><span className="val">HMC-SUPPORT-01</span></div>
      <div className="sep" />
      <div className="item"><span className="key">USER</span><span className="val">@operador</span></div>
      <div className="sep" />
      <div className="item"><span className="key">NET</span><span className="val">▮▮▮▮▯ 142ms</span></div>
      <div className="spacer" />
      <div className="item"><span className="key">THEME</span><span className="val">{theme}</span></div>
      <div className="sep" />
      <div className="item"><span className="key">UTC-3</span><span className="val accent">{time}</span></div>
    </div>
  );
}

function Header({ time, date }) {
  return (
    <header className="header">
      <div className="brand-mark">
        <div className="hmc-badge">HMC</div>
        <div className="title-block">
          <div className="eyebrow">SUPPORT TERMINAL · BUILD 2087.04</div>
          <h1>
            ECO<span className="slash">/</span><span className="glitch" data-text="LINKS">LINKS</span>
          </h1>
          <div className="sub">
            Repositório interno de ferramentas operacionais. Acesso restrito ao time de suporte HMC. <span className="tag">// selecione um módulo abaixo para iniciar download.</span>
          </div>
        </div>
      </div>
      <div className="meta-block">
        <div className="big">{time}</div>
        <div className="row"><span>DATE</span><span className="v">{date}</span></div>
        <div className="row"><span>SESSION</span><span className="v">0x7F2A·9C41</span></div>
        <div className="row"><span>MODULES</span><span className="v">{TOOLS.length} / {TOOLS.length}</span></div>
      </div>
    </header>
  );
}

function Toolbar({ query, setQuery, cat, setCat }) {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="prompt">{">_"}</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search modules :: nome, categoria, id…"
        />
        <span className="caret" />
      </div>
      <div className="filter-group">
        {CATS.map(c => (
          <button
            key={c}
            className={"filter-btn " + (cat === c ? "active" : "")}
            onClick={() => setCat(c)}
          >{c}</button>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

function Module({ t }) {
  return (
    <a className={"module " + (t.tier === "warn" ? "warn" : t.tier === "crit" ? "crit" : "")} href={t.url}>
      <span className="corner tl" />
      <span className="corner br" />
      <div className="module-top">
        <div className="module-cat"><span className="pulse" />{t.cat}</div>
        <div className="id-tag">{t.id}</div>
      </div>
      <h3 className="module-name">{t.name}</h3>
      <div className="module-sub">{t.sub}</div>
      <div className="module-meta">
        <div className="k">VERSION</div><div className="v">{t.ver}</div>
        <div className="k">SIZE</div><div className="v">{t.size}</div>
        <div className="k">STATUS</div><div className="v">{t.tier === "crit" ? "LEGACY" : t.tier === "warn" ? "CRITICAL" : "STABLE"}</div>
        <div className="k">CHECKSUM</div><div className="v">OK·{t.id.split("-")[1]}</div>
      </div>
      <div className="download-cta">
        <span>// EXECUTE DOWNLOAD</span>
        <Arrow />
      </div>
    </a>
  );
}

function Grid({ tools }) {
  if (tools.length === 0) {
    return (
      <div style={{
        padding: "60px 48px",
        textAlign: "center",
        fontFamily: "JetBrains Mono, monospace",
        color: "var(--ink-2)",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontSize: 12,
      }}>// no modules matched query</div>
    );
  }
  return (
    <div className="grid">
      {tools.map(t => <Module key={t.id} t={t} />)}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>© HMC SERVIÇOS · INTERNAL USE ONLY · v2.0.0</div>
      <div className="links">
        <a href="#">// INSTAGRAM</a>
        <a href="#">// SUPPORT-DESK</a>
        <a href="#">// CHANGELOG</a>
      </div>
    </footer>
  );
}

/* ============================================================ */
function App() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "#00fff0",
    "scanlines": true,
    "glitch": true
  }/*EDITMODE-END*/);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("ALL");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // apply accent
  useEffect(() => {
    const map = {
      "#00fff0": { a: "#00fff0", a2: "#ffe600", a3: "#ff2bd6", name: "CYAN-77" },
      "#ffe600": { a: "#ffe600", a2: "#ff8a00", a3: "#ff2bd6", name: "AMBER-44" },
      "#ff2bd6": { a: "#ff2bd6", a2: "#00fff0", a3: "#ffe600", name: "MAGENTA-21" },
      "#6dffa1": { a: "#6dffa1", a2: "#00fff0", a3: "#ffe600", name: "MATRIX-09" },
    };
    const p = map[tweaks.accent] || map["#00fff0"];
    document.documentElement.style.setProperty("--accent", p.a);
    document.documentElement.style.setProperty("--accent-2", p.a2);
    document.documentElement.style.setProperty("--accent-3", p.a3);
    document.documentElement.dataset.themeName = p.name;
  }, [tweaks.accent]);

  useEffect(() => {
    document.body.classList.toggle("scanlines", !!tweaks.scanlines);
    document.body.classList.toggle("glitch-on", !!tweaks.glitch);
  }, [tweaks.scanlines, tweaks.glitch]);

  const themeName = useMemo(() => {
    const map = {
      "#00fff0": "CYAN-77",
      "#ffe600": "AMBER-44",
      "#ff2bd6": "MAGENTA-21",
      "#6dffa1": "MATRIX-09",
    };
    return map[tweaks.accent] || "CYAN-77";
  }, [tweaks.accent]);

  const tools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter(t => {
      if (cat !== "ALL" && t.cat !== cat) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.sub.toLowerCase().includes(q)
      );
    });
  }, [query, cat]);

  const pad = (n) => String(n).padStart(2, "0");
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;

  return (
    <>
      <StatusBar time={time} theme={themeName} />
      <Header time={time} date={date} />
      <Toolbar query={query} setQuery={setQuery} cat={cat} setCat={setCat} />
      <div className="section-label">
        <span>MODULES</span>
        <span className="bar" />
        <span className="count">{tools.length.toString().padStart(2, "0")} / {TOOLS.length.toString().padStart(2, "0")}</span>
      </div>
      <Grid tools={tools} />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            options={["#00fff0", "#ffe600", "#ff2bd6", "#6dffa1"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection label="FX">
          <TweakToggle
            label="Scanlines"
            value={tweaks.scanlines}
            onChange={(v) => setTweak("scanlines", v)}
          />
          <TweakToggle
            label="Glitch title"
            value={tweaks.glitch}
            onChange={(v) => setTweak("glitch", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
