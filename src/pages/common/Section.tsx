import { Card } from "./Card";

export const Section = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-col gap-1"}>
        <div className={"text-2xl"}>{title}</div>
        {description !== undefined ? (
          <div className={"text-gray-600"}>{description}</div>
        ) : (
          <></>
        )}
      </div>
      <Card className={"flex flex-col gap-8"}>{children}</Card>
    </div>
  );
};
