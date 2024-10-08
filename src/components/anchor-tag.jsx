import Link from "next/link";

export const AnchorTag = ({ className, href, target, children, ...rests }) => {
  return (
    <Link
      {...rests}
      className={`font-medium text-sm text-primary hover:underline font-montserrat ${className}`}
      href={href}
      target={target}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
};
