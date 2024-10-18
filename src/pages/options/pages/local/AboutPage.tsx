import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import packageJson from "@/package.json";
import { Card } from "@/src/pages/common/Card";
import { Github, Package } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className={"w-full flex flex-col"}>
      <div className={"bg-blue-700 h-60 w-full"}></div>
      <div className={"p-8 flex gap-8 w-full"}>
        <Card className={"flex flex-col gap-4 basis-1/3"}>
          <div className={"text-2xl"}>Contributors</div>
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
        </Card>
        <Card className={"flex flex-col gap-4 basis-1/3"}>
          <div className={"text-2xl"}>Dependencies</div>
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
                  window.open("https://www.npmjs.com/package/" + name, "_blank")
                }
              >
                <Package size={32} absoluteStrokeWidth />
              </Button>
            </div>
          ))}
        </Card>
        <Card className={"flex flex-col gap-4 basis-1/3"}></Card>
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
