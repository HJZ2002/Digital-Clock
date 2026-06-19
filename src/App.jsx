import { useEffect, useState } from "react";

const cities = [
  { code: "US", name: "New York",   tz: "America/New_York" },
  { code: "GB", name: "London",     tz: "Europe/London" },
  { code: "FR", name: "Paris",      tz: "Europe/Paris" },
  { code: "AE", name: "Dubai",      tz: "Asia/Dubai" },
  { code: "JP", name: "Tokyo",      tz: "Asia/Tokyo" },
  { code: "AU", name: "Sydney",     tz: "Australia/Sydney" },
  { code: "SG", name: "Singapore",  tz: "Asia/Singapore" },
  { code: "PH", name: "Manila",     tz: "Asia/Manila" },
  { code: "BR", name: "São Paulo",  tz: "America/Sao_Paulo" },
];

function getEvent(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const holidays = [
    { m: 1,  d: 1,  t: "🎉 New Year's Day" },
    { m: 2,  d: 14, t: "💝 Valentine's Day" },
    { m: 3,  d: 17, t: "🍀 St. Patrick's Day" },
    { m: 4,  d: 22, t: "🌍 Earth Day" },
    { m: 6,  d: 19, t: "✊ Juneteenth" },
    { m: 10, d: 31, t: "🎃 Halloween" },
    { m: 12, d: 25, t: "🎄 Christmas Day" },
    { m: 12, d: 31, t: "🥂 New Year's Eve" },
  ];
  const hit = holidays.find((e) => e.m === m && e.d === d);
  if (hit) return hit.t;
  if (h >= 5  && h < 12) return "🌅 Good Morning";
  if (h >= 12 && h < 17) return "☀️ Good Afternoon";
  if (h >= 17 && h < 21) return "🌆 Good Evening";
  return "🌙 Good Night";
}

function getUTCOffset(tz) {
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(new Date());
  const tzPart = parts.find((p) => p.type === "timeZoneName");
  return tzPart ? tzPart.value.replace("GMT", "UTC") : "UTC±0";
}

function isDaytime(tz) {
  const h = parseInt(
    new Intl.DateTimeFormat("en", {
      hour: "numeric",
      hour12: false,
      timeZone: tz,
    }).format(new Date())
  );
  return h >= 6 && h < 20;
}

// City Card Component
function CityCard({ city, now }) {
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: city.tz,
  });
  const day = isDaytime(city.tz);
  const offset = getUTCOffset(city.tz);

  return (
    <div className="group p-3 rounded-[14px] bg-[rgba(15,10,28,0.68)] border border-white/[0.08] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_32px_rgba(168,85,247,0.35)] hover:border-purple-500/35">
      {/* Top row: country code + day/night dot */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[0.60rem] font-semibold tracking-[0.18em] text-purple-200/55">
          {city.code}
        </span>
        <span
          className="w-[7px] h-[7px] rounded-full flex-shrink-0"
          style={{ background: day ? "#fbbf24" : "#818cf8" }}
          title={day ? "Daytime" : "Nighttime"}
        />
      </div>

      {/* City name */}
      <div className="text-[0.62rem] tracking-[0.16em] uppercase text-purple-200/42 mb-1.5">
        {city.name}
      </div>

      {/* Time */}
      <div
        className="font-mono text-[clamp(0.85rem,2.5vw,1.05rem)] tracking-[0.10em] bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent whitespace-nowrap"
        style={{ filter: "drop-shadow(0 0 6px rgba(192,132,252,0.45))" }}
      >
        {time}
      </div>

      {/* UTC offset */}
      <div className="mt-1 text-[0.54rem] tracking-[0.14em] text-cyan-300/42">
        {offset}
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const mainTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const mainDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080810] overflow-x-hidden py-10 px-4 gap-6">
      {/* Ambient Blobs */}
      <div className="fixed -top-28 -left-28 w-[500px] h-[500px] bg-violet-800 rounded-full blur-[130px] opacity-55 pointer-events-none z-0" />
      <div className="fixed -bottom-28 -right-28 w-[440px] h-[440px] bg-cyan-700  rounded-full blur-[130px] opacity-55 pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-fuchsia-900 rounded-full blur-[130px] opacity-18 pointer-events-none z-0" />

      {/* ── Main Clock Card ── */}
      <div className="relative z-10 w-full max-w-[620px] px-12 py-7 rounded-[22px] bg-[rgba(15,10,28,0.78)] border border-white/10 backdrop-blur-2xl shadow-[0_0_90px_rgba(168,85,247,0.42)] text-center">
        {/* Glow border overlay */}
        <div className="absolute inset-[-1px] rounded-[22px] bg-gradient-to-br from-purple-500/30 via-fuchsia-500/12 to-cyan-500/20 -z-10 pointer-events-none" />

        <p className="text-[0.58rem] tracking-[0.32em] uppercase text-purple-200/40 mb-2">
          Your Local Time
        </p>

        <h1
          className="font-mono text-[clamp(2.8rem,8vw,4.2rem)] tracking-[0.22em] bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent leading-none"
          style={{ filter: "drop-shadow(0 0 22px rgba(192,132,252,0.65))" }}
        >
          {mainTime}
        </h1>

        <p className="mt-3 text-[0.74rem] tracking-[0.14em] text-purple-200/52">
          {mainDate}
        </p>

        <p className="mt-1.5 text-[0.66rem] tracking-[0.20em] uppercase text-cyan-300/60">
          {getEvent(now)}
        </p>

        <p className="mt-3 text-[0.56rem] tracking-[0.30em] uppercase text-purple-200/28">
          Codiarc Digital Clock
        </p>
      </div>

      {/* ── World Clocks Grid ── */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 w-full max-w-[620px]">
        {cities.map((city) => (
          <CityCard key={city.tz} city={city} now={now} />
        ))}
      </div>
    </div>
  );
}