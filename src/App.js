import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Projects from "./pages/projects/Projects";
import About from "./pages/about/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreloadAssets from "./utils/PreloadAssets";
import { useLocation } from "react-router-dom";

function AppContent() {
  const [assets, setAssets] = useState({});
  const [isAssetsloading, setIsAssetsLoading] = useState(true);
  const [assetLoadProgress, setAssetLoadProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isLoadingDisappearing, setIsLoadingDisappearing] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const location = useLocation();

  // Scroll percentage of the content
  useEffect(() => {
    const content = document.querySelector(".content");

    if (content) {
      const handleScroll = () => {
        const scrollTop = content.scrollTop;
        const viewportHeight = content.clientHeight;
        const totalHeight = content.scrollHeight;

        // Calculate percentage based on how much of the bottom is visible
        const scrollBottom = scrollTop + viewportHeight;
        const percentage = (scrollBottom / totalHeight) * 100;

        // Clamp between 0-100
        setScrollPercentage(Math.min(100, Math.max(0, Math.round(percentage))));
      };

      content.addEventListener("scroll", handleScroll);
      // Initial calculation
      handleScroll();

      return () => content.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname, showLoadingScreen]);

  const scrollToTop = () => {
    const content = document.querySelector(".content");
    if (content) {
      content.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Preload assets
  useEffect(() => {
    const loadAssets = async () => {
      const result = await PreloadAssets((progress) => {
        setAssetLoadProgress(progress);
      });
      setAssets(result.assets);
      setIsAssetsLoading(result.isLoading);
    };
    loadAssets();
  }, []);

  // Add delay after assets are loaded
  useEffect(() => {
    if (!isAssetsloading) {
      setTimeout(() => {
        setIsLoadingDisappearing(true);
        // Wait for loading screen animation to finish
        setTimeout(() => {
          setShowLoadingScreen(false);
        }, 500);
      }, 1000);
    }
  }, [isAssetsloading]);

  // Show loading screen while assets are loading + delay
  if (showLoadingScreen) {
    return (
      <div className={`loading ${isLoadingDisappearing ? "loading-hide" : ``}`}>
        <div className="loadingProgress">{assetLoadProgress.toFixed(2)}%</div>
        <div className="loadingBottomText">
          <p>LOADING...</p>
          <p>MOON JI HOON - PORTFOLIO</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home assets={assets} />} />
          <Route path="/projects" element={<Projects assets={assets} />} />
          <Route path="/about" element={<About assets={assets} />} />
        </Routes>
      </div>
      <div className="scroll-indicator" onClick={scrollToTop}>
        {scrollPercentage}%
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
