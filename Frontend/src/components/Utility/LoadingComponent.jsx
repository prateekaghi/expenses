import { Box, Paper } from "@mui/material";
import React from "react";

export default function LoadingComponent({
  type = "spinner",
  size = "medium",
  color = "#3b82f6",
  text = "",
}) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  };

  const currentSize = sizeMap[size];

  const textStyle = {
    color: color,
    fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : "18px",
    fontWeight: "500",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const renderSpinner = () => (
    <div
      style={{
        width: currentSize,
        height: currentSize,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );

  const renderDots = () => (
    <div style={{ display: "flex", gap: "4px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: currentSize / 4,
            height: currentSize / 4,
            backgroundColor: color,
            borderRadius: "50%",
            animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      style={{
        width: currentSize,
        height: currentSize,
        backgroundColor: color,
        borderRadius: "50%",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  );

  const renderBars = () => (
    <div style={{ display: "flex", gap: "3px", alignItems: "end" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: currentSize / 8,
            height: currentSize / 2,
            backgroundColor: color,
            borderRadius: "2px",
            animation: `bars 1.2s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "bars":
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes bars {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>

      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "20px",
        }}
      >
        {renderLoader()}
        {text && <span style={textStyle}>{text}</span>}
      </Paper>
    </>
  );
}
