import React, { useEffect, useRef, useState } from "react";

function GlowingCircle() {
  const canvasRef = useRef<any>("");
  const [opacity, setOpacity] = useState<any>(1);

  var animationId: any;
  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas.getContext("2d");
    const animateCircle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();

      // Animate the circle's opacity

      setOpacity(opacity - 0.001);
      if (opacity > 0) {
        animationId = requestAnimationFrame(animateCircle);
      }
    };

    animateCircle();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [opacity]);

  return (
    <>
      <div ref={canvasRef} />
      <button>click</button>
    </>
  );
}

export default GlowingCircle;
