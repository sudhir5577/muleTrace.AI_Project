import React, { useState } from "react";
import { 
  Globe, 
  TrendingUp, 
  ShieldAlert, 
  Coins, 
  MapPin, 
  Search, 
  ArrowRight, 
  Sliders, 
  Filter, 
  Activity, 
  Download, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  RefreshCw,
  Info
} from "lucide-react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  AreaChart, 
  Area 
} from "recharts";

// Mock forensic jurisdiction data matching global trends in Indian and international mule flows
const jurisdictionsData = [
  {
    id: "jur-ind",
    country: "India",
    region: "Domestic Core",
    riskScore: 94,
    activeMules: 8420,
    volumeCrores: 42.5,
    volumeLabel: "₹42.5 Crores",
    velocityIndex: 9.2,
    successRate: 91,
    outflowCrypto: 85,
    outflowShell: 15,
    trend: "UP_SPIKE",
    dominantPattern: "UPI smurfing nets",
    coordinates: { x: 78.96, y: 20.59, label: "IN" }, // approximate geographic for abstract map representation
    riskTier: "CRITICAL",
    indicators: [
      { subject: "UPI Velocity", value: 95, fullMark: 100 },
      { subject: "Crypto Outflow", value: 88, fullMark: 100 },
      { subject: "Shell Entities", value: 30, fullMark: 100 },
      { subject: "Rapid Splitting", value: 92, fullMark: 100 },
      { subject: "Proxy IP Use", value: 75, fullMark: 100 }
    ],
    timeline: [
      { month: "Jan", alerts: 1200, volume: 15 },
      { month: "Feb", alerts: 1450, volume: 18 },
      { month: "Mar", alerts: 1900, volume: 24 },
      { month: "Apr", alerts: 2300, volume: 29 },
      { month: "May", alerts: 3100, volume: 36 },
      { month: "Jun", alerts: 4200, volume: 42 }
    ]
  },
  {
    id: "jur-vnm",
    country: "Vietnam",
    region: "South East Asia",
    riskScore: 88,
    activeMules: 5110,
    volumeCrores: 28.2,
    volumeLabel: "₹28.2 Crores",
    velocityIndex: 8.5,
    successRate: 84,
    outflowCrypto: 90,
    outflowShell: 10,
    trend: "UP_MODERATE",
    dominantPattern: "Fake e-com portals",
    coordinates: { x: 108.27, y: 14.05, label: "VN" },
    riskTier: "CRITICAL",
    indicators: [
      { subject: "UPI Velocity", value: 70, fullMark: 100 },
      { subject: "Crypto Outflow", value: 94, fullMark: 100 },
      { subject: "Shell Entities", value: 45, fullMark: 100 },
      { subject: "Rapid Splitting", value: 80, fullMark: 100 },
      { subject: "Proxy IP Use", value: 88, fullMark: 100 }
    ],
    timeline: [
      { month: "Jan", alerts: 800, volume: 10 },
      { month: "Feb", alerts: 920, volume: 12 },
      { month: "Mar", alerts: 1100, volume: 15 },
      { month: "Apr", alerts: 1400, volume: 19 },
      { month: "May", alerts: 1850, volume: 23 },
      { month: "Jun", alerts: 2400, volume: 28 }
    ]
  },
  {
    id: "jur-nga",
    country: "Nigeria",
    region: "West Africa",
    riskScore: 82,
    activeMules: 4680,
    volumeCrores: 24.8,
    volumeLabel: "₹24.8 Crores",
    velocityIndex: 8.1,
    successRate: 79,
    outflowCrypto: 75,
    outflowShell: 25,
    trend: "UP_MODERATE",
    dominantPattern: "Digital bank layering",
    coordinates: { x: 8.67, y: 9.08, label: "NG" },
    riskTier: "WARNING",
    indicators: [
      { subject: "UPI Velocity", value: 55, fullMark: 100 },
      { subject: "Crypto Outflow", value: 80, fullMark: 100 },
      { subject: "Shell Entities", value: 60, fullMark: 100 },
      { subject: "Rapid Splitting", value: 78, fullMark: 100 },
      { subject: "Proxy IP Use", value: 82, fullMark: 100 }
    ],
    timeline: [
      { month: "Jan", alerts: 650, volume: 8 },
      { month: "Feb", alerts: 710, volume: 9 },
      { month: "Mar", alerts: 880, volume: 12 },
      { month: "Apr", alerts: 1050, volume: 16 },
      { month: "May", alerts: 1350, volume: 20 },
      { month: "Jun", alerts: 1780, volume: 24 }
    ]
  },
  {
    id: "jur-gbr",
    country: "United Kingdom",
    region: "Western Europe",
    riskScore: 72,
    activeMules: 2900,
    volumeCrores: 16.5,
    volumeLabel: "₹16.5 Crores",
    velocityIndex: 7.1,
    successRate: 68,
    outflowCrypto: 30,
    outflowShell: 70,
    trend: "STABLE",
    dominantPattern: "Student recruitment rings",
    coordinates: { x: -1.17, y: 54.37, label: "UK" },
    riskTier: "WARNING",
    indicators: [
      { subject: "UPI Velocity", value: 40, fullMark: 100 },
      { subject: "Crypto Outflow", value: 45, fullMark: 100 },
      { subject: "Shell Entities", value: 85, fullMark: 100 },
      { subject: "Rapid Splitting", value: 65, fullMark: 100 },
      { subject: "Proxy IP Use", value: 60, fullMark: 100 }
    ],
    timeline: [
      { month: "Jan", alerts: 500, volume: 11 },
      { month: "Feb", alerts: 520, volume: 11 },
      { month: "Mar", alerts: 580, volume: 13 },
      { month: "Apr", alerts: 610, volume: 14 },
      { month: "May", alerts: 670, volume: 15 },
      { month: "Jun", alerts: 720, volume: 16 }
    ]
  },
  {
    id: "jur-cyp",
    country: "Cyprus",
    region: "Eastern Med",
    riskScore: 64,
    activeMules: 1820,
    volumeCrores: 12.0,
    volumeLabel: "₹12.0 Crores",
    velocityIndex: 6.0,
    successRate: 62,
    outflowCrypto: 40,
    outflowShell: 60,
    trend: "DOWN_MODERATE",
    dominantPattern: "Offshore shell layering",
    coordinates: { x: 33.42, y: 35.12, label: "CY" },
    riskTier: "WARNING",
    indicators: [
      { subject: "UPI Velocity", value: 25, fullMark: 100 },
      { subject: "Crypto Outflow", value: 50, fullMark: 100 },
      { subject: "Shell Entities", value: 95, fullMark: 100 },
      { subject: "Rapid Splitting", value: 50, fullMark: 100 },
      { subject: "Proxy IP Use", value: 52, fullMark: 100 }
    ],
    timeline: [
      { month: "Jan", alerts: 410, volume: 14 },
      { month: "Feb", alerts: 390, volume: 13 },
      { month: "Mar", alerts: 370, volume: 12 },
      { month: "Apr", alerts: 350, volume: 12 },
      { month: "May", alerts: 320, volume: 11 },
      { month: "Jun", alerts: 300, volume: 12 }
    ]
  },
  {
    id: "jur-usa",
    country: "United States",
    region: "North America",
    riskScore: 58,
    activeMules: 2150,
    volumeCrores: 14.2,
    volumeLabel: "₹14.2 Crores",
    velocityIndex: 5.8,
    successRate: 59,
    outflowCrypto: 50,
    outflowShell: 50,
    trend: "STABLE",
    dominantPattern: "Fake payroll channels",
    coordinates: { x: -95.71, y: 37.09, label: "US" },
    riskTier: "MODERATE",
    indicators: [
      { subject: "UPI Velocity", value: 30, fullMark: 100 },
      { subject: "Crypto Outflow", value: 55, fullMark: 100 },
      { subject: "Shell Entities", value: 70, fullMark: 100 },
      { subject: "Rapid Splitting", value: 58, fullMark: 100 },
      { subject: "Proxy IP Use", value: 45, fullMark: 100 }
    ],
    timeline: [
      { month: "Jan", alerts: 380, volume: 12 },
      { month: "Feb", alerts: 390, volume: 12 },
      { month: "Mar", alerts: 410, volume: 13 },
      { month: "Apr", alerts: 430, volume: 14 },
      { month: "May", alerts: 420, volume: 14 },
      { month: "Jun", alerts: 440, volume: 14 }
    ]
  }
];

export default function JurisdictionsView({ onBack }) {
  const [selectedJurId, setSelectedJurId] = useState("jur-ind");
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("ALL");
  const [hoveredBlip, setHoveredBlip] = useState(null);

  // Filter based on tier & search query
  const filteredJurisdictions = jurisdictionsData.filter(jur => {
    const matchesSearch = jur.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          jur.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          jur.dominantPattern.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "ALL" || jur.riskTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const selectedJur = jurisdictionsData.find(j => j.id === selectedJurId) || jurisdictionsData[0];

  // Colors based on risk tier
  const getTierBadgeStyles = (tier) => {
    switch (tier) {
      case "CRITICAL":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400";
      case "WARNING":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      default:
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "UP_SPIKE":
        return <span className="text-rose-500 font-extrabold animate-pulse">▲ CRITICAL SPIKE</span>;
      case "UP_MODERATE":
        return <span className="text-amber-400 font-bold">▲ INCREASING</span>;
      case "DOWN_MODERATE":
        return <span className="text-emerald-400 font-bold">▼ DECREASING</span>;
      default:
        return <span className="text-white/40 font-bold">● STABLE</span>;
    }
  };

  // Recharts Custom Tooltip for dark mode aesthetic
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b0b0d] border border-white/10 px-3.5 py-2.5 rounded-xl text-[10px] font-mono shadow-xl shadow-black">
          <p className="font-bold text-white uppercase tracking-wider mb-1">{label}</p>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-white/60 capitalize">{entry.name}:</span>
              <span className="text-white font-extrabold">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6" id="global-jurisdictions-dashboard">
      
      {/* Upper header controls panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl" id="jur-toolbar">
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search country or pattern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black/40 border border-white/10 hover:border-white/20 focus:border-white/30 text-white rounded-xl text-xs font-mono w-full sm:w-64 placeholder:text-white/30 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 border border-white/10 bg-black/40 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setTierFilter("ALL")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                tierFilter === "ALL" ? "bg-white text-black font-extrabold" : "text-white/50 hover:text-white"
              }`}
            >
              All Regions
            </button>
            <button
              onClick={() => setTierFilter("CRITICAL")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                tierFilter === "CRITICAL" ? "bg-rose-500 text-white font-extrabold" : "text-white/50 hover:text-rose-400"
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setTierFilter("WARNING")}
              className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                tierFilter === "WARNING" ? "bg-amber-500 text-black font-extrabold" : "text-white/50 hover:text-amber-400"
              }`}
            >
              Warning
            </button>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/[0.03] border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Intel</span>
          </button>
          
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white text-black hover:bg-white/90 rounded-xl text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/5 cursor-pointer"
          >
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visualizers Left, Detailed Inspector Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recharts Graphics Stack (Choropleth scatter mapping, volumes, velocity flow) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Abstract High-Risk World Grid / Scatter Plot Map */}
          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-4" id="abstract-world-scatter-map">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[8px] font-mono font-bold text-rose-500 tracking-widest uppercase">SECTION I — GEOPOLITICAL DENSITY PLOT</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-widest">Global Risk Hotspots & Smurfing Velocity Map</h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[8px] text-white/40 uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Critical Velocity Hotspot</span>
              </div>
            </div>

            {/* Scatter graph representing jurisdictions as coordinates of risk vs velocity, bubble size proportional to money volume */}
            <div className="h-64 sm:h-72 w-full relative bg-[#09090b]/50 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
              
              {/* Background Map Grid Graphic Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-50"></div>
              
              <ResponsiveContainer width="100%" height="90%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" />
                  <XAxis 
                    type="number" 
                    dataKey="velocityIndex" 
                    name="Fraud Velocity Index" 
                    domain={[4, 10]}
                    unit="/10"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={9}
                    tickFormatter={(val) => `V:${val}`}
                    label={{ value: "Mule Smurfing Velocity Index", position: "insideBottom", offset: -10, fill: "rgba(255,255,255,0.4)", fontSize: 8, fontFamily: "monospace" }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="riskScore" 
                    name="Risk Score" 
                    domain={[50, 100]}
                    unit="%"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={9}
                    label={{ value: "Risk Index Score (%)", angle: -90, position: "insideLeft", offset: 10, fill: "rgba(255,255,255,0.4)", fontSize: 8, fontFamily: "monospace" }}
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="volumeCrores" 
                    range={[200, 1200]} 
                    name="Volume (₹ Crores)" 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
                  <Scatter 
                    name="Jurisdictions" 
                    data={jurisdictionsData} 
                    fill="#f43f5e" 
                    onClick={(node) => setSelectedJurId(node.id)}
                    className="cursor-pointer"
                  >
                    {jurisdictionsData.map((entry, index) => {
                      const color = entry.riskTier === "CRITICAL" ? "#f43f5e" : entry.riskTier === "WARNING" ? "#fbbf24" : "#22d3ee";
                      return (
                        <circle
                          key={`cell-${index}`}
                          cx={0} cy={0} r={0} // coordinates handled dynamically by recharts Scatter
                          fill={color}
                          stroke="#000"
                          strokeWidth={1.5}
                          fillOpacity={0.8}
                          className="hover:fill-opacity-100 hover:scale-110 transition-all duration-300"
                        />
                      );
                    })}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>

              {/* Geo Info Map labels overlay */}
              <div className="flex justify-between items-center text-[8px] font-mono text-white/30 px-3 uppercase border-t border-white/5 pt-2">
                <span>⚡ Bottom-Left: Moderate/Controlled Traffic</span>
                <span>🔥 Top-Right: Severe Velocity Layering Systems</span>
              </div>
            </div>
          </div>

          {/* 2. Combined Volume & Velocity Bar/Line Composed Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-4" id="compo-vol-vel-chart">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[8px] font-mono font-bold text-amber-400 tracking-widest uppercase">SECTION II — CAPACITY MAPPING</span>
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-widest">Active Accounts vs Volume Comparison</h3>
                </div>
                <Coins className="w-4 h-4 text-amber-400" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filteredJurisdictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.02)" />
                    <XAxis dataKey="country" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                    <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" fontSize={9} label={{ value: "Mule Count", angle: -90, position: "insideLeft", fill: "rgba(255,255,255,0.3)", fontSize: 8 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" fontSize={9} label={{ value: "Vol (₹ Cr)", angle: 90, position: "insideRight", fill: "rgba(255,255,255,0.3)", fontSize: 8 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "8px", fontFamily: "monospace", textTransform: "uppercase" }} />
                    <Bar yAxisId="left" dataKey="activeMules" name="Active Mules" fill="#22d3ee" radius={[4, 4, 0, 0]} opacity={0.8} />
                    <Line yAxisId="right" type="monotone" dataKey="volumeCrores" name="Volume (Crores)" stroke="#f59e0b" strokeWidth={2.5} activeDot={{ r: 8 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3. Radar Chart showing Specific indicators compared with Selected Jurisdiction */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-4" id="radar-indicators-chart">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[8px] font-mono font-bold text-cyan-400 tracking-widest uppercase">SECTION III — FORENSIC SIGNATURE</span>
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-widest">Region Vector Signature Metrics</h3>
                </div>
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={selectedJur.indicators}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.5)" fontSize={8} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" fontSize={7} />
                    <Radar name={selectedJur.country} dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "8px", fontFamily: "monospace" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* 4. Timeline trend Area chart */}
          <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[8px] font-mono font-bold text-rose-500 tracking-widest uppercase">SECTION IV — FORENSIC VELOCITY HORIZON</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-widest">
                  Historical Incident Spikes per Month ({selectedJur.country})
                </h3>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-white/60">
                L6M Tracking Array
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedJur.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="alerts" name="Flagged Events" stroke="#f43f5e" fillOpacity={1} fill="url(#colorAlerts)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Jurisdiction Inspector & Intel Guidelines */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Detailed Inspector Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-xl" id="jurisdiction-inspector">
            
            {/* Header banner */}
            <div className="bg-[#0e0e11] px-5 py-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-widest">
                  Risk Inspector
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-md border text-[8px] font-mono font-bold tracking-widest uppercase ${getTierBadgeStyles(selectedJur.riskTier)}`}>
                {selectedJur.riskTier} TIER
              </span>
            </div>

            <div className="p-5 space-y-5">
              
              {/* Main Flag / Country focus */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h4 className="text-xl font-bold font-sans text-white tracking-tight flex items-center gap-1.5">
                    {selectedJur.country}
                  </h4>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    Region: {selectedJur.region}
                  </p>
                </div>
                
                {/* Risk Gauge Score */}
                <div className="text-right">
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider">Risk Index</div>
                  <div className="text-3xl font-extrabold font-mono text-rose-500 tracking-tighter">
                    {selectedJur.riskScore}%
                  </div>
                </div>
              </div>

              {/* Core metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Active Mule Accounts</span>
                  <div className="text-sm font-bold font-mono text-white">
                    {selectedJur.activeMules.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Mule Volume</span>
                  <div className="text-sm font-bold font-mono text-amber-400">
                    {selectedJur.volumeLabel}
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Flight Success Rate</span>
                  <div className="text-sm font-bold font-mono text-cyan-400">
                    {selectedJur.successRate}%
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Velocity Coefficient</span>
                  <div className="text-sm font-bold font-mono text-purple-400">
                    {selectedJur.velocityIndex}/10
                  </div>
                </div>
              </div>

              {/* Outflow channel breakdown bars */}
              <div className="space-y-3 bg-black/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block">Primary Capital Outflow Vector</span>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-white/70">
                    <span>Crypto Layering / Web3</span>
                    <span>{selectedJur.outflowCrypto}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedJur.outflowCrypto}%` }}></div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[9px] font-mono text-white/77">
                    <span>Offshore Shells & Corporate Layering</span>
                    <span>{selectedJur.outflowShell}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedJur.outflowShell}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Dynamic status trend alerts */}
              <div className="space-y-1">
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block">Regulatory Alert Level</span>
                <div className="flex items-center justify-between text-[10px] font-mono bg-white/[0.01] border border-white/5 p-2.5 rounded-lg">
                  <span className="text-white/80">60-Day Horizon Trend:</span>
                  {getTrendIcon(selectedJur.trend)}
                </div>
              </div>

              {/* Dominant Pattern Analysis */}
              <div className="space-y-1 bg-[#1c0e0f]/30 border border-rose-500/10 p-3 rounded-lg text-[10px]">
                <div className="flex items-center gap-1 text-rose-400 font-mono font-bold uppercase tracking-wider mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Dominant Smurfing Pattern</span>
                </div>
                <p className="font-mono text-white/70 leading-relaxed uppercase">
                  {selectedJur.dominantPattern} detected in high-density concentrations. Outflows routed predominantly to unlicensed crypto exchanges on overseas virtual private servers (VPS).
                </p>
              </div>

            </div>
          </div>

          {/* Quick List Selector table */}
          <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-widest">
              High-Risk Jurisdictions List
            </h4>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredJurisdictions.map((jur) => (
                <button
                  key={jur.id}
                  onClick={() => setSelectedJurId(jur.id)}
                  className={`w-full p-2.5 border rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                    selectedJurId === jur.id
                      ? "bg-white text-black border-white font-bold"
                      : "bg-black/30 border-white/5 text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${selectedJurId === jur.id ? "text-black" : "text-white/30"}`} />
                    <div className="text-left font-mono text-[10px]">
                      <div className="font-bold uppercase tracking-wide">{jur.country}</div>
                      <div className={`text-[7px] ${selectedJurId === jur.id ? "text-black/60" : "text-white/30"}`}>{jur.region}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-extrabold">{jur.riskScore}%</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
