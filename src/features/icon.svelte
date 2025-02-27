<script lang="ts">
  interface Props {
    as: "search" | "settings2" | "pen-tool" | "file-code2";
    size?: number;
  }
  let { as, size = 24 }: Props = $props();
</script>

<svg class="lucide lucide-{as}" viewBox="0 0 24 24" width={size} height={size}>
  <use href="{import.meta.env.BASE_URL}/icons.svg#{as}" />
</svg>

<style>
  :global(:where(.lucide)) {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
