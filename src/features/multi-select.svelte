<script lang="ts">
  import { search } from "../lib/fuzzy-search";

  export let values: string[] = [];
  export let items: string[] = [];
  export let placeholder: string | undefined = undefined;

  const popupId = crypto.randomUUID();

  const scroll = () => {
    const rect = popup.children[index].getBoundingClientRect();
    const dr = popup.getBoundingClientRect();
    if (rect.bottom > dr.bottom)
      popup.scroll(0, popup.scrollTop + rect.bottom - dr.bottom);
    if (rect.top < dr.top)
      popup.scroll(0, popup.scrollTop + rect.top - dr.top);
  };
  const addValue = (value: string) => {
    const set = new Set(values);
    set.add(value);
    values = [...set.values()];
  };
  const deleteValue = (value: string) => {
    const set = new Set(values);
    if (set.delete(value)) {
      values = [...set.values()];
    }
  };

  const focus = () => {
    input.focus();
  };

  let input: HTMLElement;
  let popup: HTMLElement;
  let value = "";
  let index = 0;

  $: isOpen = value.length >= 1;
  $: filteredItems = isOpen ? search(value, items) : [];
</script>

<div
  role="combobox"
  aria-expanded={isOpen}
  aria-controls={popupId}
  aria-activedescendant="{popupId}-{index}"
  tabindex="0"
  class="multi-select"
  on:click={() => focus()}
  on:focus={() => focus()}
  on:keydown={(e) => {}}
>
  {#each values as value}
    <button class="value" on:click|stopPropagation={(e) => deleteValue(value)}>
      <slot name="value" {value} />
      <span class="delete-value">×</span>
    </button>
  {/each}
  <input
    class="select-input"
    bind:this={input}
    bind:value
    {placeholder}
  />
</div>
{#if isOpen}
  <ul
    id={popupId}
    bind:this={popup}
    role="listbox"
    class="popup"
  >
    {#each filteredItems as item, i}
      <li
        role="option"
        id="{popupId}-{i}"
        tabindex="0"
        aria-selected={index === i}
        class="popup__value"
        on:click={() => {
          addValue(item);
          value = "";
          index = 0;
        }}
        on:keydown={() => {}}
      >
        <slot name="value" value={item} />
      </li>
    {/each}
  </ul>
{/if}

<svelte:window
  on:keydown={(e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      index = (index + 1) % filteredItems.length;
      scroll();
    } else if (e.key === "ArrowUp") {
      index = (index - 1 + filteredItems.length) % filteredItems.length;
      scroll();
    } else if (e.key === "Enter") {
      if (filteredItems.length === 0) return;
      addValue(filteredItems[index]);
      value = "";
      index = 0;
    } else if (e.key === "Escape") {
      value = "";
      index = 0;
    }
  }}
/>

<style lang="scss">
  @use "../styles/color";
  .multi-select {
    user-select: none;
    border-radius: 0.5rem;
    background: color.$sand-3;
    cursor: text;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    padding-inline: 0.5rem;
    padding-block: 0.5rem;
    &:focus-within {
      background: color.$sand-4;
    }
  }
  .value {
    appearance: none;
    border: none;
    padding-inline: 0.25rem;
    background: color.$sand-5;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    border-radius: 0.25rem;
    cursor: pointer;
    &:hover {
      background: color.$amber-9;
      color: color.$sand-1;
    }
  }
  .select-input {
    appearance: none;
    border: none;
    background: transparent;
    outline: none;
    flex: 1 1;
  }
  .popup {
    user-select: none;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    position: absolute;
    margin: 0;
    list-style: none;
    padding: 0.5rem;
    background: color.$sand-2;
    border-radius: 0.5rem;
    max-height: min(20rem, 100dvh);
    overflow: hidden auto;
    &__value {
      padding-inline: 0.25rem;
      display: flex;
      gap: 0.25rem;
      align-items: center;
      border-radius: 0.25rem;
      &[aria-selected="true"] {
        background: color.$amber-9;
        color: color.$sand-1;
      }
    }
  }
</style>
