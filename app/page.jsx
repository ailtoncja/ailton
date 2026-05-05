"use client";

import { useEffect, useRef, useState } from "react";

const PROJECT_URL = toTrustedHttpsUrl("https://pitstophub.vercel.app/");

const songs = [
  { songName: "Nao Temos Medo", artistName: "Tz da Coronel", albumArt: "/black.png", audioSrc: "/track1.mp3" },
  { songName: "Mente Alem", artistName: "Tz da Coronel ft. Raflow", albumArt: "/black.png", audioSrc: "/track2.mp3" },
  { songName: "Ganancia", artistName: "Raflow ft. Tz da Coronel e Mc Rodson", albumArt: "/black.png", audioSrc: "/track3.mp3" }
];

const socialLinks = [
  { platform: "GitHub", icon: "github", handle: "ailtoncja", url: toTrustedHttpsUrl("https://github.com/ailtoncja") },
  { platform: "YouTube", icon: "youtube", handle: "@ailtoncjw", url: toTrustedHttpsUrl("https://www.youtube.com/@ailtoncjw") },
  { platform: "Twitch", icon: "twitch", handle: "ailtoncja", url: toTrustedHttpsUrl("https://www.twitch.tv/ailtoncja") },
  { platform: "Twitter/X", icon: "twitter", handle: "ailtoncjjw", url: toTrustedHttpsUrl("https://x.com/ailtoncjjw") },
  { platform: "Instagram", icon: "instagram", handle: "ailtoncjw", url: toTrustedHttpsUrl("https://www.instagram.com/ailtoncjw/") }
];

function toTrustedHttpsUrl(value) {
  const url = new URL(value);

  if (url.protocol !== "https:") {
    throw new Error(`Expected HTTPS URL, received: ${value}`);
  }

  return url.toString();
}

function Icon({ name, className = "" }) {
  const baseProps = {
    "aria-hidden": "true",
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "1em",
    height: "1em",
    focusable: "false"
  };

  switch (name) {
    case "github":
      return (
        <svg {...baseProps}>
          <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.66-.22.66-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.33 9.33 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.71 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.67.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...baseProps}>
          <path d="M21.58 7.19a2.95 2.95 0 0 0-2.08-2.1C17.67 4.6 12 4.6 12 4.6s-5.67 0-7.5.49a2.95 2.95 0 0 0-2.08 2.1A31.9 31.9 0 0 0 2 12a31.9 31.9 0 0 0 .42 4.81 2.95 2.95 0 0 0 2.08 2.1c1.83.49 7.5.49 7.5.49s5.67 0 7.5-.49a2.95 2.95 0 0 0 2.08-2.1A31.9 31.9 0 0 0 22 12a31.9 31.9 0 0 0-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
    case "twitch":
      return (
        <svg {...baseProps}>
          <path d="M4 3h16v11.2l-3.2 3.2h-3.2L10.4 20H8v-2.6H4V3Zm2 2v10.4h3.2V18l2.6-2.6h4.1l2.1-2.1V5H6Zm4.2 2.4h2v5h-2v-5Zm5 0h2v5h-2v-5Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...baseProps}>
          <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.25l-4.9-6.4L6.5 22H3.4l7.23-8.26L.8 2h6.4l4.43 5.9L18.9 2Zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...baseProps}>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.5 1.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
        </svg>
      );
    case "project":
      return (
        <svg {...baseProps}>
          <path d="M9 3H3v6h6V3Zm12 0h-6v6h6V3ZM9 15H3v6h6v-6Zm12-3h-6v3h-3V9h3V6h3v3h3v3Zm0 3h-6v6h6v-6Z" />
        </svg>
      );
    case "link":
      return (
        <svg {...baseProps}>
          <path d="M10.59 13.41a1 1 0 0 0 1.41 1.41l4.24-4.24a3 3 0 0 0-4.24-4.24L9.88 8.46a1 1 0 1 0 1.41 1.41l2.12-2.12a1 1 0 0 1 1.42 1.42L10.6 13.4ZM13.41 10.59A1 1 0 1 0 12 9.17L7.76 13.4A3 3 0 1 0 12 17.66l2.12-2.12a1 1 0 0 0-1.41-1.41l-2.12 2.12a1 1 0 0 1-1.42-1.42l4.24-4.24Z" />
        </svg>
      );
    case "external":
      return (
        <svg {...baseProps}>
          <path d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
        </svg>
      );
    case "previous":
      return (
        <svg {...baseProps}>
          <path d="M7 6h2v12H7V6Zm10.5 1.15V16.85c0 .8-.9 1.28-1.58.84L9.5 13.34a1 1 0 0 1 0-1.68l6.42-4.35c.67-.45 1.58.03 1.58.84Z" />
        </svg>
      );
    case "play":
      return (
        <svg {...baseProps}>
          <path d="M8 5.5v13l10-6.5-10-6.5Z" />
        </svg>
      );
    case "pause":
      return (
        <svg {...baseProps}>
          <path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" />
        </svg>
      );
    case "next":
      return (
        <svg {...baseProps}>
          <path d="M15 6h2v12h-2V6ZM6.5 7.15v9.7c0 .8.9 1.28 1.58.84l6.42-4.35a1 1 0 0 0 0-1.68L8.08 7.31C7.4 6.86 6.5 7.34 6.5 8.15Z" />
        </svg>
      );
    case "volume":
      return (
        <svg {...baseProps}>
          <path d="M5 9H2v6h3l4 4V5L5 9Zm8.5 3a3.5 3.5 0 0 0-2.06-3.18v6.36A3.5 3.5 0 0 0 13.5 12Zm0-7v2.06a5.5 5.5 0 0 1 0 9.88V19a7.5 7.5 0 0 0 0-14Z" />
        </svg>
      );
    case "close":
      return (
        <svg {...baseProps}>
          <path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6-5.6 5.6L5 17.6l5.6-5.6L5 6.4 6.4 5Z" />
        </svg>
      );
    case "user":
      return (
        <svg {...baseProps}>
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
        </svg>
      );
    default:
      return null;
  }
}

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [discordData, setDiscordData] = useState(null);
  const audioRef = useRef(null);

  const track = songs[trackIndex];
  const progress = duration > 0 ? (time / duration) * 100 : 0;
  const volumeProgress = Math.round(volume * 100);
  const status = discordData?.discord_status || "offline";
  const displayName = "Ailton";
  const username = "@ailtoncjw";
  const avatar = "/avatar.jpg";

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator) || typeof MediaMetadata === "undefined") {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Ailton",
      artist: username,
      album: "Ailton",
      artwork: [
        { src: avatar, sizes: "512x512", type: "image/jpeg" }
      ]
    });
  }, [avatar, username]);

  useEffect(() => {
    const fetchDiscord = async () => {
      try {
        const response = await fetch("/api/discord-status", { cache: "no-store" });
        if (!response.ok) return;
        const payload = await response.json();
        if (payload?.discord_status) {
          setDiscordData(payload);
        }
      } catch {}
    };

    fetchDiscord();
    const interval = setInterval(fetchDiscord, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.audioSrc;
    audio.load();
    setTime(0);
    setDuration(0);

    if (entered) {
      audio.play().catch(() => {});
    }
  }, [entered, track.audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (!dragging) {
        setTime(audio.currentTime);
      }
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);
    const onEnded = () => setTrackIndex((prev) => (prev + 1) % songs.length);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    setIsPaused(audio.paused);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [dragging]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  return (
    <>
      <audio id="background-music" ref={audioRef} loop preload="auto" />

      {!entered && (
        <div className="entry-page">
          <div className="entry-container">
            <div
              className="entry-sparkle-wrap"
              onClick={() => {
                setEntered(true);
                audioRef.current?.play().catch(() => {});
              }}
            >
              <p className="entry-label">{"All glory to god \u{1F64F}"}</p>
              <p className="entry-hint">Clique em cima para continuar</p>
            </div>
          </div>
        </div>
      )}

      {entered && (
        <>
          <button className={`ac2-trigger${!isPaused ? " playing" : ""}`} aria-label="Toggle player" onClick={() => setPlayerOpen((value) => !value)}>
            <div className="ac2-bars">{[0, 1, 2, 3, 4].map((bar) => <div key={bar} className="ac2-bar" />)}</div>
          </button>

          {playerOpen && (
            <div className="ac2-pill">
              <img src={track.albumArt} alt="" className="ac2-thumb" draggable={false} />
              <div className="ac2-info">
                <span className="ac2-song">{track.songName}</span>
                <span className="ac2-artist">{track.artistName}</span>
              </div>
              <div className="ac2-sep" />
              <button className="ac2-btn" onClick={() => setTrackIndex((index) => (index - 1 + songs.length) % songs.length)} aria-label="Anterior">
                <Icon name="previous" />
              </button>
              <button
                className="ac2-btn play-btn"
                onClick={() => (audioRef.current?.paused ? audioRef.current.play().catch(() => {}) : audioRef.current?.pause())}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                <Icon name={isPaused ? "play" : "pause"} />
              </button>
              <button className="ac2-btn" onClick={() => setTrackIndex((index) => (index + 1) % songs.length)} aria-label="Proxima">
                <Icon name="next" />
              </button>
              <div className="ac2-sep" />
              <div className="ac2-seek-wrap">
                <span className="ac2-time">{formatTime(time)}</span>
                <input
                  type="range"
                  className="ac2-range ac2-seek"
                  style={{ "--p": `${progress}%` }}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={time}
                  onChange={(event) => setTime(Number(event.target.value))}
                  onMouseDown={() => setDragging(true)}
                  onMouseUp={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = time;
                    }
                    setDragging(false);
                  }}
                />
                <span className="ac2-time">{formatTime(duration)}</span>
              </div>
              <div className="ac2-sep" />
              <div className="ac2-seek-wrap">
                <Icon name="volume" className="ac2-vol-ico" />
                <input
                  type="range"
                  className="ac2-range ac2-vol"
                  style={{ "--p": `${volumeProgress}%` }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  aria-label="Volume"
                />
              </div>
              <div className="ac2-sep" />
              <button className="ac2-btn close-x" onClick={() => setPlayerOpen(false)} aria-label="Fechar">
                <Icon name="close" />
              </button>
            </div>
          )}

          <div className="main-site" style={{ position: "relative", minHeight: "100vh" }}>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#000", zIndex: 1, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 24px 60px", minHeight: "100vh" }}>
                <div className="pf-page">
                  <div className="pf-header-card">
                    <div className="pf-banner pf-banner--image" style={{ backgroundImage: "url(/banner.png)", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="pf-av-section">
                      <div className="pf-av-wrap">
                        {avatar ? <img src={avatar} alt="avatar" className="pf-av" /> : <div className="pf-av-ph"><Icon name="user" /></div>}
                        <div className={`pf-dot ${status}`} />
                      </div>
                      <div className="pf-name-block">
                        <h1 className="pf-display-name">{displayName}</h1>
                        <p className="pf-username">{username}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div className="pf-card">
                      <p className="pf-card-title"><Icon name="link" /> Conexoes</p>
                      <div className="pf-connect-grid">
                        {socialLinks.map((link) => (
                          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="pf-connect-item">
                            <div className="pf-connect-left">
                              <div className="pf-connect-icon"><Icon name={link.icon} /></div>
                              <div className="pf-connect-texts">
                                <span className="pf-connect-name">{link.platform}</span>
                                <span className="pf-connect-handle">{link.handle}</span>
                              </div>
                            </div>
                            <Icon name="external" className="pf-connect-arrow" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div className="pf-card pf-project-card">
                      <p className="pf-card-title"><Icon name="project" /> Projeto em destaque</p>
                      <div className="pf-project-wrap">
                        <div className="pf-project-shot-wrap">
                          <img src="/project-pitstophub.jpg" alt="Preview do projeto PitStopHub" className="pf-project-shot" />
                        </div>
                        <div className="pf-project-info">
                          <p className="pf-project-name">PitStopHub</p>
                          <p className="pf-project-desc">Plataforma focada em automobilismo e comunidade, com visual moderno e navegacao rapida.</p>
                          <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer" className="pf-project-btn">
                            <Icon name="external" /> Abrir projeto
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
