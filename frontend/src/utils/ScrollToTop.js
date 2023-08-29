import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui"

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    Fancybox.close();
  }, [pathname]);

  return null
}