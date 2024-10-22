import { Input } from "@/src/components/ui/input";
import {
  Userscript,
  UserscriptFile,
  UserscriptFileType,
  UserscriptManager,
} from "@/src/common/Userscript";
import { capitalizeFirstLetter } from "@/src/common/Util";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  IconButton,
  IconButtonConfirmation,
} from "@/src/pages/common/IconButton";
import {
  Braces,
  Copy,
  Hammer,
  LayoutPanelTop,
  LucideProps,
  Pencil,
  Plus,
  Trash2,
  Workflow,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

export const FilesPanel = ({ userscript }: { userscript: Userscript }) => {
  const [files, setFiles] = useState<UserscriptFile[]>(userscript.files);

  const createFile = (fileType: UserscriptFileType) => {
    UserscriptManager.createFile(userscript, "New File", fileType);
    setFiles([...userscript.files]);
  };

  const deleteFile = (uuid: string) => {
    UserscriptManager.deleteFile(userscript, uuid);
    setFiles([...userscript.files]);
  };

  const updateFilename = (uuid: string, newFile: UserscriptFile) => {
    UserscriptManager.updateFile(userscript, uuid, newFile);
    setFiles([...userscript.files]);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"w-4"}>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className={"w-40"}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <FileField
              key={index}
              fileObj={file}
              onDelete={() => deleteFile(file.uuid)}
              onUpdate={(target) => updateFilename(file.uuid, target)}
            />
          ))}
        </TableBody>
      </Table>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className={"w-full"}>
            <Plus />
            Add File
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className={"flex gap-2 items-center"}>
              <Workflow size={14} absoluteStrokeWidth />
              <span>Script</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => createFile("javascript")}>
            Javascript File
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => createFile("typescript")}>
            Typescript File
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <div className={"flex gap-2 items-center"}>
              <LayoutPanelTop size={14} absoluteStrokeWidth />
              <span>Styling & Structure</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => createFile("css")}>
            CSS File
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => createFile("html")}>
            HTML File
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <div className={"flex gap-2 items-center"}>
              <Braces size={14} absoluteStrokeWidth />
              <span>Data</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => createFile("json")}>
            JSON File
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <div className={"flex gap-2 items-center"}>
              <Hammer size={14} absoluteStrokeWidth />
              <span>Other</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => createFile("component")}>
            GUI Component
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const IconTooltip = ({
  icon: Icon,
  tooltip,
}: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  tooltip: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icon absoluteStrokeWidth />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const filetypeIcons = {
  javascript: <IconTooltip icon={Workflow} tooltip={"Javascript File"} />,
  typescript: <IconTooltip icon={Workflow} tooltip={"Typescript File"} />,
  css: <IconTooltip icon={LayoutPanelTop} tooltip={"CSS"} />,
  html: <IconTooltip icon={LayoutPanelTop} tooltip={"HTML"} />,
  json: <IconTooltip icon={Braces} tooltip={"JSON"} />,
  component: <IconTooltip icon={Hammer} tooltip={"Component"} />,
};

const FileField = ({
  fileObj,
  onDelete,
  onUpdate,
}: {
  fileObj: UserscriptFile;
  onDelete: () => void;
  onUpdate: (target: UserscriptFile) => void;
}) => {
  const [filename, setFilename] = useState(fileObj.name);

  const onUpdateFilename = (newName: string) => {
    setFilename(newName);
    onUpdate({ ...fileObj, name: newName });
  };

  return (
    <TableRow>
      <TableCell className={"h-full flex items-center justify-center"}>
        {filetypeIcons[fileObj.type]}
      </TableCell>
      <TableCell>
        <Input
          placeholder={"File Name"}
          value={filename}
          onChange={(e) => onUpdateFilename(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconButton icon={Copy} tooltip={"Copy File Info"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Copy File ID</DropdownMenuItem>
            <DropdownMenuItem>Copy File UUID</DropdownMenuItem>
            <DropdownMenuItem>Copy File Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <IconButton icon={Pencil} tooltip={"Edit File"} onClick={() => {}} />
        <IconButtonConfirmation
          icon={Trash2}
          tooltip={"Delete File"}
          onConfirm={() => onDelete()}
          confirmationMessage={`Are you sure you want to delete ${fileObj.name}?`}
          confirmButton={"Delete"}
        />
      </TableCell>
    </TableRow>
  );
};
