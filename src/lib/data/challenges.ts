export type Challenge = {
  day: number;
  title: string;
  challenge: string;
  midiFocus: string;
};

export const challenges: Challenge[] = [
  { day: 1, title: "One Note, Many Ways", challenge: "Make a 30–60s piece using only one pitch.", midiFocus: "Use velocity and/or aftertouch to shape dynamics and expression." },
  { day: 2, title: "Tempo Flip", challenge: "Write two versions of the same idea: slow and fast.", midiFocus: "Record one MIDI clip, change BPM only (or automate tempo)." },
  { day: 3, title: "Rhythm Without Pitch", challenge: "Build a groove using a synth voice (noise/envelopes/clicks), not drums.", midiFocus: "Shape rhythm with note length, velocity, and gate timing." },
  { day: 4, title: "Odd One Out", challenge: "Write in 5/4, 7/8, or 9/8 (a single bar loop is fine).", midiFocus: "Use step length/time signature settings; share bar length." },
  { day: 5, title: "Scale Cage Match", challenge: "Pick a scale (major/minor/pentatonic/Dorian). Stay inside it.", midiFocus: "Use scale mode or constrain notes in your MIDI editor." },
  { day: 6, title: "Two-Chord Universe", challenge: "Make a loop with only two chords. Make it interesting anyway.", midiFocus: "Record chords then adjust inversions in MIDI." },
  { day: 7, title: "Arp Day", challenge: "Use an arpeggiator to generate the main motif.", midiFocus: "Record the arp output as MIDI if possible; note mode + rate." },
  { day: 8, title: "CC Treasure Hunt", challenge: "Pick one control and move it with intention.", midiFocus: "Map it to a MIDI CC and record one expressive lane." },
  { day: 9, title: "Swing, Don’t Apologise", challenge: "Add swing until it becomes a vibe (not an accident).", midiFocus: "Use MIDI swing/groove and note the %." },
  { day: 10, title: "Call and Response", challenge: "Write a phrase that asks, and one that answers.", midiFocus: "Put call on MIDI channel 1 and response on channel 2 (or two tracks)." },
  { day: 11, title: "Patch From a Constraint", challenge: "Design a patch using only one oscillator OR one envelope OR no filter.", midiFocus: "Assign mod wheel (CC1) to something musical." },
  { day: 12, title: "The Bassline Law", challenge: "Write a bassline that avoids the root on beat 1 at least half the time.", midiFocus: "Use velocity accents + ghosts for groove." },
  { day: 13, title: "Mute to Create", challenge: "Start with 6–10 parts. Mute half and commit.", midiFocus: "Use MIDI mute/solo or delete notes non-destructively." },
  { day: 14, title: "One Bar Story", challenge: "Tell a story in one bar, then evolve it over time.", midiFocus: "Add CC changes every 4 or 8 bars." },
  { day: 15, title: "Negative Space", challenge: "Make a groove where silence is the hook.", midiFocus: "Edit note-offs/gates and leave deliberate gaps." },
  { day: 16, title: "Oblique: Honour Thy Error", challenge: "Make a mistake, keep it, build around it.", midiFocus: "Make the ‘wrong’ note intentional via timing/velocity/CC." },
  { day: 17, title: "Polyrhythm Lite", challenge: "Layer 3-step vs 4-step (or 5 vs 4).", midiFocus: "Use different loop lengths per MIDI track/clip." },
  { day: 18, title: "Texture From Modulation", challenge: "Make a drone/pad that evolves without changing notes much.", midiFocus: "Slow CC automation or pressure swells (aftertouch)." },
  { day: 19, title: "Program Change Adventure", challenge: "Switch sounds mid-piece.", midiFocus: "Send a Program Change (or a preset switch) at a bar." },
  { day: 20, title: "Monophonic Discipline", challenge: "Write a lead using only monophonic lines (no chords).", midiFocus: "Use pitch bend; define bend range (±2/±12)." },
  { day: 21, title: "Sample It", challenge: "Use one recorded sound as your seed.", midiFocus: "Map it chromatically and play it via MIDI notes." },
  { day: 22, title: "Harmony by Accident", challenge: "Harmonize a melody by a rule (3rds/5ths/octaves).", midiFocus: "Duplicate MIDI and transpose by fixed interval." },
  { day: 23, title: "Velocity as Orchestration", challenge: "Make one instrument feel like three using velocity ranges.", midiFocus: "Velocity-to-filter/amp (or layered velocity zones)." },
  { day: 24, title: "One FX, No Mercy", challenge: "Choose one effect and make it central.", midiFocus: "Map CC to an FX parameter and perform it." },
  { day: 25, title: "Humanize With Intent", challenge: "Micro-nudge timing: some ahead, some behind. Keep anchors steady.", midiFocus: "Use micro-timing; keep your anchor hits consistent." },
  { day: 26, title: "Two Sounds, Two Roles", challenge: "Only two patches: one rhythmic, one tonal.", midiFocus: "Separate by MIDI channels or clearly named tracks." },
  { day: 27, title: "Modal Colour", challenge: "Write in Dorian/Mixolydian/Phrygian; lean into the special note.", midiFocus: "Accentuate the characteristic degree via velocity/CC." },
  { day: 28, title: "The 8-Bar Contract", challenge: "Write exactly 8 bars with a beginning, middle, end.", midiFocus: "Mark sections with CC changes at bars 1/5/7." },
  { day: 29, title: "Generative-ish", challenge: "Set up a system that surprises you (probability, random, evolving seq).", midiFocus: "Use MIDI probability or randomized velocity/length." },
  { day: 30, title: "Oblique: Change Instrument Roles", challenge: "Make bass do melody, lead do percussion. Swap expectations.", midiFocus: "Copy a MIDI clip to a new instrument unchanged." },
  { day: 31, title: "Performance Take", challenge: "Record one live take and keep imperfections.", midiFocus: "Record notes + CC/aftertouch in one pass; no edits except trim." }
];
