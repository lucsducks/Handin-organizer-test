import { Carousel } from "@/components/ui/Carousel";
import { carouselData } from "@/mock/auth-carousel";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../general/sections";

export function AuthLayout() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center pt-20">
        <article className="m-auto w-[90%] xl:grid xl:grid-cols-2">
          <section className="relative hidden h-full items-center justify-center xl:flex">
            <Carousel
              setArrows={false}
              setDots={true}
              setLoop={true}
              setAutoPlay={true}
            >
              {carouselData.map((item, index) => (
                <div
                  className="flex w-full flex-shrink-0 flex-col items-center justify-center"
                  key={index}
                >
                  <img
                    src={item.img}
                    alt="login-ilustration"
                    width={520}
                    height={520}
                  />
                  <div className="flex max-w-[520px] flex-col items-center justify-center gap-4 py-4">
                    <h2 className="text-2xl font-semibold text-primary-500-main">
                      {item.title}
                    </h2>
                    <p className="text-center text-grayscale-800">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </section>
          <section className="flex items-center justify-center">
            <Outlet />
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
