import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreloadAssets from "./utils/PreloadAssets";
import Mouse from "./components/mouse/Mouse";
import ScrollIndicator from "./components/scrollIndicator/ScrollIndicator";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import IyioonBGDark from "./components/iyioonBG/IyioonBGDark";

import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Archive from "./pages/projects/project_archive/Project_archive";
import About from "./pages/about/About";

function AppContent() {
  const [assets, setAssets] = useState({});
  const [isAssetsloading, setIsAssetsLoading] = useState(true);
  const [assetLoadProgress, setAssetLoadProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isLoadingDisappearing, setIsLoadingDisappearing] = useState(false);

  // Preload assets
  useEffect(() => {
    const loadAssets = async () => {
      const result = await PreloadAssets((progress) => {
        setAssetLoadProgress(progress);
        console.log(progress);
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
        {/* <div className="loadingProgress">{assetLoadProgress.toFixed(2)}%</div> */}
        <div className="loadingBottomText">
          <p>LOADING... {assetLoadProgress.toFixed(2)}%</p>
          <p>MOON JI HOON - PORTFOLIO</p>
        </div>
        <IyioonBGDark brightness={assetLoadProgress} />
        <Mouse />
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
          <Route
            path="/projects/archive"
            element={<Archive assets={assets} />}
          />
          <Route path="/about" element={<About assets={assets} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ScrollIndicator />
      <Mouse />
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
