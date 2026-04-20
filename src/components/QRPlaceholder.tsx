import { useMemo } from "react";

interface Props {
  value: string;
  size?: number;
}

/**
 * Decorative QR-style placeholder. Deterministic from `value` so each ticket
 * has a unique stable pattern. Not a real scannable QR.
 */
export function QRPlaceholder({ value, size = 120 }: Props) {
  const grid = 17;
  const cells = useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const out: boolean[] = [];
    for (let i = 0; i < grid * grid; i++) {
      h = Math.imul(h ^ (h >>> 13), 1597334677);
      out.push((h & 1) === 1);
    }
    return out;
  }, [value]);

  const cell = size / grid;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="rounded-lg bg-white p-1"
      aria-label="Scan at entrance"
    >
      {cells.map((on, i) => {
        if (!on) return null;
        const x = (i % grid) * cell;
        const y = Math.floor(i / grid) * cell;
        return <rect key={i} x={x} y={y} width={cell} height={cell} fill="#080810" />;
      })}
      {/* corner squares */}
      {[
        [0, 0],
        [grid - 7, 0],
        [0, grid - 7],
      ].map(([cx, cy], k) => (
        <g key={k}>
          <rect x={cx * cell} y={cy * cell} width={7 * cell} height={7 * cell} fill="#fff" />
          <rect
            x={cx * cell}
            y={cy * cell}
            width={7 * cell}
            height={7 * cell}
            fill="none"
            stroke="#080810"
            strokeWidth={cell}
          />
          <rect
            x={(cx + 2) * cell}
            y={(cy + 2) * cell}
            width={3 * cell}
            height={3 * cell}
            fill="#080810"
          />
        </g>
      ))}
    </svg>
  );
}
