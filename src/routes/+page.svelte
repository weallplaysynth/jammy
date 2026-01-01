<script lang="ts">
  import CalendarGrid from "$lib/components/CalendarGrid.svelte";
  import { challenges } from "$lib/data/challenges";

  const currentYear = new Date().getFullYear();
</script>

<main class="shell">
  <CalendarGrid year={currentYear} monthIndex0={0} {challenges} />
  <footer class="footer">
    <p>Tip: post a screenshot of your MIDI clip + one sentence about the MIDI focus.</p>
  </footer>
</main>

<style>
  .shell { max-width: 1100px; margin: 0 auto; padding: 1rem; }
  .footer { margin: 2rem 0 1rem 0; opacity: 0.85; font-size: 0.95rem; }
</style>
