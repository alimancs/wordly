import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Register the service worker for offline capabilities
if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
                try {
                        await navigator.serviceWorker.register("/serviceworker.js");
                        console.log("Sevice worker registration success");
                } catch (error) {
                        console.log("Service worker registration failed:", error);
                }
        })
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <App/>
)