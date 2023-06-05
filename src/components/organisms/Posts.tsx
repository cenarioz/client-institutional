"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import PostCard from "../molecules/PostCard";
import Search from "../molecules/Search";

const Posts = () => {
  const t = useTranslations();
  const mocks = [
    {
      title: "Florianópolis, SC",
      subtitle: "Abandoned Vintage Apartment (1970s)",
      price: 150,
      time: "12 - 15 Dez",
      hate: 4,
      id: 1,
      photos: [
        "https://source.unsplash.com/featured/800x601",
        "https://source.unsplash.com/featured/800x601",
        "https://source.unsplash.com/featured/800x602",
      ],
    },
    {
      title: "Rio de Janeiro, RJ",
      subtitle: "Cosy Beachfront Cottage",
      price: 200,
      time: "8 - 11 Dez",
      hate: 3,
      id: 2,
      photos: [
        "https://source.unsplash.com/featured/800x603",
        "https://source.unsplash.com/featured/800x604",
        "https://source.unsplash.com/featured/800x605",
      ],
    },
    {
      title: "São Paulo, SP",
      subtitle: "Modern Loft in the City Center",
      price: 120,
      time: "18 - 21 Dez",
      hate: 2,
      id: 3,
      photos: [
        "https://source.unsplash.com/featured/800x606",
        "https://source.unsplash.com/featured/800x607",
        "https://source.unsplash.com/featured/800x608",
      ],
    },
    {
      title: "Belo Horizonte, MG",
      subtitle: "Charming Country House",
      price: 180,
      time: "5 - 8 Dez",
      hate: 5,
      id: 4,
      photos: [
        "https://source.unsplash.com/featured/800x609",
        "https://source.unsplash.com/featured/800x610",
        "https://source.unsplash.com/featured/800x611",
      ],
    },
    {
      title: "Porto Alegre, RS",
      subtitle: "Luxurious Penthouse with Ocean View",
      price: 250,
      time: "21 - 24 Dez",
      hate: 1,
      id: 5,
      photos: [
        "https://source.unsplash.com/featured/800x612",
        "https://source.unsplash.com/featured/800x613",
        "https://source.unsplash.com/featured/800x614",
      ],
    },
    {
      title: "Salvador, BA",
      subtitle: "Rustic Cabin in the Woods",
      price: 80,
      time: "1 - 4 Dez",
      hate: 3,
      id: 6,
      photos: [
        "https://source.unsplash.com/featured/800x615",
        "https://source.unsplash.com/featured/800x616",
        "https://source.unsplash.com/featured/800x617",
      ],
    },
    {
      title: "Recife, PE",
      subtitle: "Historic Townhouse in the Old Quarter",
      price: 140,
      time: "10 - 13 Dez",
      hate: 4,
      id: 7,
      photos: [
        "https://source.unsplash.com/featured/800x618",
        "https://source.unsplash.com/featured/800x619",
        "https://source.unsplash.com/featured/800x620",
      ],
    },
    {
      title: "Curitiba, PR",
      subtitle: "Secluded Retreat by the River",
      price: 160,
      time: "14 - 17 Dez",
      hate: 2,
      id: 8,
      photos: [
        "https://source.unsplash.com/featured/800x621",
        "https://source.unsplash.com/featured/800x622",
        "https://source.unsplash.com/featured/800x623",
      ],
    },
    {
      title: "Fortaleza, CE",
      subtitle: "Contemporary Studio with Stunning Views",
      price: 200,
      time: "6 - 9 Dez",
      hate: 5,
      id: 9,
      photos: [
        "https://source.unsplash.com/featured/800x624",
        "https://source.unsplash.com/featured/800x625",
        "https://source.unsplash.com/featured/800x626",
      ],
    },
    {
      title: "Fortaleza, CE",
      subtitle: "Contemporary Studio with Stunning Views",
      price: 200,
      time: "6 - 9 Dez",
      hate: 5,
      id: 10,
      photos: [
        "https://source.unsplash.com/featured/800x624",
        "https://source.unsplash.com/featured/800x625",
        "https://source.unsplash.com/featured/800x626",
      ],
    },
  ];
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`post/${id}`);
  };

  return (
    <div className="flex bg-white pb-20 text-black">
      <div className="flex flex-col top-1/3 left-0 w-full items-center xs:px-3">
        <Search className="md:hidden mt-10 w-full"></Search>
        <div className="container mx-auto grid xs:grid-cols-1 grid-cols-5 gap-4 pt-10">
          {mocks.map((post) => {
            return (
              <PostCard
                key={post.id}
                onClick={() => handleClick(post.id)}
                subtitle={post.subtitle}
                title={post.title}
                time={post.time}
                price={post.price}
                hate={post.hate}
                photos={post.photos}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
