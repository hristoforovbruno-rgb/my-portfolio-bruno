import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background:
            "radial-gradient(circle at 50% 24%, rgba(212,175,55,0.55), rgba(23,19,10,1) 60%, rgba(5,5,5,1) 100%)",
          color: "#f0d985",
          fontSize: 58,
          fontFamily: "Georgia",
          fontWeight: 700,
          letterSpacing: "-0.08em",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 16,
            borderRadius: 30,
            border: "2px solid rgba(212,175,55,0.45)",
          }}
        />
        BH
      </div>
    ),
    size,
  );
}
