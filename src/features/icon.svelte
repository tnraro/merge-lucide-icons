<script lang="ts">
  export let as: "search" | "settings2" | "pen-tool" | "file-code2";
  export let size = 24;
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