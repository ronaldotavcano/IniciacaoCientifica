import octocatSrc from "../assets/images/octacat.png"

export default function NotFound() {

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#c1732a] font-['Rye',serif]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rye&display=swap');

        @keyframes roll {
          from { left: -60px; transform: rotate(0deg); }
          to   { left: 110%; transform: rotate(1080deg); }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(-50%) rotate(-1.5deg); }
          50%       { transform: translateX(-50%) rotate(1.5deg); }
        }
        @keyframes dust {
          0%   { opacity: 0.6; transform: scale(1) translateY(0); }
          100% { opacity: 0;   transform: scale(3) translateY(-30px); }
        }
        @keyframes twinkle {
          from { opacity: 0.2; }
          to   { opacity: 0.9; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.85; }
        }

        .tumbleweed {
          animation: roll 6s linear infinite;
        }
        .tumbleweed-slow {
          animation: roll 9s linear infinite;
          animation-delay: -3s;
        }
        .octocat-sway {
          animation: sway 3.5s ease-in-out infinite;
        }
        .dust { animation: dust 3.5s ease-out infinite; }
        .twinkle { animation: twinkle 2s ease-in-out infinite alternate; }
        .board-flicker { animation: flicker 4s ease-in-out infinite; }
      `}</style>

      <div
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{ background: "linear-gradient(180deg,#e8622a 0%,#f59d4e 55%,#f7c27e 100%)" }}
      />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#ffd166]"
        style={{ boxShadow: "0 0 0 14px #ffb74d44, 0 0 0 28px #ff980018" }} />

      {[
        { top: "8%",  left: "18%", delay: "0s",   size: "w-1 h-1" },
        { top: "12%", left: "72%", delay: "0.8s",  size: "w-1.5 h-1.5" },
        { top: "6%",  left: "55%", delay: "1.4s",  size: "w-1 h-1" },
        { top: "18%", left: "38%", delay: "0.4s",  size: "w-1 h-1" },
      ].map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.size} rounded-full bg-[#ffd16699] twinkle`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

        <div className="absolute bottom-[44%] -left-4">
          <svg width="340" height="200" viewBox="0 0 230 130">
            <polygon points="0,130 115,12 230,130" fill="#a85a1a" />
            <polygon points="35,130 115,22 190,130" fill="#b8662a" />
          </svg>
        </div>
      
        <div className="absolute bottom-[44%] -right-2">
          <svg width="280" height="170" viewBox="0 0 190 110">
            <polygon points="0,110 95,8 190,110" fill="#9a5218" />
            <polygon points="22,110 95,16 160,110" fill="#ae6023" />
          </svg>
        </div>
      
        <div className="absolute bottom-[44%] left-[22%]">
          <svg width="220" height="130" viewBox="0 0 150 85">
            <polygon points="0,85 75,5 150,85" fill="#b06020" />
          </svg>
        </div>

      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[#c1732a]">
        <div className="absolute inset-x-0 top-0 h-4 bg-[#a85a1a]" style={{ borderRadius: "50% 50% 0 0 / 8px 8px 0 0" }} />
      </div>

      <div className="absolute inset-x-0 bottom-[48%] h-1.25"
        style={{ background: "repeating-linear-gradient(90deg, #7a4a10 0px, #7a4a10 20px, transparent 20px, transparent 34px)" }} />

      <div className="absolute left-12 bottom-[calc(48%-2px)]">
        <svg width="38" height="84" viewBox="0 0 38 84">
          <rect x="14" y="10" width="9" height="74" rx="4.5" fill="#4e7e25" />
          <rect x="0"  y="28" width="23" height="8"  rx="4"   fill="#4e7e25" />
          <rect x="0"  y="14" width="9"  height="22" rx="4.5" fill="#4e7e25" />
          <rect x="14" y="50" width="24" height="8"  rx="4"   fill="#4e7e25" />
          <rect x="29" y="36" width="9"  height="22" rx="4.5" fill="#4e7e25" />
        </svg>
      </div>
      <div className="absolute right-16 bottom-[calc(48%-2px)]">
        <svg width="30" height="64" viewBox="0 0 30 64">
          <rect x="10" y="8"  width="8"  height="56" rx="4"   fill="#4e7e25" />
          <rect x="0"  y="22" width="18" height="7"  rx="3.5" fill="#4e7e25" />
          <rect x="0"  y="12" width="8"  height="16" rx="4"   fill="#4e7e25" />
          <rect x="10" y="38" width="18" height="7"  rx="3.5" fill="#4e7e25" />
          <rect x="22" y="28" width="8"  height="16" rx="4"   fill="#4e7e25" />
        </svg>
      </div>

      <div
        className="tumbleweed absolute bottom-[calc(48%+4px)] w-8 h-8 rounded-full border-[3px] border-[#8b5e2a]"
        style={{ borderTopColor: "#c4863d" }}
      >
        <div className="absolute inset-[15%] rounded-full border-2 border-[#a06e30] border-b-transparent" />
      </div>
      <div
        className="tumbleweed-slow absolute bottom-[calc(48%+8px)] w-5 h-5 rounded-full border-2 border-[#8b5e2a]"
        style={{ borderTopColor: "#c4863d" }}
      />

      <div
        className="absolute top-6 left-8 w-28 bg-[#f5deb3] border-2 border-[#8b5e2a] rounded-sm p-2 z-10"
        style={{ transform: "rotate(-4deg)", boxShadow: "2px 2px 0 #3a220a" }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.25 h-3 bg-[#5a3a10]" />

        <p className="text-[9px] text-[#3a1a00] text-center tracking-widest">✦ PROCURADO ✦</p>
        <p className="text-[13px] text-[#8b0000] text-center leading-tight my-1 font-bold">
          VIVO OU<br />MORTO
        </p>

        <div className="w-16 h-16 mx-auto border border-[#8b5e2a] bg-[#ffe0b2] overflow-hidden">
          <img
            src={octocatSrc}
            alt="Octocat"
            className="w-full h-full object-cover object-top"
            style={{ filter: "sepia(0.5) contrast(0.9)" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <p className="text-[8px] text-[#3a1a00] text-center mt-1">RECOMPENSA</p>
        <p className="text-[12px] text-[#8b0000] text-center font-bold">$404.00</p>
        <p className="text-[7px] text-[#3a1a00] text-center mt-1 leading-snug">
          O BANDIDO DA<br />PÁGINA PERDIDA
        </p>
      </div>

      <div
        className="absolute top-6 right-8 bg-[#6b3e12] border-[3px] border-[#3a1a00] rounded px-4 py-3 z-10 board-flicker"
        style={{ transform: "rotate(3deg)", boxShadow: "3px 3px 0 #1a0800" }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-[#3a1a00]" />

        <p className="text-[9px] text-[#ffe0b2] text-center tracking-widest">⚠ AVISO DO SHERRIFF ⚠</p>
        <p
          className="text-5xl text-[#ff6b35] text-center leading-none my-1"
          style={{ textShadow: "3px 3px 0 #3a0a00" }}
        >
          404
        </p>
        <p className="text-[9px] text-[#ffe0b2cc] text-center leading-snug">
          ESSA PÁGINA FOI EMBORA<br />PARA O POR DO SOL
        </p>
      </div>

      {[
        { left: "20%", bottom: "52%", size: "w-2 h-2",     delay: "0s",   dur: "3s" },
        { left: "75%", bottom: "50%", size: "w-1.5 h-1.5", delay: "1.2s", dur: "4s" },
        { left: "46%", bottom: "51%", size: "w-2 h-2",     delay: "2.1s", dur: "3.5s" },
      ].map((d, i) => (
        <div
          key={i}
          className={`dust absolute ${d.size} rounded-full bg-[#c1732a88]`}
          style={{ left: d.left, bottom: d.bottom, animationDelay: d.delay, animationDuration: d.dur }}
        />
      ))}

      <div
        className="octocat-sway absolute z-10"
        style={{ bottom: "calc(48% - 90px)", left: "50%", transformOrigin: "50% 100%" }}
      >
        <img
          src={octocatSrc}
          alt="Octocat cowboy"
          className="h-44 w-auto drop-shadow-2xl"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
          }}
        />
      </div>

      <div className="absolute bottom-[14%] inset-x-0 flex flex-col items-center gap-3 z-10 px-4">
        <h1
          className="text-[#ffd166] text-2xl md:text-3xl text-center tracking-widest"
          style={{ textShadow: "2px 2px 0 #3a1a00, -1px -1px 0 #3a1a00" }}
        >
          Aio Silver! PÁGINA NÃO ENCONTRADA!
        </h1>
        <p
          className="text-[#ffe0b2cc] text-sm text-center tracking-widest"
          style={{ textShadow: "1px 1px 0 #3a1a00" }}
        >
          Parceiro, essa trilha leva a lugar nenhum...
        </p>

        <a
          href="/"
          className="mt-1 inline-block text-[#3a1a00] bg-[#ffd166] border-2 border-[#8b5e2a] rounded-sm px-6 py-2 text-sm tracking-widest transition-transform active:scale-95 hover:-translate-y-0.5"
          style={{ boxShadow: "2px 2px 0 #3a1a00" }}
        >
          ☆ VOLTE PARA A CIDADE ☆
        </a>
      </div>

    </div>
  );
}