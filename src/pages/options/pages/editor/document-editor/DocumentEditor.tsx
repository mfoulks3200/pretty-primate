import { Userscript } from "@/src/common/Userscript";
import { MonacoComponent } from "./MonacoComponent";

export const DocumentEditor = ({
  userscript,
  fileUuid,
  dirtyContent,
  onChange,
}: {
  userscript: Userscript;
  fileUuid: string;
  dirtyContent?: string;
  onChange: (content: string) => void;
}) => {
  const file = userscript.files.find((file) => file.uuid === fileUuid)!;
  return (
    <MonacoComponent
      defaultContent={dirtyContent ?? file.content}
      language={file.type}
      onChange={onChange}
    />
  );
};
