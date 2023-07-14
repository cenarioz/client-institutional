import { ReactNode } from "react";

interface PropertyProps {
  title: string;
  description: string | ReactNode;
}

export default function Property({ title, description }: PropertyProps) {
  return (
    <div className="flex flex-row w-full text-gray-900 mb-8">
      <p className="font-medium text-base w-40">{title}</p>
      <div className="pl-6 w-full flex-wrap text-base">{description}</div>
    </div>
  );
}
