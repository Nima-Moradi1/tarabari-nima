import styles from "./FreightJourney.module.css";

const asset = (name: string) => `/scene/${name}.webp`;

export function FreightArt() {
  return (
    <svg className={styles.art} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="warehouse-light" x2="0" y2="1">
          <stop stopColor="#142034" />
          <stop offset=".65" stopColor="#34475c" />
          <stop offset="1" stopColor="#1b2634" />
        </linearGradient>
        <linearGradient id="yard" x2="0" y2="1">
          <stop stopColor="#5d7180" />
          <stop offset="1" stopColor="#2c3c4b" />
        </linearGradient>
        <linearGradient id="water" x2="0" y2="1">
          <stop stopColor="#14334b" />
          <stop offset="1" stopColor="#082139" />
        </linearGradient>
        <linearGradient id="sky" x2="0" y2="1">
          <stop stopColor="#0d3153" />
          <stop offset="1" stopColor="#8aaec3" />
        </linearGradient>
        <pattern id="concrete" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M0 0H120V120H0Z" fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="2" />
          <circle cx="39" cy="48" r="1" fill="#fff" opacity=".15" />
          <circle cx="92" cy="80" r="1" fill="#101d2d" opacity=".4" />
        </pattern>
        <pattern id="road-grain" width="42" height="42" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="13" r="1" fill="#a6adb0" opacity=".18" />
          <circle cx="32" cy="31" r=".8" fill="#a6adb0" opacity=".16" />
        </pattern>
        <filter id="ground-shadow" x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="cloud-soft" x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <clipPath id="gantry-shell"><path d="M0 0H1200V312H0ZM0 312H190V700H0ZM1040 312H1200V700H1040Z" /></clipPath>
      </defs>

      <g data-j="warehouse" className={styles.scene}>
        <rect width="1200" height="700" fill="url(#warehouse-light)" />
        <path d="M0 75H1200M0 285H1200M0 466H1200" stroke="#9eafba" strokeOpacity=".24" strokeWidth="8" />
        {[80, 320, 560, 800, 1040].map(x => <g key={x}>
          <path d={`M${x} 72V478`} stroke="#91a4b2" strokeOpacity=".6" strokeWidth="12" />
          <path d={`M${x - 24} 270H${x + 175}`} stroke="#1a3247" strokeWidth="16" />
        </g>)}
        <path d="M0 477H1200V700H0Z" fill="#2a3845" />
        <path d="M0 477H1200V700H0Z" fill="url(#concrete)" />
        <path d="M0 485H1200" stroke="#a7bbc6" strokeOpacity=".5" strokeWidth="7" />
        <path d="M0 635H1200" stroke="#d8b373" strokeOpacity=".35" strokeWidth="3" strokeDasharray="55 34" />
        <path d="M130 136H265M610 136H745M970 136H1105" stroke="#dceaf3" strokeWidth="12" strokeLinecap="round" opacity=".74" />
        <rect x="40" y="377" width="210" height="100" fill="#233b51" stroke="#6c8493" strokeWidth="3" />
        <rect x="72" y="354" width="170" height="123" fill="#314b5f" stroke="#8aa5b2" strokeWidth="2" />
        <path d="M80 385H230M80 420H230M80 455H230" stroke="#8fa6b2" opacity=".7" />
        <text x="65" y="115" fill="#dce9ee" fontFamily="Arial" fontSize="16" letterSpacing="4">WAREHOUSE / 01</text>
      </g>

      <g data-j="road" className={styles.scene}>
        <rect width="1200" height="700" fill="#657987" />
        <rect width="1200" height="700" fill="url(#concrete)" />
        <path d="M0 555H280C448 555 570 450 570 280V-70" fill="none" stroke="#1d2831" strokeWidth="322" />
        <path d="M0 555H280C448 555 570 450 570 280V-70" fill="none" stroke="#becbc9" strokeOpacity=".55" strokeWidth="309" />
        <path d="M0 555H280C448 555 570 450 570 280V-70" fill="none" stroke="#363f45" strokeWidth="300" />
        <path d="M0 555H280C448 555 570 450 570 280V-70" fill="none" stroke="url(#road-grain)" strokeWidth="296" />
        <path d="M0 555H280C448 555 570 450 570 280V-70" fill="none" stroke="#ccd5d6" strokeOpacity=".8" strokeWidth="2" strokeDasharray="28 22" />
        <path id="journey-road-path" d="M0 555H280C448 555 570 450 570 280V-70" fill="none" stroke="none" />
        <path d="M50 130H250M910 540H1120" stroke="#d5dee0" strokeOpacity=".33" strokeWidth="2" />
        <text x="930" y="125" fill="#e5eef0" fontFamily="Arial" fontSize="18" letterSpacing="4">ROAD / 02</text>
      </g>

      <g data-j="port" className={styles.scene}>
        <rect width="1200" height="700" fill="url(#yard)" />
        <rect width="1200" height="700" fill="url(#concrete)" />
        <path d="M600 290H1200V615H600Z" fill="url(#water)" />
        <path d="M600 290V615" stroke="#d2dad8" strokeWidth="10" />
        <path d="M620 340H1180M620 430H1180M620 520H1180" stroke="#a4ccda" strokeOpacity=".25" strokeWidth="3" strokeDasharray="60 80" />
        <path d="M0 618H1200V700H0Z" fill="#173c53" />
        <path d="M0 614H1200" stroke="#d2dad8" strokeWidth="12" />
        <path d="M720 370V615M1080 370V615" stroke="#dbe5e8" strokeOpacity=".45" strokeWidth="3" strokeDasharray="14 12" />
        <path d="M38 560H1162M38 180H1162" stroke="#cad4d3" strokeOpacity=".24" strokeWidth="3" />
        <path d="M140 165V545M1060 165V545" stroke="#c7d0cf" strokeOpacity=".24" strokeWidth="3" strokeDasharray="18 15" />
        <g opacity=".6"><rect x="54" y="366" width="135" height="146" fill="#496071" stroke="#c0cad0" />
          <rect x="191" y="366" width="135" height="146" fill="#7a8e9a" stroke="#c0cad0" />
          <rect x="958" y="368" width="142" height="144" fill="#4d6478" stroke="#c0cad0" /></g>
        <image data-j="gantry" href={asset("gantry")} x="-125" y="52" width="1230" height="560" preserveAspectRatio="xMidYMin meet" clipPath="url(#gantry-shell)" />
        <text x="88" y="132" fill="#edf1ee" fontFamily="Arial" fontSize="18" letterSpacing="4">PORT / 03</text>
      </g>

      <g data-j="ocean" className={styles.scene}>
        <rect width="1200" height="700" fill="url(#water)" />
        <g fill="none" stroke="#a4ccda" opacity=".26">
          {[140, 220, 300, 380, 460, 540, 620].map(y => <path key={y} d={`M-100 ${y}q110 -25 220 0t220 0t220 0t220 0t220 0t220 0`} strokeWidth="3" />)}
        </g>
        <text x="90" y="132" fill="#d0e6ed" fontFamily="Arial" fontSize="18" letterSpacing="4">OCEAN / 04</text>
      </g>

      <g data-j="air" className={styles.scene}>
        <rect width="1200" height="700" fill="url(#sky)" />
        <g data-j="transfer" className={styles.scene}>
          <rect width="1200" height="700" fill="#647b88" />
          <rect width="1200" height="700" fill="url(#concrete)" />
          <path d="M150 240H1080M150 450H1080" stroke="#dbe4e5" strokeOpacity=".28" strokeWidth="4" strokeDasharray="55 35" />
          <path d="M1050 380Q835 300 665 320" stroke="#e5bd64" strokeOpacity=".8" strokeWidth="4" strokeDasharray="16 14" fill="none" />
          <path d="M0 580H1200V700H0Z" fill="#334b59" />
          <path d="M0 596H1200M0 686H1200" stroke="#c7d6d9" strokeWidth="4" />
          <path d="M40 640H1160" stroke="#e0e6e5" strokeWidth="4" strokeDasharray="48 38" />
          <path d="M210 300V580M950 300V580" stroke="#e6edf0" strokeOpacity=".22" strokeWidth="3" strokeDasharray="12 16" />
        </g>
        <path data-j="flightPath" d="M-60 625Q420 480 1240 105" stroke="#b6dcf3" strokeWidth="3" strokeDasharray="18 18" opacity=".6" fill="none" />
        <g data-j="cloudBack" fill="#e6f3f6" opacity=".55" filter="url(#cloud-soft)">
          <ellipse cx="220" cy="200" rx="210" ry="60" />
          <ellipse cx="985" cy="175" rx="230" ry="65" />
        </g>
        <g data-j="airCargo" className={styles.cargo}>
          <ellipse cy="10" rx="62" ry="32" fill="#071521" opacity=".28" filter="url(#ground-shadow)" />
          <rect x="-61" y="-31" width="122" height="62" rx="4" fill="#304a5c" stroke="#9fb4bd" strokeWidth="2" />
          <image href="/scene/container-top.png" x="-20" y="-55" width="40" height="110" transform="rotate(90)" />
          <circle cx="-45" cy="-32" r="6" fill="#101d28" /><circle cx="45" cy="-32" r="6" fill="#101d28" />
          <circle cx="-45" cy="32" r="6" fill="#101d28" /><circle cx="45" cy="32" r="6" fill="#101d28" />
        </g>
        <g data-j="plane" className={styles.vehicle}>
          <image href={asset("plane-top")} x="-215" y="-315" width="430" height="645" />
          <g data-j="hatch" fill="none" stroke="#1f5a7e" strokeWidth="3" opacity=".8"><path d="M18 -120h21v35H18" /><path d="M30 -115v25" strokeDasharray="4 4" /></g>
        </g>
        <g data-j="cloudFront" fill="#f4fbfb" opacity=".75" filter="url(#cloud-soft)">
          <ellipse cx="30" cy="600" rx="250" ry="80" />
          <ellipse cx="1150" cy="520" rx="260" ry="70" />
        </g>
      </g>

      <g data-j="ship" className={styles.vehicle}>
        <g data-j="shipBody">
          <g data-j="shipWake" className={styles.vehicle} fill="none" stroke="#b6dbe4" strokeWidth="5" opacity=".38">
            <path d="M-390 -105Q-525 -80 -650 -125M-390 105Q-525 80 -650 125" />
          </g>
          <ellipse rx="405" ry="105" fill="#d7f1f2" opacity=".12" filter="url(#ground-shadow)" />
          <image href={asset("ship-top")} x="-425" y="-170" width="850" height="340" />
          <g data-j="deckCargo" className={styles.cargo}>
            <image href="/scene/container-top.png" x="-20" y="-70" width="40" height="140" transform="rotate(90)" />
            <rect x="-24" y="-14" width="48" height="28" fill="none" stroke="#28589e" strokeWidth="2" />
          </g>
        </g>
      </g>

      <g data-j="roadTruck" className={styles.vehicle}>
        <ellipse cx="0" cy="16" rx="74" ry="117" fill="#071521" opacity=".36" filter="url(#ground-shadow)" />
        <image href={asset("truck-top")} x="-90" y="-135" width="180" height="270" />
      </g>
      <g data-j="truck" className={styles.vehicle}>
        <ellipse cx="0" cy="71" rx="300" ry="30" fill="#06101a" opacity=".35" filter="url(#ground-shadow)" />
        <image href={asset("truck-empty")} x="-320" y="-110" width="640" height="214" />
      </g>
      <g data-j="cargo" className={styles.cargo}>
        <image href={asset("container")} x="-145" y="-65" width="290" height="145" />
        <image href="/brand/nima-monogram.svg" x="-33" y="-20" width="66" height="66" opacity=".8" />
      </g>
      <g data-j="craneRig" className={styles.vehicle}>
        <rect x="-48" y="135" width="96" height="31" rx="4" fill="#233945" stroke="#c4d0d4" strokeWidth="3" />
        <line data-j="craneCable" x1="-26" y1="165" x2="-26" y2="405" stroke="#101f2a" strokeWidth="3" />
        <line data-j="craneCable" x1="26" y1="165" x2="26" y2="405" stroke="#101f2a" strokeWidth="3" />
        <g data-j="spreader">
          <path d="M-151 0H151L137 19H-137Z" fill="#e8ad25" stroke="#172936" strokeWidth="4" />
          <path d="M-140 19v19m280-19v19" stroke="#162a35" strokeWidth="5" />
          <path d="M-128 2l28 17m45-17l28 17m45-17l28 17m45-17l28 17" stroke="#182b36" strokeWidth="7" />
        </g>
      </g>
      <g data-j="forklift" className={styles.vehicle}>
        <image href={asset("reach-stacker")} x="-370" y="-270" width="570" height="380" />
      </g>
    </svg>
  );
}
