<script lang="ts">
  import type { Challenge } from "$lib/data/challenges";

  export let challenge: Challenge;
  export let unlocked: boolean;
  export let opened: boolean;
  export let onToggle: (day: number) => void;

  const panelId = (day: number) => `challenge-panel-${day}`;

  // Optional: a tiny "slide" gesture without breaking keyboard/click usage.
  let coverX = 0; // 0..1
  let dragging = false;

  function pointerDown(e: PointerEvent) {
    if (!unlocked) return;
    dragging = true;
    coverX = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function pointerMove(e: PointerEvent) {
    if (!dragging || opened || !unlocked) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    coverX = Math.max(0, Math.min(1, x));
    if (coverX > 0.72) {
      dragging = false;
      coverX = 1;
      onToggle(challenge.day);
    }
  }

  function pointerUp() {
    dragging = false;
    coverX = 0;
  }
</script>

<article class="doorCard" data-opened={opened} data-locked={!unlocked}>
  <button
    class="doorButton"
    type="button"
    disabled={!unlocked}
    aria-disabled={!unlocked}
    aria-expanded={opened}
    aria-controls={panelId(challenge.day)}
    aria-label={unlocked
      ? (opened ? `Close day ${challenge.day}: ${challenge.title}` : `Open day ${challenge.day}: ${challenge.title}`)
      : `Day ${challenge.day} is locked`}
    on:click={() => unlocked && onToggle(challenge.day)}
  >
    <span class="dayNumber" aria-hidden="true">{challenge.day}</span>

    <span
      class="doorCover"
      style="--coverX: {opened ? 1 : coverX}"
      on:pointerdown={pointerDown}
      on:pointermove={pointerMove}
      on:pointerup={pointerUp}
      on:pointercancel={pointerUp}
      aria-hidden="true"
    >
      <span class="hint" aria-hidden="true">{unlocked ? "slide / click" : "locked"}</span>
    </span>
  </button>

  <div id={panelId(challenge.day)} class="panel" hidden={!opened}>
    <h3 class="title">{challenge.title}</h3>
    <p class="desc">{challenge.challenge}</p>
    <p class="midi"><strong>MIDI focus:</strong> {challenge.midiFocus}</p>
  </div>
</article>

<style>
  .doorCard { position: relative; }
  .doorButton {
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    display: block;
    border: 1px solid currentColor;
    background: transparent;
    padding: 0;
    text-align: left;
  }
  .doorButton:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }

  .dayNumber {
    font-size: clamp(1.25rem, 3vw, 2.25rem);
    font-weight: 700;
    position: absolute;
    top: 0.65rem;
    left: 0.75rem;
  }

  /* The “door” */
  .doorCover {
    position: absolute;
    inset: 0;
    transform: translateX(calc(var(--coverX, 0) * 100%));
    border-left: 1px solid currentColor;
    background: rgba(255,255,255,0.06);
    display: grid;
    place-items: end start;
    padding: 0.75rem;
    transition: transform 180ms linear;
  }

  .hint { font-size: 0.85rem; opacity: 0.8; }

  [data-locked="true"] .doorCover { background: rgba(255,255,255,0.03); }
  [data-opened="true"] .doorCover { transform: translateX(100%); }

  .panel {
    margin-top: 0.75rem;
    border: 1px solid currentColor;
    padding: 0.75rem;
  }
  .title { margin: 0 0 0.4rem 0; font-size: 1rem; }
  .desc, .midi { margin: 0.25rem 0 0 0; }

  @media (prefers-reduced-motion: reduce) {
    .doorCover { transition: none; }
  }
</style>
