<script lang="ts">
  import DoorCard from "./DoorCard.svelte";
  import { buildMonthGrid } from "$lib/utils/calendar";
  import { isUnlocked } from "$lib/utils/unlock";
  import type { Challenge } from "$lib/data/challenges";
  import { onMount } from "svelte";

  export let year = 2026;
  export let monthIndex0 = 0; // Jan
  export let challenges: Challenge[] = [];

  // localStorage remembers opened doors
  let openedDays = new Set<number>();

  const storageKey = `waps-learn-opened-${year}-${monthIndex0}`;

  function loadOpened() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const arr = JSON.parse(raw) as number[];
      openedDays = new Set(arr.filter((n) => Number.isFinite(n)));
    } catch {
      // ignore
    }
  }

  function saveOpened() {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...openedDays]));
    } catch {
      // ignore
    }
  }

  function toggle(day: number) {
    if (openedDays.has(day)) openedDays.delete(day);
    else openedDays.add(day);
    saveOpened();
  }

  const cells = buildMonthGrid(year, monthIndex0);

  onMount(loadOpened);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<section class="calendar" aria-label="January challenge calendar">
  <header class="headerBlock">
    <h1 class="h1">WE ALL PLAY SYNTH : LEARN</h1>
    <p class="sub">Jamuary-style daily synth challenges · January {year}</p>
  </header>

  <div class="weekdays" role="row" aria-hidden="true">
    {#each weekdays as wd}
      <div class="weekday">{wd}</div>
    {/each}
  </div>

  <ol class="grid" aria-label="Calendar days">
    {#each cells as cell}
      <li class="cell" aria-label={cell.day ? `Day ${cell.day}` : "Empty"}>
        {#if cell.day}
          {#if challenges[cell.day - 1]}
            <DoorCard
              challenge={challenges[cell.day - 1]}
              unlocked={isUnlocked(cell.day, year, monthIndex0)}
              opened={openedDays.has(cell.day)}
              onToggle={toggle}
            />
          {/if}
        {/if}
      </li>
    {/each}
  </ol>
</section>

<style>
  .headerBlock { margin: 1.25rem 0 1.25rem 0; }
  .h1 {
    margin: 0;
    font-size: clamp(1.4rem, 3.2vw, 2.4rem);
    letter-spacing: 0.02em;
  }
  .sub { margin: 0.35rem 0 0 0; opacity: 0.85; }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.85;
    font-size: 0.85rem;
  }
  .weekday { padding: 0.25rem 0.1rem; }

  .grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.75rem;
  }
  .cell { min-width: 0; }
</style>
