type ProgressChartPoint = {
  label: string;
  value: number;
};

type ProgressChartProps = {
  points: ProgressChartPoint[];
  unit: string;
};

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function ProgressChart({ points, unit }: ProgressChartProps) {
  if (points.length === 0) {
    return null;
  }

  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 24, bottom: 36, left: 48 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const values = points.map((point) => point.value);

  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    min -= 1;
    max += 1;
  }

  const range = max - min;

  function x(index: number) {
    if (points.length === 1) {
      return padding.left + innerWidth / 2;
    }

    return padding.left + (index / (points.length - 1)) * innerWidth;
  }

  function y(value: number) {
    return padding.top + innerHeight - ((value - min) / range) * innerHeight;
  }

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${x(index)} ${y(point.value)}`,
    )
    .join(" ");

  const gridLines = [0, 0.5, 1].map((ratio) => {
    const value = max - ratio * range;

    return { y: y(value), value };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img">
      {gridLines.map((line) => (
        <g key={line.y}>
          <line
            x1={padding.left}
            y1={line.y}
            x2={width - padding.right}
            y2={line.y}
            stroke="#e5e7eb"
            strokeWidth={1}
          />

          <text
            x={padding.left - 8}
            y={line.y + 4}
            textAnchor="end"
            fontSize={11}
            fill="#9ca3af"
          >
            {formatValue(line.value)}
          </text>
        </g>
      ))}

      <path
        d={linePath}
        fill="none"
        stroke="#16a34a"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {points.map((point, index) => (
        <circle
          key={`${point.label}-${index}`}
          cx={x(index)}
          cy={y(point.value)}
          r={4}
          fill="#16a34a"
          stroke="#ffffff"
          strokeWidth={1.5}
        >
          <title>{`${point.label}: ${point.value} ${unit}`}</title>
        </circle>
      ))}

      <text x={x(0)} y={height - 12} textAnchor="start" fontSize={11} fill="#9ca3af">
        {points[0].label}
      </text>

      {points.length > 1 && (
        <text
          x={x(points.length - 1)}
          y={height - 12}
          textAnchor="end"
          fontSize={11}
          fill="#9ca3af"
        >
          {points[points.length - 1].label}
        </text>
      )}
    </svg>
  );
}
