import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./BackToTop.css";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    show && (
      <button className="back-to-top" onClick={goTop}>
        <FaArrowUp />
      </button>
    )
  );
}
