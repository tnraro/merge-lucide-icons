interface LucideIconElementProps {
  xmlns: string;
  width: number;
  height: number;
  viewBox: "0 0 24 24";
  fill: "none";
  stroke: "currentColor";
  "stroke-width": number;
  "stroke-linecap": "round";
  "stroke-linejoin": "round";
}
type LucideIconElementChild = [
  "circle" | "path" | "rect" | "polygon" | "polyline" | "line" | "ellipse",
  Record<string, string>,
];

type LucideIconElement = [
  "svg",
  LucideIconElementProps,
  LucideIconElementChild[]
];

interface LucideIcons {
  [key: string]: LucideIconElement;
}

interface Lucide extends LucideIcons {
  createElement(): unknown;
  createIcons(): unknown;
  icons: LucideIcons;
}

declare var lucide: Lucide;