import "../global.css";
import { createRoot } from "react-dom/client";
import { ThemeWrapper } from "@/components/ThemeProvider";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import { Navigation } from "./Navigation";
import { LocalPages } from "./pages/local/Local";
import { ScriptPage } from "./pages/editor/ScriptPage";

document.body.innerHTML = `<div id="root" class="flex flex-col"></div>`;

// Render your React component instead
const root = createRoot(document.querySelector("#root")!);

const router = createHashRouter([
  {
    path: "/",
    loader: () => redirect("/scripts/browser"),
  },
  {
    path: "/scripts",
    element: <LocalPages pageId="browser" />,
    children: [
      {
        path: "browser",
        element: <LocalPages pageId="browser" />,
      },
      {
        path: "recycle",
        element: <LocalPages pageId="recycle" />,
      },
    ],
  },
  {
    path: "settings",
    element: <LocalPages pageId="settings" />,
  },
  {
    path: "about",
    element: <LocalPages pageId="about" />,
  },
  {
    path: "/editor",
    element: <ScriptPage pageId="main-script" />,
    children: [
      {
        path: "browser",
        element: <LocalPages pageId="main-script" />,
      },
    ],
  },
]);
root.render(
  <ThemeWrapper>
    <Navigation />
    <RouterProvider router={router} />
  </ThemeWrapper>
);
