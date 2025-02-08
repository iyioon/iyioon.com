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
import Archive from "./pages/projects/project_archive/Project_archive";
import About from "./pages/about/About";
import { GlobalProvider, useGlobal } from "./utils/globalContext";

const navitems = [
  {
    name: "Projects",
    link: "/projectsz",
    subnav: [
      {
        name: "Archive",
        link: "/projects/archive",
      },
      {
        name: "Design",
        link: "/projects/aesign",
      },
      {
        name: "Desktop",
        link: "/projects/aesktop",
      },
    ],
  },
  {
    name: "Research",
    link: "/research",
    subnav: [
      {
        name: "Artificial Intelligence",
        link: "/research/ai",
      },
    ],
  },
  {
    name: "About",
    link: "/about",
  },
];

function AppContent() {
  const [assets, setAssets] = useState({});
  const [isAssetsloading, setIsAssetsLoading] = useState(true);
  const [assetLoadProgress, setAssetLoadProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isLoadingDisappearing, setIsLoadingDisappearing] = useState(false);

  // Global context setup
  const { register } = useGlobal();
  useEffect(() => {
    register("assets", assets);
  }, [assets]);

  // Preload assets
  useEffect(() => {
    const loadAssets = async () => {
      const result = await PreloadAssets((progress: number) => {
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
    <div className={`App`}>
      <Navbar navitems={navitems} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/projects/archive" element={<Archive />} />
          <Route path="/about" element={<About />} />
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
    <GlobalProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalProvider>
  );
}

export default App;
