import { useEffect, useRef } from "react";

const MusicPulseAnimation: any = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | any>();
  //   let [play, setPlay] = useState<any>(props.play);
  let animationId: number;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx: any = canvas.getContext("2d" as any);

    const bars: {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
    }[] = [];

    // Set up the bars
    Math.floor(Math.random() * 16777215).toString(16);
    for (let i = 0; i < 6; i++) {
      bars.push({
        x: i * 15,
        y: 0,
        width: 10,
        height: Math.random() * 10,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }

    // Animate the bars
    const animateBars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bars.forEach((bar) => {
        ctx.fillStyle = bar.color;
        ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
        bar.height = Math.random() * 100;
        bar.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        bar.y = canvas.height - Math.floor(Math.random() * 30);
      });

      animationId = requestAnimationFrame(animateBars);
    };

    // Start or stop the animation when the play/pause button is clicked

    props.data.play && animateBars();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [props.data.play]);

  return (
    <>
      <canvas ref={canvasRef} width={100} height={50} />
    </>
  );
};

export default MusicPulseAnimation;
