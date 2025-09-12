import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useScrollSmooth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const scroll = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(scroll, 100);
      } else {
        scroll();
      }
    },
    [location, navigate]
  );

  return scrollToSection;
};

export default useScrollSmooth;
