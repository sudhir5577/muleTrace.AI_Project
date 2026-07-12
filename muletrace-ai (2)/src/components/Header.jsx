import React, { useState, useEffect, useRef } from "react";
import { Shield, Palette, Activity, Cpu, Clock, CheckCircle, Sun, Moon, X, User, Mail, ShieldAlert } from "lucide-react";

const BACKGROUND_PRESETS = [
  { name: "Cosmic Charcoal", r: 8, g: 8, b: 8, color: "#080808" },
  { name: "Midnight Navy", r: 11, g: 16, b: 28, color: "#0b101c" },
  { name: "Emerald Safe", r: 6, g: 20, b: 14, color: "#06140e" },
  { name: "Crimson Alert", r: 24, g: 8, b: 10, color: "#18080a" },
  { name: "Royal Amethyst", r: 20, g: 10, b: 32, color: "#140a20" },
  { name: "Amber Warning", r: 26, g: 18, b: 6, color: "#1a1206" },
  { name: "Deep Ocean", r: 5, g: 25, b: 35, color: "#051923" },
  { name: "Light Cyber", r: 245, g: 247, b: 250, color: "#f5f7fa" }
];

export default function Header({ 
  activeTab, 
  onSearch, 
  unreadAlertsCount, 
  theme, 
  onToggleTheme,
  userPrincipal = "investigator",
  userClearance = "LEVEL 2: COMPLIANCE OFFICER",
  bgR = 8,
  bgG = 8,
  bgB = 8,
  setBgR = () => {},
  setBgG = () => {},
  setBgB = () => {}
}) {
  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isRadialOpen, setIsRadialOpen] = useState(false);

  const wheelButtonRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const isScrollUp = e.deltaY < 0;
      const currentIndex = BACKGROUND_PRESETS.findIndex(
        p => p.r === bgR && p.g === bgG && p.b === bgB
      );
      let nextIndex = currentIndex === -1 ? 0 : currentIndex;
      if (isScrollUp) {
        nextIndex = (nextIndex - 1 + BACKGROUND_PRESETS.length) % BACKGROUND_PRESETS.length;
      } else {
        nextIndex = (nextIndex + 1) % BACKGROUND_PRESETS.length;
      }
      const target = BACKGROUND_PRESETS[nextIndex];
      setBgR(target.r);
      setBgG(target.g);
      setBgB(target.b);
    };

    const element = wheelButtonRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, [bgR, bgG, bgB, setBgR, setBgG, setBgB]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      const parts = formatter.formatToParts(now).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});
      const formatted = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} IST`;
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Command Dashboard";
      case "trace":
        return "MuleTrace Visualizer";
      case "sandbox":
        return "Behavioral Sandbox";
      case "sar":
        return "SAR Report Desk";
      case "alerts":
        return "Active Alerts Console";
      case "funds":
        return "Flagged Funds Ledger";
      case "risk":
        return "Risk Profile Analytics";
      case "gateways":
        return "Secure Gateway Interfaces";
      case "jurisdictions":
        return "Global Risk & Jurisdictions";
      default:
        return "MuleTrace Command";
    }
  };

  return (
    <header className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 z-30">
      {/* Platform Branding */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-emerald-400 rounded-xl rotate-12 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
          <Shield className="w-5 h-5 text-black -rotate-12" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black text-white uppercase tracking-[0.15em] font-sans">
              MULETRACE.AI
            </h1>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-mono border border-emerald-500/20 uppercase tracking-widest font-bold">
              LIVE GATEWAY
            </span>
          </div>
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-0.5">
            {getTabTitle()} // BUILD 0.9.0
          </p>
        </div>
      </div>

      {/* Middle spacer */}
      <div className="flex-1" />

      {/* Unified Telemetry & Control Toolbar */}
      <div className="flex flex-wrap items-center justify-end gap-3.5 shrink-0">
        {/* Connection Heuristics Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[10px] font-mono uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-white/40">Engine:</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>

        {/* Live Clock Tracker */}
        <div className="hidden md:flex items-center gap-2 bg-white/[0.02] border border-white/10 px-3 py-1.5 rounded-xl text-white/50 text-[10px] font-mono uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentTime}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 w-9 h-9 text-white/60 hover:text-white bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md hover:scale-[1.05]"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
        </button>

        {/* Aesthetic Color Wheel Popper Trigger with visual color-wheel conic-gradient image */}
        <div className="relative flex items-center justify-center shrink-0 select-none" id="header-aesthetic-wheel-trigger">
          <button 
            ref={wheelButtonRef}
            onClick={() => setIsRadialOpen(!isRadialOpen)}
            className="w-9 h-9 bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl transition-all flex items-center justify-center shadow-md hover:scale-[1.05] active:scale-95 cursor-pointer relative"
            title="Aesthetic Spectrum: Scroll over to rotate, click to open color wheel!"
          >
            {/* The beautiful color-wheel conic-gradient image */}
            <div 
              className="w-5.5 h-5.5 rounded-full relative overflow-hidden flex items-center justify-center shrink-0 shadow-inner"
              style={{ 
                background: "conic-gradient(from 0deg, #ff3b30 0%, #ff9500 12%, #ffcc00 25%, #4cd964 37%, #5ac8fa 50%, #007aff 62%, #5856d6 75%, #ff2d55 87%, #ff3b30 100%)",
                border: "1.5px solid rgba(255,255,255,0.25)"
              }}
            >
              {/* Spinning overlay border */}
              <span className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow pointer-events-none"></span>
              {/* Mini center dot for currently active theme color */}
              <div 
                className="w-2.5 h-2.5 rounded-full border border-white/30 shadow-md shadow-black/60 flex items-center justify-center"
                style={{ 
                  background: `rgb(${bgR}, ${bgG}, ${bgB})`,
                  boxShadow: `0 0 3px rgba(${bgR}, ${bgG}, ${bgB}, 0.8)`
                }}
              >
                <Palette className="w-1.5 h-1.5 text-white/90 drop-shadow-md" />
              </div>
            </div>
          </button>

          {/* Aesthetic Dial Dropdown Popover */}
          {isRadialOpen && (
            <>
              {/* Close popover clicking outside */}
              <div className="fixed inset-0 z-40" onClick={() => setIsRadialOpen(false)} />
              <div className="absolute right-0 top-11 p-3.5 bg-[#0a0a0c]/95 border border-white/15 rounded-2xl shadow-2xl shadow-black/95 z-50 w-44 font-mono animate-in fade-in zoom-in-95 duration-150">
                <div className="text-center text-[8px] font-bold uppercase tracking-wider text-white/45 mb-2.5">
                  Aesthetic Wheel
                </div>
                <div className="relative h-24 w-full flex items-center justify-center">
                  {/* Inner Circle Label */}
                  <div className="w-10 h-10 rounded-full border border-white/10 flex flex-col items-center justify-center bg-black/40 shadow-inner z-10 pointer-events-none">
                    <span className="text-[6px] text-white/40 uppercase">Theme</span>
                    <span className="text-[7px] font-bold text-cyan-400">
                      #{bgR.toString(16).padStart(2, "0").toUpperCase()}{bgG.toString(16).padStart(2, "0").toUpperCase()}
                    </span>
                  </div>

                  {/* Decorative Ring */}
                  <svg className="absolute w-20 h-20 text-white/5 animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>

                  {/* Trigonometric Circle layout for presets */}
                  {BACKGROUND_PRESETS.map((preset, idx) => {
                    const angle = (idx * 2 * Math.PI) / BACKGROUND_PRESETS.length - Math.PI / 2;
                    const radius = 34; // px radius
                    const x = Math.round(radius * Math.cos(angle));
                    const y = Math.round(radius * Math.sin(angle));
                    const isActive = bgR === preset.r && bgG === preset.g && bgB === preset.b;

                    return (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setBgR(preset.r);
                          setBgG(preset.g);
                          setBgB(preset.b);
                        }}
                        title={preset.name}
                        className={`absolute w-4.5 h-4.5 rounded-full cursor-pointer border hover:scale-110 transition-all duration-200 flex items-center justify-center z-20 ${
                          isActive ? "border-cyan-400 scale-105 shadow-md shadow-cyan-400/20" : "border-white/20 hover:border-white/55"
                        }`}
                        style={{
                          backgroundColor: preset.color,
                          transform: `translate(${x}px, ${y}px)`
                        }}
                      >
                        {isActive && <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping pointer-events-none" />}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[7px] text-center text-white/30 uppercase tracking-widest mt-2 border-t border-white/5 pt-2">
                  Scroll over button ↺
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

        {/* Profile */}
        <button 
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2.5 text-left cursor-pointer hover:opacity-80 active:scale-95 transition-all group"
          title="View Investigator Profile"
        >
          <div className="hidden sm:block text-right">
            <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
              {userPrincipal === "investigator" ? "Insp. S. Reddy" : userPrincipal}
            </div>
            <div className="text-[9px] text-cyan-400 font-mono uppercase tracking-tight max-w-[170px] truncate" title={userClearance}>
              {userClearance}
            </div>
          </div>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-cyan-500/40 flex items-center justify-center text-white text-xs font-bold font-mono shadow-md uppercase transition-colors">
            {userPrincipal.substring(0, 2)}
          </div>
        </button>
      </div>

      {/* Investigator Personal Info Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-[#080808]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300 text-left">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#080808]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Investigator Profile</h3>
                  <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Internal Directory Access</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="p-1.5 border border-white/10 text-white/60 hover:text-white bg-transparent hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Details Card */}
            <div className="p-6 space-y-5">
              
              {/* Avatar and Name */}
              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-400 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#0c0c0c] flex items-center justify-center text-white text-sm font-black font-mono">
                    SR
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">Sudhir Reddy</h4>
                  <p className="text-xs text-cyan-400 font-mono">Insp. S. Reddy</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] text-white/50 uppercase font-mono tracking-widest">Active Session</span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5 font-mono">Clearance Level</span>
                    <span className="font-bold text-white font-mono uppercase text-[10px] text-cyan-400">{userClearance}</span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-0.5 font-mono">Badge ID</span>
                    <span className="font-bold text-white font-mono text-[10px]">FCIU-9029-SR</span>
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-1 font-mono">Official Email</span>
                  <div className="flex items-center gap-2 text-white/80 font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-white/30" />
                    <span>sudhirreddy1290@gmail.com</span>
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-1 font-mono">Department & Assignment</span>
                  <div className="text-[11px] text-white/80 space-y-1">
                    <div><strong className="text-white">Dept:</strong> Financial Crime Investigation Unit (FCIU)</div>
                    <div><strong className="text-white">Focus:</strong> India UPI Network & Mule Account Detection</div>
                  </div>
                </div>
              </div>

              {/* Footer info/Status */}
              <div className="bg-cyan-950/10 border border-cyan-500/10 p-3.5 rounded-xl flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                <p className="text-[10px] text-white/60 leading-relaxed font-mono">
                  This identity card contains encrypted cryptographic clearance tokens. Authorized personnel only.
                </p>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono font-bold uppercase tracking-widest text-white transition-all cursor-pointer"
              >
                Acknowledge & Close
              </button>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
