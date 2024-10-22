import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import { MonacoThemes } from "@/src/pages/common/MonacoThemes";
import { SettingsManager } from "@/src/common/Settings";

for (const MonacoTheme of MonacoThemes) {
  monaco.editor.defineTheme(MonacoTheme.id, MonacoTheme.data as any);
}
monaco.editor.setTheme(
  (SettingsManager.getSettingValue("monacoThemeName") as string)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/gm, "-")
);

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === "json") {
      return "/monaco/json.worker/bundle.js";
    }
    if (label === "css" || label === "scss" || label === "less") {
      return "/monaco/css.worker/bundle.js";
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return "/monaco/html.worker/bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "/monaco/ts.worker/bundle.js";
    }
    return "/monaco/editor.worker/bundle.js";
  },
};

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2015,
  allowNonTsExtensions: true,
});

export const MonacoComponent = ({
  defaultContent,
  language,
  onChange,
}: {
  defaultContent: string;
  language: string;
  onChange: (content: string) => void;
}) => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: defaultContent,
        language: language.toLowerCase(),
      });
    }

    let resizeObserver = new ResizeObserver(() => {
      editor.layout();
    });

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    resizeObserver.observe(divEl.current!);
    return () => {
      editor.dispose();
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className="Editor w-full h-full min-w-96 basis-full" ref={divEl}></div>
  );
};
