export const InputControl = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={"flex gap-4 items-center"}>
      <div className={"flex flex-col gap-2 basis-1/2"}>
        <div className={"text-xl"}>{title}</div>
        <div className={"text-gray-600"}>{description ?? ""}</div>
      </div>
      <div className={"basis-1/2"}>{children}</div>
    </div>
  );
};
