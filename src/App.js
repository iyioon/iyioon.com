import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Projects from "./pages/projects/Projects";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreloadAssets from "./utils/PreloadAssets";

function App() {
  const [assets, setAssets] = useState({});
  const [isAssetsloading, setIsAssetsLoading] = useState(true);
  const [assetLoadProgress, setAssetLoadProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

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
        setShowLoadingScreen(false);
      }, 1000);
    }
  }, [isAssetsloading]);

  // Show loading screen while assets are loading + delay
  if (showLoadingScreen) {
    return (
      <div className="loading">
        <h1>iyioon</h1>
        <h3>{assetLoadProgress.toFixed(2)}%</h3>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home assets={assets} />} />
            <Route path="/projects" element={<Projects assets={assets} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
