// Synthesizer & Audio Player for Podcast Opening Sound
// Uses Web Audio API for an instant, zero-dependency, broadcast-grade podcast intro chime,
// with optional support for custom MP3/audio files if provided.

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  return audioCtx
}

// Automatically unlock AudioContext on first user interaction on the page
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext()
    if (ctx && ctx.state === 'suspended') {
      ctx.resume()
    }
    window.removeEventListener('pointerdown', unlockAudio)
    window.removeEventListener('keydown', unlockAudio)
  }
  window.addEventListener('pointerdown', unlockAudio, { passive: true })
  window.addEventListener('keydown', unlockAudio, { passive: true })
}

let activePlayback = null

/**
 * Synthesizes a studio-quality podcast opening sound:
 * 1. Studio mic / tape click & warm air thump
 * 2. Signature 4-note podcast intro chime (bright, warm marimba/Rhodes chord sting)
 * 3. Warm broadcast sub-frequency resonance
 */
function playSynthesizedPodcastIntro() {
  const ctx = getAudioContext()
  if (!ctx) return null

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const now = ctx.currentTime
  const masterGain = ctx.createGain()
  masterGain.gain.setValueAtTime(0.22, now) // Pleasant, non-jarring volume
  masterGain.connect(ctx.destination)

  // --- 1. Tape / Mic Click ---
  // A tiny high-passed click like switching on a broadcast mic / pressing play on a tape deck
  const bufferSize = ctx.sampleRate * 0.02
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.004))
  }
  const clickSource = ctx.createBufferSource()
  clickSource.buffer = buffer

  const clickFilter = ctx.createBiquadFilter()
  clickFilter.type = 'highpass'
  clickFilter.frequency.setValueAtTime(1800, now)

  const clickGain = ctx.createGain()
  clickGain.gain.setValueAtTime(0.3, now)
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

  clickSource.connect(clickFilter)
  clickFilter.connect(clickGain)
  clickGain.connect(masterGain)
  clickSource.start(now)

  // --- 2. Low-frequency warm broadcast thump (studio proximity feel) ---
  const thumpOsc = ctx.createOscillator()
  const thumpGain = ctx.createGain()
  thumpOsc.type = 'sine'
  thumpOsc.frequency.setValueAtTime(110, now)
  thumpOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18)

  thumpGain.gain.setValueAtTime(0.4, now)
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

  thumpOsc.connect(thumpGain)
  thumpGain.connect(masterGain)
  thumpOsc.start(now)
  thumpOsc.stop(now + 0.25)

  // --- 3. Warm Signature Podcast Jingle / Chime notes ---
  // A signature 4-note uplifting broadcast sequence: C4, G4, B4, E5 (Major 9th / broadcast ident feel)
  const notes = [
    { freq: 261.63, time: 0.03, dur: 0.8 }, // C4
    { freq: 392.00, time: 0.15, dur: 0.8 }, // G4
    { freq: 493.88, time: 0.28, dur: 0.9 }, // B4
    { freq: 659.25, time: 0.42, dur: 1.1 }, // E5 (warm chime ring-out)
  ]

  notes.forEach(({ freq, time, dur }) => {
    const noteStart = now + time

    // Primary bell/chime oscillator (sine for warmth)
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(freq, noteStart)

    // Harmonics oscillator (triangle for Rhodes-like body)
    const osc2 = ctx.createOscillator()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(freq * 2, noteStart)

    const osc2Gain = ctx.createGain()
    osc2Gain.gain.setValueAtTime(0.18, noteStart)

    // Lowpass filter for smooth broadcast warmth
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2400, noteStart)
    filter.frequency.exponentialRampToValueAtTime(1000, noteStart + dur)

    const noteGain = ctx.createGain()
    noteGain.gain.setValueAtTime(0.0001, noteStart)
    noteGain.gain.exponentialRampToValueAtTime(0.35, noteStart + 0.02) // Snappy attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + dur) // Natural ring out

    osc1.connect(noteGain)
    osc2.connect(osc2Gain)
    osc2Gain.connect(noteGain)
    noteGain.connect(filter)
    filter.connect(masterGain)

    osc1.start(noteStart)
    osc2.start(noteStart)
    osc1.stop(noteStart + dur + 0.05)
    osc2.stop(noteStart + dur + 0.05)
  })

  // Return handle to allow fading out if mouse leaves early
  return {
    stop: () => {
      const stopTime = ctx.currentTime
      masterGain.gain.cancelScheduledValues(stopTime)
      masterGain.gain.setValueAtTime(masterGain.gain.value, stopTime)
      masterGain.gain.exponentialRampToValueAtTime(0.0001, stopTime + 0.25)
    },
  }
}

/**
 * Plays podcast opening sound or custom music.
 * If a customAudioUrl (e.g. from Google Sheet or local /public file) is provided,
 * it plays that audio file with smooth fade out on mouse leave.
 * Otherwise, it plays the broadcast synthesizer jingle.
 */
export function playPodcastSound(customAudioUrl) {
  // Stop any ongoing playback
  stopPodcastSound()

  if (customAudioUrl) {
    try {
      const audio = new Audio(customAudioUrl)
      audio.volume = 0.5
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to synthesizer if audio link fails or is blocked
          activePlayback = playSynthesizedPodcastIntro()
        })
      }

      activePlayback = {
        stop: () => {
          // Smooth 150ms fade-out so music doesn't cut off abruptly
          const fadeInterval = setInterval(() => {
            if (audio.volume > 0.08) {
              audio.volume = Math.max(0, audio.volume - 0.08)
            } else {
              clearInterval(fadeInterval)
              audio.pause()
              audio.currentTime = 0
            }
          }, 25)
        },
      }
      return activePlayback
    } catch {
      activePlayback = playSynthesizedPodcastIntro()
      return activePlayback
    }
  }

  activePlayback = playSynthesizedPodcastIntro()
  return activePlayback
}

export function stopPodcastSound() {
  if (activePlayback && typeof activePlayback.stop === 'function') {
    activePlayback.stop()
    activePlayback = null
  }
}
