import Divisor from "@/components/atoms/Divisor";
import Nav from "@/components/molecules/Navbar";
import About from "@/components/organisms/About";
import Mission from "@/components/organisms/Mission";
import OurWork from "@/components/organisms/OurWork";

export default function Host() {
  return (
    <main className="overflow-hidden">
      <Nav search divisor/>
      <About />
      <Divisor />
      <OurWork />
      <Divisor />
      <Mission />
    </main>
  );
}
