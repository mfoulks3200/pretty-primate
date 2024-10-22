import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import packageJson from "@/package.json";
import { Card } from "@/src/pages/common/Card";
import { Github, Package, PawPrint, Sparkles } from "lucide-react";
import { PaginatedList } from "./about/PaginatedList";

export const AboutPage = () => {
  return (
    <div className={"w-full flex flex-col"}>
      <div
        className={
          "bg-blue-700 h-60 w-full overflow-hidden flex justify-between items-center"
        }
      >
        <PawPrint
          size={240}
          strokeWidth={15}
          className={"scale-[150%] opacity-10"}
          absoluteStrokeWidth
        />
        <div className={"flex flex-col gap-1 items-center justify-center"}>
          <div className={"text-7xl font-extrabold italic"}>Pretty Primate</div>
          <div
            className={"text-lg italic flex gap-1 items-center justify-center"}
          >
            A userscript manager with style.
          </div>
          <div className={"text-xs opacity-25"}>
            Version {packageJson.version}
          </div>
        </div>
        <PawPrint
          size={240}
          strokeWidth={15}
          className={"scale-[150%] rotate-180 opacity-10"}
          absoluteStrokeWidth
        />
      </div>
      <div className={"p-8 flex gap-8 w-full"}>
        <Card className={"flex flex-col gap-4 basis-1/3"}>
          <div className={"text-2xl"}>Contributors</div>

          <PaginatedList maxPerPage={10}>
            {packageJson.contributors.map((contributor) => (
              <div className={"flex gap-4 items-center"}>
                <Avatar>
                  <AvatarImage
                    src={`https://github.com/${contributor.github}.png`}
                  />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <div className={"basis-full"}>
                  <div className={"text-base"}>{contributor.name}</div>
                  <div key={contributor.email} className={"text-gray-600"}>
                    {contributor.email}
                  </div>
                </div>
                {contributor.github ? (
                  <GithubButton username={contributor.github} />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </PaginatedList>
        </Card>
        <Card className={"flex flex-col gap-4 basis-1/3"}>
          <div className={"text-2xl"}>Dependencies</div>
          <PaginatedList maxPerPage={10}>
            {Object.entries({
              ...packageJson.dependencies,
              ...packageJson.devDependencies,
            }).map(([name, version]) => (
              <div className={"flex gap-4 items-center"}>
                <div className={"basis-full"}>
                  <div className={"text-base"}>{name}</div>
                  <div key={name} className={"text-gray-600"}>
                    {version}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className={"px-3"}
                  onClick={() =>
                    window.open(
                      "https://www.npmjs.com/package/" + name,
                      "_blank"
                    )
                  }
                >
                  <Package size={32} absoluteStrokeWidth />
                </Button>
              </div>
            ))}
          </PaginatedList>
        </Card>
        <Card className={"flex flex-col gap-4 basis-1/3"}>
          <div className={"text-2xl"}>Quick Links</div>
        </Card>
      </div>
    </div>
  );
};

const GithubButton = ({ username }: { username: string }) => {
  return (
    <Button
      variant="ghost"
      className={"px-3"}
      onClick={() => window.open("https://github.com/" + username, "_blank")}
    >
      <Github size={32} absoluteStrokeWidth />
    </Button>
  );
};
