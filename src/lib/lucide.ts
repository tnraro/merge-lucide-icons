import { pascalCaseToKebabCase } from "./case-transform";

export const icons = new Map(
  Object.entries(lucide.icons).map(([name, children]) => {
    name = pascalCaseToKebabCase(name);
    const child = children
      .map(
        ([tag, attr]) =>
          `<${tag} ${Object.entries(attr)
            .map((x) => `${x[0]}="${x[1]}"`)
            .join(" ")} />`
      )
      .join("");
    return [
      name,
      {
        name,
        child,
      },
    ];
  })
);

export const createIconHtmlString = (name: string) => {
  const icon = icons.get(name);
  if (icon == null) return;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon.child}</svg>`;
};
