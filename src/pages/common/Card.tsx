export const Card = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        "bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-md " + className
      }
    >
      {children}
    </div>
  );
};
