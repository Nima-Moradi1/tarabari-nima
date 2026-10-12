import styles from "./FreightJourney.module.css";

const asset = (name: string) => `/scene/${name}.webp`;
const mobileRoadPath = "M690 555C710 540 680 470 640 430C610 395 600 340 600 230V-70";
const mobileRoadSurfacePath = "M-200 555H690C710 540 680 470 640 430C610 395 600 340 600 230V-70";

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
        <linearGradient id="sea-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e4f8f3" stopOpacity=".34" />
          <stop offset=".42" stopColor="#6cb5c5" stopOpacity=".08" />
          <stop offset="1" stopColor="#83c4ca" stopOpacity=".18" />
        </linearGradient>
        <radialGradient id="sea-sunlight" cx=".18" cy=".04" r=".9">
          <stop stopColor="#f5ffed" stopOpacity=".29" />
          <stop offset=".45" stopColor="#a8dacc" stopOpacity=".06" />
          <stop offset="1" stopColor="#a8dacc" stopOpacity="0" />
        </radialGradient>
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
        <path id="stacker-boom-outline" d="M-370 -270H200V-44H126L92 -22L65 -42L32 -65L-40 -74L-120 -92L-210 -82H-370Z" />
        <mask id="stacker-chassis-mask" maskUnits="userSpaceOnUse" x="-370" y="-270" width="570" height="380">
          <rect x="-370" y="-270" width="570" height="380" fill="white" />
          <use href="#stacker-boom-outline" fill="black" />
        </mask>
        <mask id="stacker-boom-mask" maskUnits="userSpaceOnUse" x="-370" y="-270" width="570" height="380">
          <use href="#stacker-boom-outline" fill="white" />
          <rect x="-370" y="-174" width="229" height="87" fill="black" />
        </mask>
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
        <g className={styles.roadDesktop}>
        <path d="M850 555H950C1040 555 1040 455 925 425C760 380 650 380 650 230V-70" fill="none" stroke="#1d2831" strokeWidth="322" />
        <path d="M850 555H950C1040 555 1040 455 925 425C760 380 650 380 650 230V-70" fill="none" stroke="#becbc9" strokeOpacity=".55" strokeWidth="309" />
        <path d="M850 555H950C1040 555 1040 455 925 425C760 380 650 380 650 230V-70" fill="none" stroke="#363f45" strokeWidth="300" />
        <path d="M850 555H950C1040 555 1040 455 925 425C760 380 650 380 650 230V-70" fill="none" stroke="url(#road-grain)" strokeWidth="296" />
        <path d="M850 555H950C1040 555 1040 455 925 425C760 380 650 380 650 230V-70" fill="none" stroke="#ccd5d6" strokeOpacity=".8" strokeWidth="2" strokeDasharray="28 22" />
        <path id="journey-road-path-desktop" d="M850 555H950C1040 555 1040 455 925 425C760 380 650 380 650 230V-70" fill="none" stroke="none" />
        </g>
        <g className={styles.roadMobile}>
          <path d={mobileRoadSurfacePath} fill="none" stroke="#1d2831" strokeWidth="322" />
          <path d={mobileRoadSurfacePath} fill="none" stroke="#becbc9" strokeOpacity=".55" strokeWidth="309" />
          <path d={mobileRoadSurfacePath} fill="none" stroke="#363f45" strokeWidth="300" />
          <path d={mobileRoadSurfacePath} fill="none" stroke="url(#road-grain)" strokeWidth="296" />
          <path d={mobileRoadSurfacePath} fill="none" stroke="#ccd5d6" strokeOpacity=".8" strokeWidth="2" strokeDasharray="28 22" />
          <path id="journey-road-path-mobile" d={mobileRoadPath} fill="none" stroke="none" />
        </g>
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
        <rect width="1200" height="700" fill="#08263d" />
        <g data-j="waterSwell">
          <image data-j="waterSurface" href={asset("ocean-water-v2")} x="-110" y="-65" width="1420" height="830" preserveAspectRatio="xMidYMid slice" />
        </g>
        <g data-j="waterShimmer">
          <image data-j="waterRipples" href={asset("ocean-water-v2")} x="-160" y="-95" width="1520" height="890" preserveAspectRatio="xMidYMid slice" opacity=".19" style={{ mixBlendMode: "screen" }} />
        </g>
        <rect width="1200" height="700" fill="url(#sea-sheen)" opacity=".8" />
        <rect width="1200" height="700" fill="url(#sea-sunlight)" />
        <g data-j="waterGlintMotion">
          <g data-j="waterGlint" fill="none" stroke="#e7fff2" strokeLinecap="round" opacity=".38">
            <path d="M-80 155q73 -21 145 -6m420 181q55 -17 116 -7m478 -176q65 -22 142 -11M-30 570q50 -13 108 -4m787 43q62 -19 139 -11" strokeWidth="2" />
            <path d="M110 280q35 -10 73 -6m632 -45q27 -11 65 -8M310 620q57 -16 112 -7m612 -262q51 -14 93 -5" strokeWidth="1.5" />
          </g>
        </g>
        <text x="90" y="132" fill="#d0e6ed" fontFamily="Arial" fontSize="18" letterSpacing="4">OCEAN / 04</text>
      </g>

      <g data-j="air" className={styles.scene}>
        <image data-j="approachField" href={asset("airfield-runway-v2")} width="1200" height="700" preserveAspectRatio="xMidYMid slice" />
        <path data-j="flightPath" d="M650 390Q690 105 980 -80" stroke="#f6fcff" strokeWidth="3" strokeDasharray="18 18" opacity=".5" fill="none" />
        <g data-j="cloudBack" fill="#f5fcff" opacity=".26" filter="url(#cloud-soft)">
          <ellipse cx="110" cy="245" rx="175" ry="84" />
          <ellipse cx="1090" cy="185" rx="185" ry="72" />
        </g>
        <ellipse data-j="planeShadow" cx="0" cy="0" rx="230" ry="25" fill="#152a38" opacity=".5" filter="url(#ground-shadow)" />
        <g data-j="airCargo" className={styles.cargo}>
          <ellipse cy="71" rx="104" ry="13" fill="#071521" opacity=".3" filter="url(#ground-shadow)" />
          <path d="M-150 -33h48l90 35H94v16h-244Z" fill="#526e7a" stroke="#b7cbd2" strokeWidth="3" />
          <path d="M-139 -25h34l90 35H67" stroke="#c6d1ce" strokeWidth="3" strokeDasharray="17 7" fill="none" />
          <path d="M-120 18v40m100-40v40M65-19v77" stroke="#294351" strokeWidth="8" />
          <circle cx="-119" cy="59" r="11" fill="#172d39" stroke="#b0c3c6" strokeWidth="3" /><circle cx="-18" cy="59" r="11" fill="#172d39" stroke="#b0c3c6" strokeWidth="3" /><circle cx="64" cy="59" r="11" fill="#172d39" stroke="#b0c3c6" strokeWidth="3" />
          <path d="M64-28h50q10 0 10 10v35H63Z" fill="#496876" stroke="#b4c5c9" strokeWidth="3" />
          <path d="M77-20h30v20H77Z" fill="#a8bdc4" opacity=".45" />
        </g>
        <g data-j="plane" className={styles.vehicle}>
          <image href={asset("plane-landing-v2")} x="-430" y="-260" width="860" height="516" />
          <g data-j="hatch" opacity=".85">
            <path d="M279 -39h22v28h-22Z" fill="#203746" stroke="#bed0d2" strokeWidth="2" />
            <path data-j="hatchDoor" d="M280 -38h20v26h-20Z" fill="#e3e9e9" stroke="#748b98" strokeWidth="2" />
          </g>
        </g>
        <g data-j="planeDeparture" className={styles.vehicle}>
          <image href={asset("plane-takeoff-turn-v1")} x="-430" y="-260" width="860" height="516" />
        </g>
        <g data-j="airPayload" className={styles.cargo}>
          <rect x="-26" y="-20" width="52" height="40" rx="2" fill="#e6e8e5" stroke="#7c919b" strokeWidth="3" />
          <path d="M-18 -17v34m12-34v34m12-34v34m12-34v34" stroke="#afbdc4" strokeWidth="2" />
          <rect x="-14" y="-12" width="28" height="24" rx="2" fill="#1b478c" />
        </g>
        <g data-j="cloudFront" fill="#f4fbfb" opacity=".45" filter="url(#cloud-soft)">
          <path d="M-180 550Q-5 425 176 550T490 590Q250 760 -180 720Z" />
          <path d="M890 650Q1045 440 1240 525L1370 790H875Z" />
        </g>
      </g>

      <g data-j="ship" className={styles.vehicle}>
        <g data-j="shipBody">
          <g data-j="shipWake" className={styles.vehicle} transform="translate(-620 0) rotate(90)">
            <image href={asset("ship-wake-v2")} x="-200" y="-300" width="400" height="600" opacity=".65" />
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
      <g data-j="forklift" className={styles.vehicle}>
        <image href={asset("reach-stacker")} x="-370" y="-270" width="570" height="380" mask="url(#stacker-chassis-mask)" />
        <g data-j="boom">
          <image href={asset("reach-stacker")} x="-370" y="-270" width="570" height="380" mask="url(#stacker-boom-mask)" />
        </g>
      </g>
      <g data-j="truck" className={styles.vehicle}>
        <ellipse cx="0" cy="71" rx="300" ry="30" fill="#06101a" opacity=".35" filter="url(#ground-shadow)" />
        <image href={asset("truck-empty")} x="-320" y="-110" width="640" height="214" />
      </g>
      <g data-j="cargo" className={styles.cargo}>
        <image href={asset("container")} x="-145" y="-65" width="290" height="145" />
        <image href="/brand/nima-monogram.svg" x="-33" y="-20" width="66" height="66" opacity=".8" />
        <g data-j="stackerGrip" fill="none" strokeLinejoin="round">
          <path d="M-140 -67L140 -48l-1 11L-140 -56Z" fill="#25333a" stroke="#85969e" strokeWidth="2" />
          <path d="M-139 -60v15m278 4v15" stroke="#202a30" strokeWidth="5" />
          <path d="M-145 -61h12v13h-12zm278 19h12v13h-12z" fill="#d7a441" stroke="#17232a" strokeWidth="2" />
          <path d="M-129 -65l24 10m210 2l24 10" stroke="#e6bc63" strokeWidth="3" />
          <path d="M-18 -74v12m36-9v12" stroke="#1d2b32" strokeWidth="6" />
        </g>
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
    </svg>
  );
}
