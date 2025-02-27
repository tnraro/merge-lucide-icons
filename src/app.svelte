<script lang="ts">
  import Icon from "./features/icon.svelte";
  import MultiSelect from "./features/multi-select.svelte";
  import { createIconHtmlString, icons } from "./lib/lucide";
  import { genSvelte, genSvg } from "./lib/script-generator";

  const iconNames = [...icons.keys()];

  let values = $state<string[]>([]);
  let options = $state({
    indent: "  ",
    minify: false,
  });

  let svg = $derived(genSvg(values, options));
  let svelte = $derived(genSvelte(values, options));
</script>

<main>
  <section>
    <h1><Icon as="search" />Search</h1>
    <MultiSelect bind:values items={iconNames} placeholder="Search icons...">
      {#snippet item(value)}
        <div class="value">
          {@html createIconHtmlString(value)}
          {value}
        </div>
      {/snippet}
    </MultiSelect>
  </section>
  <section>
    <h1><Icon as="settings2" />Setting</h1>
    <div class="options">
      <label for="options-indent">indent:</label>
      <input
        class="options__option"
        id="options-indent"
        bind:value={options.indent}
      />
      <label for="options-minify">minify:</label>
      <button
        type="button"
        class="options__option"
        id="options-minify"
        onclick={() => (options.minify = !options.minify)}
        >{options.minify}</button
      >
    </div>
  </section>
  <section>
    <h1><Icon as="pen-tool" />icons.svg</h1>
    <pre>{svg}</pre>
  </section>
  <section>
    <h1><Icon as="file-code2" />icons.svelte</h1>
    <pre>{svelte}</pre>
  </section>
</main>

<style lang="scss">
  @use "./styles/color";
  .value {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }
  .options {
    display: grid;
    grid-template-columns: min-content min-content;
    gap: 0.25rem 0.5rem;

    &__option {
      appearance: none;
      border: none;
      background: color.$sand-3;
      outline: none;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      &:focus {
        background: color.$sand-4;
      }
    }
  }
  section {
    margin-block: 1rem;
  }
  h1 {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  pre {
    user-select: all;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    background: color.$sand-3;
    font-family: monospace;
    max-width: 100%;
    overflow: auto;
  }
</style>
