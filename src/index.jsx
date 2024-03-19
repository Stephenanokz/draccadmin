import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { PostContextProvider } from "./context/postContext/PostContext";
import { ServiceContextProvider } from "./context/serviceContext/ServiceContext";
import { GalleryImageContextProvider } from "./context/galleryImageContext/GalleryImageContext";
import { CarouselImageContextProvider } from "./context/carouselImageContext/CarouselImageContext";
import { RoomContextProvider } from "./context/roomContext/RoomContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <ServiceContextProvider>
          <GalleryImageContextProvider>
            <CarouselImageContextProvider>
              <RoomContextProvider>
                <App />
              </RoomContextProvider>
            </CarouselImageContextProvider>
          </GalleryImageContextProvider>
        </ServiceContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
