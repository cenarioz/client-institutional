import { Carousel } from "react-responsive-carousel";

function Card() {
  const settings = {
    showStatus: false,
    infiniteLoop: false,
    emulateTouch: true,
    showThumbs: false,
    autoPlay: false,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: false,
  };

  return (
    <div className="max-w-sm rounded overflow-hidden">
      <div className="relative xs:h-80 h-60">
        <Carousel {...settings}>
          <div className="bg-cover w-full xs:h-80 h-60 bg-center bg-[url('https://source.unsplash.com/featured/?photo')]"></div>
          <div className="bg-cover w-full xs:h-80 h-60 bg-center bg-[url('https://source.unsplash.com/featured/?event')]"></div>
          <div className="bg-cover w-full xs:h-80 h-60 bg-center bg-[url('https://source.unsplash.com/featured/?photographer')]"></div>
        </Carousel>
      </div>
      <div className="py-4">
        <div className="flex flex-row justify-between gap-2">
          <div className="font-bold text-sm mb-2">
            Florianopolis, Santa Catarina
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-900 text-sm">★</span>
            <span className="ml-1 text-sm">4.5</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm">Estudio Profissional</p>
        <p className="text-gray-500 text-sm">18-23 Dez</p>
        <p className="text-gray-900 text-sm">R$ 150<span className="text-gray-500">/hora</span></p>
      </div>
    </div>
  );
}

export default Card;
