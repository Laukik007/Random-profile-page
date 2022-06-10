import React from "react";

const Title = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "10vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "92vw",
          height: "8vh",
          backgroundColor: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          borderRadius: "12px",
        }}
      >
        Random user Generator
      </div>
    </div>
  );
};

export default Title;
