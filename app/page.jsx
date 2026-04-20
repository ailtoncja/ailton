"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DISCORD_USER_ID = "862901280653574205";
const PROJECT_URL = "https://pitstophub.netlify.app/";

const songs = [
  { songName: "Não Temos Medo", artistName: "Tz da Coronel", albumArt: "/black.png", audioSrc: "/track1.mp3" },
  { songName: "Mente Além", artistName: "Tz da Coronel ft. Raflow", albumArt: "/black.png", audioSrc: "/track2.mp3" },
  { songName: "Ganância", artistName: "Raflow ft. Tz da Coronel e Mc Rodson", albumArt: "/black.png", audioSrc: "/track3.mp3" }
];

const socialLinks = [
  { platform: "GitHub", icon: "fab fa-github", handle: "ailtoncja", url: "https://github.com/ailtoncja" },
  { platform: "YouTube", icon: "fab fa-youtube", handle: "@ailtoncjw", url: "https://www.youtube.com/@ailtoncjw" },
  { platform: "Twitch", icon: "fab fa-twitch", handle: "ailtoncja", url: "https://www.twitch.tv/ailtoncja" },
  { platform: "Twitter/X", icon: "fab fa-twitter", handle: "ailtoncjjw", url: "https://x.com/ailtoncjjw" },
  { platform: "Instagram", icon: "fab fa-instagram", handle: "ailtoncjw", url: "https://www.instagram.com/ailtoncjw/" }
];



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

  useEffect(() => {
    const phrase = "Ailton";
    let charIndex = 1;
    let isDeleting = false;
    const typeSpeed = 350;
    const deleteSpeed = 350;
    const pauseAfterType = 2500;
    const pauseAfterDelete = 900;
    let t;

    function tick() {
      document.title = phrase.slice(0, charIndex);
      if (!isDeleting) {
        if (charIndex < phrase.length) {
          charIndex += 1;
          t = setTimeout(tick, typeSpeed);
        } else {
          isDeleting = true;
          t = setTimeout(tick, pauseAfterType);
        }
      } else if (charIndex > 1) {
        charIndex -= 1;
        t = setTimeout(tick, deleteSpeed);
      } else {
        isDeleting = false;
        t = setTimeout(tick, pauseAfterDelete);
      }
    }

    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchDiscord = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.success && data?.data) {
          setDiscordData(data.data);
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
  }, [trackIndex, entered, track.audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (!dragging) setTime(audio.currentTime);
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

  const avatar = useMemo(() => "/avatar.jpg", []);

  const status = discordData?.discord_status || "offline";
  const displayName = "Ailton";
  const username = "@ailtoncjw";


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
            </div>
          </div>
        </div>
      )}

      {entered && (
        <>
          <button className={`ac2-trigger${!isPaused ? " playing" : ""}`} aria-label="Toggle player" onClick={() => setPlayerOpen((v) => !v)}>
            <div className="ac2-bars">{[0, 1, 2, 3, 4].map((n) => <div key={n} className="ac2-bar" />)}</div>
          </button>

          {playerOpen && (
            <div className="ac2-pill">
              <img src={track.albumArt} alt="" className="ac2-thumb" draggable={false} />
              <div className="ac2-info">
                <span className="ac2-song">{track.songName}</span>
                <span className="ac2-artist">{track.artistName}</span>
              </div>
              <div className="ac2-sep" />
              <button className="ac2-btn" onClick={() => setTrackIndex((i) => (i - 1 + songs.length) % songs.length)} aria-label="Anterior"><i className="fas fa-step-backward" /></button>
              <button className="ac2-btn play-btn" onClick={() => (audioRef.current?.paused ? audioRef.current.play().catch(() => {}) : audioRef.current?.pause())} aria-label={isPaused ? "Play" : "Pause"}>
                <i className={`fas ${isPaused ? "fa-play" : "fa-pause"}`} />
              </button>
              <button className="ac2-btn" onClick={() => setTrackIndex((i) => (i + 1) % songs.length)} aria-label="Próxima"><i className="fas fa-step-forward" /></button>
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
                  onChange={(e) => setTime(Number(e.target.value))}
                  onMouseDown={() => setDragging(true)}
                  onMouseUp={() => {
                    if (audioRef.current) audioRef.current.currentTime = time;
                    setDragging(false);
                  }}
                />
                <span className="ac2-time">{formatTime(duration)}</span>
              </div>
              <div className="ac2-sep" />
              <div className="ac2-seek-wrap">
                <i className="fas fa-volume-up ac2-vol-ico" />
                <input
                  type="range"
                  className="ac2-range ac2-vol"
                  style={{ "--p": `${volumeProgress}%` }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                />
              </div>
              <div className="ac2-sep" />
              <button className="ac2-btn close-x" onClick={() => setPlayerOpen(false)} aria-label="Fechar"><i className="fas fa-times" /></button>
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
                        {avatar ? <img src={avatar} alt="avatar" className="pf-av" /> : <div className="pf-av-ph"><i className="fas fa-user" /></div>}
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
                      <p className="pf-card-title"><i className="fas fa-link" /> Conexões</p>
                      <div className="pf-connect-grid">
                        {socialLinks.map((link) => (
                          <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="pf-connect-item">
                            <div className="pf-connect-left">
                              <div className="pf-connect-icon"><i className={link.icon} /></div>
                              <div className="pf-connect-texts">
                                <span className="pf-connect-name">{link.platform}</span>
                                <span className="pf-connect-handle">{link.handle}</span>
                              </div>
                            </div>
                            <i className="fas fa-arrow-up-right-from-square pf-connect-arrow" />
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div className="pf-card pf-project-card">
                      <p className="pf-card-title"><i className="fas fa-diagram-project" /> Projeto em destaque</p>
                      <div className="pf-project-wrap">
                        <div className="pf-project-shot-wrap">
                          <img src="/project-pitstophub.jpg" alt="Preview do projeto PitStopHub" className="pf-project-shot" />
                        </div>
                        <div className="pf-project-info">
                          <p className="pf-project-name">PitStopHub</p>
                          <p className="pf-project-desc">Plataforma focada em automobilismo e comunidade, com visual moderno e navegação rápida.</p>
                          <a href={PROJECT_URL} target="_blank" rel="noreferrer" className="pf-project-btn">
                            <i className="fas fa-arrow-up-right-from-square" /> Abrir projeto
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

