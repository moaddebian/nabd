export function Pulse({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="44"
      height="36"
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 19h9l5-12 9 24 5-17 4 5h6"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function HeartArt() {
  return (
    <div
      className="heart-art"
      aria-label="Illustration originale : un cœur et ses ondes de solidarité"
      role="img"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <svg viewBox="0 0 500 500" className="heart-svg" aria-hidden="true">
        <defs>
          <linearGradient id="heart" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ff7b80" />
            <stop offset=".45" stopColor="#e5484d" />
            <stop offset="1" stopColor="#971f35" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="22"
              stdDeviation="15"
              floodColor="#a12c3a"
              floodOpacity=".24"
            />
          </filter>
        </defs>
        <path
          d="M250 376C220 352 102 282 102 198C102 111 211 96 250 169C289 96 398 111 398 198C398 282 280 352 250 376Z"
          fill="url(#heart)"
          filter="url(#shadow)"
        />
        <path
          d="M142 240h62l22-49 36 100 25-69 14 18h56"
          stroke="#fff6ef"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M145 185c8-31 44-41 64-24"
          stroke="#ffb6b6"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          opacity=".65"
        />
      </svg>
      <span className="art-dot dot-a" />
      <span className="art-dot dot-b" />
      <div className="float-note note-top">
        <span className="tiny-heart">♥</span>
        <div>
          Un geste simple.
          <br />
          <strong>Un impact immense.</strong>
        </div>
      </div>
      <div className="float-note note-bottom">
        <span className="avatar-stack">
          <i>A</i>
          <i>M</i>
          <i>S</i>
        </span>
        <div>
          La solidarité
          <br />
          <strong>commence avec nous.</strong>
        </div>
      </div>
      <span className="art-label">LA VIE CIRCULE. L’ESPOIR AUSSI.</span>
    </div>
  );
}
