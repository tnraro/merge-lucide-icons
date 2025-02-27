import { icons } from "./lucide";

export interface GenOptions {
  minify: boolean;
  indent: string;
}

type Script = string | Script[];

const gen = (x: Script, options?: Partial<GenOptions>) => {
  const _default: GenOptions = {
    minify: true,
    indent: "  ",
  };
  const _options: GenOptions = Object.assign(_default, options);
  const _gen = (x: Script, depth: number): string => {
    if (typeof x === "string") {
      if (_options.minify) return x;
      const indent = _options.indent.repeat(depth - 1);
      return indent + x;
    }
    return x.map((x) => _gen(x, depth + 1)).join(_options.minify ? "" : "\n");
  };
  if (_options.minify) {
    return _gen(x, 0)
      .replaceAll(/(?<=<(\w+)[^>]*?)>\s*<\/\1(?=>)/g, "/")
      .replaceAll(/\s+(?=\/>)/g, "");
  }
  return _gen(x, 0);
};

export const genSvg = (names: string[], options?: Partial<GenOptions>) => {
  return gen(
    [
      `<svg xmlns="http://www.w3.org/2000/svg">`,
      [
        `<defs>`,
        names
          .flatMap((name) => {
            const icon = icons.get(name);
            if (icon == null) return;
            return [`<symbol id="${icon.name}">`, [icon.child], `</symbol>`];
          })
          .filter(<T>(x: T | undefined): x is T => x != null),
        `</defs>`,
      ],
      `</svg>`,
    ],
    options
  );
};

export const genSvelte = (names: string[], options?: Partial<GenOptions>) => {
  return gen(
    [
      `<script lang="ts">`,
      [
        `interface Props {`,
        [
          `as: ${
            names.length === 0
              ? "never"
              : names.map((value) => `"${value}"`).join(" | ")
          };`,
          `size?: number;`,
        ],
        `}`,
        `let { as, size = 24 }: Props = $props();`,
      ],
      `</script>`,
      "",
      `<svg class="lucide lucide-{as}" viewBox="0 0 24 24" width={size} height={size}>`,
      [`<use href="/icons.svg#{as}" />`],
      `</svg>`,
      "",
      `<style>`,
      [
        `:global(:where(.lucide)) {`,
        [
          `width: 24px;`,
          `height: 24px;`,
          `fill: none;`,
          `stroke: currentColor;`,
          `stroke-width: 2;`,
          `stroke-linecap: round;`,
          `stroke-linejoin: round;`,
        ],
        `}`,
      ],
      `</style>`,
    ],
    options
  );
};
