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
      {#if unlocked}
        <span class="hint" aria-hidden="true"></span>
      {:else}
        <span class="lockIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path
              d="M17 10h-1V8a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V8Zm2 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
            />
          </svg>
        </span>
      {/if}
    </span>
  </button>

  <div id={panelId(challenge.day)} class="panel" hidden={!opened}>
    <h3 class="title">{challenge.title}</h3>
    <p class="desc">{challenge.challenge}</p>
    <p class="midi"><strong>MIDI focus:</strong> {challenge.midiFocus}</p>
  </div>
</article>

<style>
  .doorCard {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .doorButton {
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    display: block;
    border: 1px solid rgba(243, 243, 243, 0.35);
    border-radius: clamp(14px, 2.6vw, 20px);
    background: linear-gradient(150deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
    box-shadow:
      0 18px 28px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    padding: 0;
    text-align: left;
    overflow: hidden;
  }
  .doorButton:focus-visible { outline: 2px solid rgba(243, 243, 243, 0.9); outline-offset: 3px; }
  .doorButton:disabled {
    border-color: rgba(243, 243, 243, 0.15);
    color: rgba(243, 243, 243, 0.55);
  }

  .dayNumber {
    font-size: clamp(1.25rem, 3vw, 2.25rem);
    font-weight: 700;
    position: absolute;
    top: 0.75rem;
    left: 0.85rem;
    letter-spacing: 0.02em;
  }

  /* The “door” */
  .doorCover {
    position: absolute;
    inset: 0;
    transform: translateX(calc(var(--coverX, 0) * 100%));
    border-left: 1px solid rgba(243, 243, 243, 0.25);
    border-radius: clamp(14px, 2.6vw, 20px);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
    display: grid;
    place-items: end start;
    padding: 0.85rem;
    transition: transform 360ms cubic-bezier(0.4, 0.1, 0.2, 1), opacity 200ms ease 240ms;
    box-shadow:
      inset -10px 0 14px rgba(0, 0, 0, 0.2),
      0 12px 22px rgba(0, 0, 0, 0.25);
  }
  .doorCover::before {
    content: "";
    position: absolute;
    top: 14%;
    right: 16%;
    width: clamp(10px, 2vw, 16px);
    height: clamp(10px, 2vw, 16px);
    border-radius: 999px;
    border: 1px solid rgba(243, 243, 243, 0.5);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.25);
    opacity: 0.9;
  }
  .doorCover::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 1px solid rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }

  .hint { font-size: 0.85rem; opacity: 0.8; }
  .lockIcon {
    position: absolute;
    bottom: 0.55rem;
    right: 0.6rem;
    width: clamp(14px, 2.2vw, 18px);
    height: clamp(14px, 2.2vw, 18px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
  }
  .lockIcon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  [data-locked="true"] .doorCover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
    box-shadow: inset -6px 0 10px rgba(0, 0, 0, 0.15);
  }
  [data-opened="true"] .doorCover {
    transform: translateX(102%);
    opacity: 0;
    pointer-events: none;
  }

  .panel {
    border: 1px solid rgba(243, 243, 243, 0.25);
    border-radius: 14px;
    padding: 0.85rem;
    background: rgba(10, 10, 12, 0.7);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  }
  .title { margin: 0 0 0.4rem 0; font-size: 1rem; }
  .desc, .midi { margin: 0.25rem 0 0 0; }

  @media (prefers-reduced-motion: reduce) {
    .doorCover { transition: none; }
  }

  @media (max-width: 640px) {
    .doorCard { gap: 0.5rem; }
    .doorCover { padding: 0.6rem; }
    .hint { font-size: 0.75rem; }
    .lockIcon { bottom: 0.45rem; right: 0.5rem; }
    .panel { display: none; }
  }
</style>
