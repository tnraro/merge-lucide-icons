type LucideIconElementChild = [
  "circle" | "path" | "rect" | "polygon" | "polyline" | "line" | "ellipse",
  Record<string, string>
];

type LucideIconElement = LucideIconElementChild[];

interface LucideIcons {
  [key: string]: LucideIconElement;
}

interface Lucide extends LucideIcons {
  createElement(): unknown;
  createIcons(): unknown;
  icons: LucideIcons;
}

declare var lucide: Lucide;
