<script lang="ts">
  import type { Challenge } from "$lib/data/challenges";

  export let challenge: Challenge;
  export let unlocked: boolean;
  export let opened: boolean;
  export let onToggle: (day: number) => void;
  export let isSelected = false;
  export let isPast = false;
  export let isToday = false;

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

<article
  class="doorCard"
  data-opened={opened}
  data-locked={!unlocked}
  data-selected={isSelected}
  data-today={isToday}
  data-past={isPast}
>
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
    display: grid;
    place-items: center;
    border: 1px solid rgba(243, 243, 243, 0.35);
    border-radius: clamp(14px, 2.6vw, 20px);
    background: linear-gradient(150deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
    box-shadow:
      0 18px 28px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    padding: 0;
    text-align: left;
    overflow: hidden;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
    isolation: isolate;
  }
  .doorButton::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 1px solid transparent;
    pointer-events: none;
    transition: border-color 160ms ease, box-shadow 160ms ease;
  }
  .doorButton:focus-visible { outline: 2px solid rgba(243, 243, 243, 0.9); outline-offset: 3px; }
  .doorButton:disabled {
    border-color: rgba(243, 243, 243, 0.15);
    color: rgba(243, 243, 243, 0.55);
  }

  .dayNumber {
    font-size: clamp(1.3rem, 3.6vw, 2.35rem);
    font-weight: 700;
    position: relative;
    letter-spacing: 0.02em;
    z-index: 2;
    line-height: 1;
    pointer-events: none;
  }

  /* The “door” */
  .doorCover {
    position: absolute;
    inset: 0;
    transform: translateX(calc(var(--coverX, 0) * 100%));
    z-index: 1;
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
    top: 50%;
    right: var(--knob-offset, 12%);
    transform: translateY(-50%);
    width: var(--knob-size, clamp(10px, 2vw, 16px));
    height: var(--knob-size, clamp(10px, 2vw, 16px));
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
    top: 50%;
    right: calc(var(--knob-offset, 13%) + (var(--knob-size, clamp(10px, 2vw, 16px)) - var(--lock-size, clamp(10px, 1.8vw, 13px))) / 2);
    transform: translateY(-50%);
    width: var(--lock-size, clamp(10px, 1.8vw, 13px));
    height: var(--lock-size, clamp(10px, 1.8vw, 13px));
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
  /* Past default (yellow) */
  [data-past="true"]:not([data-selected="true"]) .doorButton::before {
    border-color: rgba(252, 227, 18, 0.95);
    box-shadow:
      0 0 0 1px rgba(252, 227, 18, 0.7),
      0 10px 26px rgba(252, 227, 18, 0.35);
  }
  [data-past="true"]:not([data-selected="true"]) .doorCover::after { border-color: rgba(252, 227, 18, 0.5); }
  [data-past="true"]:not([data-selected="true"]) .dayNumber { color: #fce312; }

  /* Selected (clicked) default blue */
  [data-selected="true"] .doorButton::before {
    border-color: rgba(65, 153, 216, 0.95);
    box-shadow:
      0 0 0 1px rgba(65, 153, 216, 0.75),
      0 10px 26px rgba(65, 153, 216, 0.35);
  }
  [data-selected="true"] .doorCover::after { border-color: rgba(65, 153, 216, 0.5); }
  [data-selected="true"] .dayNumber { color: #4199d8; }

  /* Today is always green (overrides selection) */
  [data-today="true"] .doorButton::before {
    border-color: rgba(74, 252, 131, 0.95);
    box-shadow:
      0 0 0 1px rgba(74, 252, 131, 0.75),
      0 10px 26px rgba(74, 252, 131, 0.35);
  }
  [data-today="true"] .doorCover::after { border-color: rgba(74, 252, 131, 0.55); }
  [data-today="true"] .dayNumber { color: #4afc83; }
  [data-selected="true"][data-today="true"] .doorButton::before {
    border-color: rgba(74, 252, 131, 0.95);
    box-shadow:
      0 0 0 1px rgba(74, 252, 131, 0.75),
      0 10px 26px rgba(74, 252, 131, 0.35);
  }
  [data-selected="true"][data-today="true"] .doorCover::after { border-color: rgba(74, 252, 131, 0.55); }
  [data-selected="true"][data-today="true"] .dayNumber { color: #4afc83; }

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
    .doorCard { gap: 0.45rem; }
    .doorButton { transform: scale(1.02); }
    .dayNumber { font-size: clamp(0.75rem, 4.4vw, 0.9rem); }
    .doorCover { padding: 0.5rem; }
    .doorCover::before {
      --knob-size: clamp(8px, 3vw, 12px);
      --knob-offset: 10%;
    }
    .hint { font-size: 0.75rem; }
    .lockIcon {
      --lock-size: clamp(8px, 2.6vw, 11px);
      top: 50%;
      transform: translateY(-50%);
    }
    .dayNumber {
      position: absolute;
      bottom: 0.4rem;
      left: 0.35rem;
      transform: none;
      text-align: left;
    }
    .panel { display: none; }
  }
</style>
