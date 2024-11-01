import { cn } from "@/lib/utils";

function Skeleton(props) {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...restProps}
    />
  );
}

export { Skeleton };
