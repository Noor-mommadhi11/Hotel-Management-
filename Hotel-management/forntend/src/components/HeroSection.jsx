import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Save on your<br />next hotel booking</h1>
        <p>We've pulled together some top hotel deals so you can find an amazing room at an even better price.</p>
        <button>See hotel deals</button>
      </div>

      <div className="offer-badge">
        <span>🏨</span>
        <strong>up to 35% off</strong>
      </div>
    </section>
  );
};

export default HeroSection;
