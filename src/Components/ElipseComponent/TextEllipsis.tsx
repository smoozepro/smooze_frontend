import React, { useRef, useEffect } from 'react';

interface Props {
  text: string;
}

const TextEllipsis: React.FC<Props> = ({ text }) => {
  const ellipsisTextRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ellipsisText = ellipsisTextRef.current;
    const container = containerRef.current;

    if (!ellipsisText || !container) {
      return;
    }

    ellipsisText.style.width = `${ellipsisText.offsetWidth}px`;
    container.style.width = `${ellipsisText.offsetWidth}px`;
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <p className="ellipsis-text" ref={ellipsisTextRef}>
        {text}
      </p>
      <style>{`
        .container {
         height: 20px;
          overflow: hidden;
          position: relative;
        }

        .ellipsis-text {
          animation: scrolling-text 10s linear infinite;
          position: absolute;
          white-space: nowrap;
        }

        @keyframes scrolling-text {
          from {
            transform: translateX(70%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default TextEllipsis;
