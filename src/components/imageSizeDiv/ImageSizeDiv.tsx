import { useEffect, useRef, useState } from "react";
import React from "react";

type ImageSizeDivProps = {
  imgw?: number;
  imgh?: number;
  contain?: boolean;
  children?: React.ReactNode;
};

const ImageSizeDiv: React.FC<ImageSizeDivProps> = ({
  imgw = 1920,
  imgh = 1080,
  contain = false,
  children,
}) => {
  const [divStyle, setDivStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Changed from offsetWidth to clientWidth
        const vw100 = containerRef.current.clientWidth;
        const vh100 = containerRef.current.clientHeight;

        const bgw = imgw;
        const bgh = imgh;

        let bgscale;
        if (contain) {
          bgscale = Math.min(vh100 / bgh, vw100 / bgw);
        } else {
          bgscale = Math.max(vh100 / bgh, vw100 / bgw);
        }

        const projectedWidth = Math.floor(bgw * bgscale);
        const projectedHeight = Math.floor(bgh * bgscale);

        const leftOverflow = Math.floor((projectedWidth - vw100) / 2);
        const topOverflow = Math.floor((projectedHeight - vh100) / 2);

        // Calculate font size purely based on div's width or height
        const fontSize = (projectedWidth / imgw) * 16; // Base font size at 16px for imgw width

        setDivStyle({
          width: `${projectedWidth}px`,
          height: `${projectedHeight}px`,
          position: "relative",
          top: contain
            ? `${(vh100 - projectedHeight) / 2}px`
            : `-${topOverflow}px`,
          left: contain
            ? `${(vw100 - projectedWidth) / 2}px`
            : `-${leftOverflow}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: `${fontSize}px`,
          // border: "5px solid blue", // For debugging
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imgw, imgh, contain]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      ref={containerRef}
    >
      <div style={divStyle}>{children}</div>
    </div>
  );
};

export default ImageSizeDiv;
