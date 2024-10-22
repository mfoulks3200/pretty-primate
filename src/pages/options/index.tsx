import "../global.css";
import { createRoot } from "react-dom/client";
import { ThemeWrapper } from "@/src/components/ThemeProvider";
import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import { Navigation } from "./Navigation";
import { LocalPages } from "./pages/local/Local";
import { ScriptPage } from "./pages/editor/ScriptPage";
import { UserscriptManager } from "@/src/common/Userscript";

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
    path: "/editor/:uuid",
    element: <ScriptPage pageId="file-editor" />,
    loader: ({ params }) => {
      return UserscriptManager.getUserscript(params.uuid!)!;
    },
    children: [
      {
        path: "file/:fileUuid",
        element: <ScriptPage pageId="file-editor" />,
      },
      {
        path: "settings",
        element: <ScriptPage pageId="settings" />,
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
