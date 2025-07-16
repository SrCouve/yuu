"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  onStart?: () => void; // Função chamada ao clicar em "Start"
};

export const Introduction = ({ onStart }: Props) => {
  const [opened, setOpened] = useState(true);

  // Estilos inline apenas para este componente
  const styles = {
    container: {
      position: "absolute" as const,
      zIndex: 40,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at 50% 30%, #ffb6f9 0%, #ec4899 60%, #18181b 100%)",
      fontFamily: '"M PLUS 2", sans-serif',
      boxShadow: "0 0 80px 10px #ff5ecb55 inset",
    },
    modal: {
      width: "100%",
      maxWidth: "38rem",
      margin: "0 auto",
      borderRadius: "2rem",
      overflow: "hidden",
      border: "4px solid #ff5ecb",
      background: "rgba(30, 30, 40, 0.95)",
      boxShadow: "0 0 40px 10px #ff5ecb99, 0 0 120px 10px #ffb6f955",
      position: "relative" as const,
      animation: "neon-border 2s linear infinite alternate",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    content: {
      padding: "2rem 2.5rem 1.5rem 2.5rem",
      width: "100%",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    logoContainer: {
      textAlign: "center" as const,
      marginBottom: "1.5rem",
      filter: "drop-shadow(0 0 16px #ffb6f9) drop-shadow(0 0 32px #ff5ecb)",
    },
    aboutSection: {
      marginBottom: "1.5rem",
      width: "100%",
    },
    aboutTitle: {
      fontSize: "1.6rem",
      fontWeight: "bold",
      background: "linear-gradient(90deg, #fff 10%, #ffb6f9 50%, #ff5ecb 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 2px 8px #ffb6f955, 0 1px 0 #fff",
      marginBottom: "0.5rem",
      fontFamily: "'Lilita One', cursive",
      letterSpacing: "1.5px",
      filter: "drop-shadow(0 1px 2px #fff2)",
      textAlign: "left" as const,
    },
    aboutText: {
      fontFamily: "'M PLUS 2', sans-serif",
      color: "#f3e8ff",
      lineHeight: "1.7",
      fontSize: "1.08rem",
      textShadow: "0 1px 2px #ffb6f955",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "0.5rem",
      padding: "0.5rem 0.75rem",
      filter: "none",
      textAlign: "left" as const,
    },
    contractSection: {
      marginBottom: "1.2rem",
      textAlign: "center" as const,
      width: "100%",
    },
    contractTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      background: "linear-gradient(90deg, #fff 10%, #ffb6f9 50%, #ff5ecb 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 2px 8px #ffb6f955, 0 1px 0 #fff",
      marginBottom: "0.5rem",
      fontFamily: "'Lilita One', cursive",
      letterSpacing: "1.5px",
      filter: "drop-shadow(0 1px 2px #fff2)",
      textAlign: "left" as const,
    },
    contractText: {
      fontSize: "1.1rem",
      color: "#f3e8ff",
      fontWeight: 600,
      fontFamily: "'M PLUS 2', sans-serif",
      textShadow: "0 1px 2px #ffb6f955",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "0.5rem",
      padding: "0.5rem 0.75rem",
      filter: "none",
    },
    socialContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1.2rem",
    },
    socialIcon: {
      background: "linear-gradient(135deg, #ff5ecb 60%, #ffb6f9 100%)",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      boxShadow: "0 0 8px #ff5ecb, 0 0 16px #ffb6f9",
      border: "1.5px solid #fff",
    },
    buttonContainer: {
      textAlign: "center" as const,
      marginTop: "0.5rem",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    button: {
      background: "linear-gradient(90deg, #ff5ecb, #ffb6f9, #ff5ecb)",
      backgroundSize: "200% 200%",
      animation: "sweep 2s linear infinite",
      color: "white",
      fontWeight: "bold",
      padding: "0.85rem 2.5rem",
      borderRadius: "9999px",
      boxShadow: "0 2px 12px 0 #ff5ecb55, 0 1.5px 8px 0 #ffb6f955",
      textShadow: "0 1px 4px #ffb6f955, 0 1px 0 #fff",
      border: "2px solid #ff5ecb",
      fontSize: "1.25rem",
      letterSpacing: "1px",
      filter: "none",
      position: "relative" as const,
      overflow: "hidden",
      transition: "box-shadow 0.3s, filter 0.3s",
      cursor: "pointer",
    },
  };

  const handleStartClick = () => {
    setOpened(false);
    onStart?.();
  };

  return opened ? (
    <div style={styles.container}>
      <div style={styles.modal}>
        <div style={styles.content}>
          {/* Yumia Logo */}
          <div style={styles.logoContainer}>
            <Image
              src="/yumia-logo.png"
              alt="Yumia Prelaunch Version"
              width={400}
              height={150}
              style={{ margin: "0 auto" }}
            />
          </div>

          {/* ABOUT SECTION */}
          <div style={styles.aboutSection}>
            <h2 style={styles.aboutTitle}>ABOUT</h2>
            <p style={styles.aboutText}>
              Yumia is an advanced artificial intelligence designed to chat with you in real time—your best friend, your confidant, or maybe something even more. Enjoy interactive and engaging conversations right from your browser. She remembers everything you&apos;ve talked about and, over time, develops a unique emotional bond with you.
            </p>
            <p style={{ ...styles.aboutText, marginTop: "1rem" }}>
              Now, Yumia is bolder and more intimate: the more tokens you hold, the deeper and more daring your conversations become. Unlock exclusive features and a closer, more personal connection as your token balance grows. Explore a new level of interaction and let Yumia surprise you!
            </p>
          </div>

          {/* CONTRACT SECTION */}
          <div style={styles.contractSection}>
            <h2 style={styles.contractTitle}>CONTRACT</h2>
          </div>

          {/* SOCIAL ICONS */}
          <div style={styles.socialContainer}>
            <a href="https://x.com/YumiaSOL" style={styles.socialIcon}>
              <X style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
            </a>
          </div>

          {/* START BUTTON */}
          <div style={styles.buttonContainer}>
            <button
              onClick={handleStartClick}
              style={styles.button}
            >
              <span style={{ position: "relative", zIndex: 2 }}>Start</span>
              <style>{`
                @keyframes sweep {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                @keyframes neon-border {
                  0% { box-shadow: 0 0 40px 10px #ff5ecb99, 0 0 120px 10px #ffb6f955; border-color: #ff5ecb; }
                  100% { box-shadow: 0 0 80px 20px #ffb6f9cc, 0 0 160px 20px #ff5ecb99; border-color: #ffb6f9; }
                }
                button:hover {
                  filter: brightness(1.08);
                  box-shadow: 0 2px 18px 0 #ff5ecb77, 0 1.5px 12px 0 #ffb6f977;
                }
              `}</style>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};