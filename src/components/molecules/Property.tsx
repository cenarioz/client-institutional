interface PropertyProps {
  title: string;
  description: string;
}

export default function Property({ title, description }: PropertyProps) {
  return (
    <div className="flex flex-row w-full text-gray-900 mb-8">
      <p className="font-medium text-base w-40">{title}</p>
      <p className="pl-6 w-full flex-wrap text-base">{description}</p>
    </div>
  );
}
