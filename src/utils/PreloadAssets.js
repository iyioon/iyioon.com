/* -------------------------------------------------------------------------------- */
// This component is used to preload all assets (images and videos) in the
// defined directories. The assets are stored as a component.
// Make sure to add the directories where the assets are stored below.
/* -------------------------------------------------------------------------------- */

const importAll = (r) => {
  return r.keys().map((key) => ({ key: key.replace("./", ""), url: r(key) }));
};

const homeAssets = importAll(
  require.context("../pages/home/assets", false, /\.(png|jpe?g|svg|mp4)$/)
);

// Add more assets from other directories as needed

const allAssets = [...homeAssets];

const PreloadAssets = async (onProgress) => {
  const isDevMode = false;
  let loadedAssets = 0;
  let accumulatedSize = 0;
  const assetsMap = {};

  try {
    // Load all assets in parallel
    await Promise.all(
      allAssets.map(async ({ key, url }) => {
        const { blobUrl, size } = await loadAssetWithFetch(key, url, 3);

        if (blobUrl) {
          loadedAssets++;
          accumulatedSize += size;

          // Calculate and report progress
          const currentProgress = (loadedAssets / allAssets.length) * 100;
          onProgress?.(currentProgress);

          // Create appropriate element based on file type
          if (url.endsWith(".mp4")) {
            assetsMap[key] = (
              <video key={key} src={blobUrl} autoPlay playsInline />
            );
          } else if (url.endsWith(".mp3")) {
            assetsMap[key] = <audio key={key} src={blobUrl} controls />;
          } else {
            assetsMap[key] = <img key={key} src={blobUrl} alt="" />;
          }

          isDevMode &&
            console.log(
              `Loaded Asset: ${key} | Size: ${formatBytes(size)} | Progress: ${(
                (loadedAssets / allAssets.length) *
                100
              ).toFixed(2)}%`
            );
        }
      })
    );

    isDevMode &&
      console.log(
        `Total size of assets loaded: ${formatBytes(accumulatedSize)}`
      );

    return {
      isLoading: false,
      assets: assetsMap,
      totalSize: accumulatedSize,
    };
  } catch (error) {
    console.error("Error loading assets:", error);
    return {
      isLoading: false,
      assets: {},
      totalSize: 0,
      error,
    };
  }
};

export default PreloadAssets;

// Helper function to load an asset with Fetch API and retries
async function loadAssetWithFetch(key, url, maxAttempts = 3) {
  let attempts = 0;
  let response;

  while (attempts < maxAttempts) {
    try {
      response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const size = blob.size; // Get the size of the blob
      const blobUrl = URL.createObjectURL(blob);
      return { blobUrl, size }; // Return both the blob URL and its size
    } catch (error) {
      attempts++;
      console.error(
        `Attempt ${attempts} failed for: ${key} (${url}) - ${error.message}`
      );
      if (attempts >= maxAttempts) {
        throw new Error(`Failed to load ${key} after ${maxAttempts} attempts`);
      }
    }
  }
}

// Helper function to format bytes as human-readable text
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
