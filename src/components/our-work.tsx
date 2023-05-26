"use client";

import { useState } from "react";

const OurWork = (props: any) => {
  const [selectedImage, setSelectedImage] = useState(
    "https://source.unsplash.com/featured/?studio,photography"
  );
  const [buttonActive1, setButtonActive1] = useState(true);
  const [buttonActive2, setButtonActive2] = useState(false);
  const [buttonActive3, setButtonActive3] = useState(false);
  const [buttonActive4, setButtonActive4] = useState(false);
  const [buttonActive5, setButtonActive5] = useState(false);
  const [buttonActive6, setButtonActive6] = useState(false);
  const [buttonActive7, setButtonActive7] = useState(false);
  const [buttonActive8, setButtonActive8] = useState(false);
  const [buttonActive9, setButtonActive9] = useState(false);

  const handleButtonMouseEnter = (imageName: string) => {
    setSelectedImage(imageName);
  };

  const handleButtons = (value: any) => {
    setButtonActive1(false);
    setButtonActive2(false);
    setButtonActive3(false);
    setButtonActive4(false);
    setButtonActive5(false);
    setButtonActive6(false);
    setButtonActive7(false);
    setButtonActive8(false);
    setButtonActive9(false);

    switch (value) {
      case 1:
        setButtonActive1(true);
        break;
      case 2:
        setButtonActive2(true);
        break;
      case 3:
        setButtonActive3(true);
        break;
      case 4:
        setButtonActive4(true);
        break;
      case 5:
        setButtonActive5(true);
        break;
      case 6:
        setButtonActive6(true);
        break;
      case 7:
        setButtonActive7(true);
        break;
      case 8:
        setButtonActive8(true);
        break;
      case 9:
        setButtonActive9(true);
        break;

      default:
        break;
    }
  };

  return (
    <section className="container mx-auto grid grid-cols-3 gap-4 py-12">
      <div className="col-span-2 flex flex-col items-center">
        <h1 className="text-4xl mb-12">Alguns de nossos trabalhos...</h1>
        <div className="flex justify-center flex-wrap gap-6 content-center px-20">
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?studio,photography"
              ),
              handleButtons(1)
            )}
            className={`${
              buttonActive1 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Estudio fotografico
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?meeting"
              ),
              handleButtons(2)
            )}
            className={`${
              buttonActive2 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Reuniao
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?event"
              ),
              handleButtons(3)
            )}
            className={`${
              buttonActive3 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Evento
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?video,recording"
              ),
              handleButtons(4)
            )}
            className={`${
              buttonActive4 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Gravação de Video
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?music,video,clip"
              ),
              handleButtons(5)
            )}
            className={`${
              buttonActive5 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Clipe musical
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?filming"
              ),
              handleButtons(6)
            )}
            className={`${
              buttonActive6 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Filmagem
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?photo,photoshoot"
              ),
              handleButtons(7)
            )}
            className={`${
              buttonActive7 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Sessão de fotos
          </button>
          <button
            onMouseEnter={() => {
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?corporate"
              ),
                handleButtons(8);
            }}
            className={`${
              buttonActive8 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Evento corporativo
          </button>
          <button
            onMouseEnter={() => (
              handleButtonMouseEnter(
                "https://source.unsplash.com/featured/?party"
              ),
              handleButtons(9)
            )}
            className={`${
              buttonActive9 ? "bg-black text-white" : "bg-white text-gray-800"
            }  font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center`}
          >
            Festa
          </button>
        </div>
      </div>
      <div>
        <img
          className="object-cover h-96 w-96 rounded-xl"
          src={selectedImage}
        />
      </div>
    </section>
  );
};

export default OurWork;
