import React, { useEffect, useRef, useState } from "react";
import "./cozinha.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const itemScrollDuration = 5000;
  let autoScrollInterval = useRef(null);

  // Função para calcular largura do item + gap
  const getItemFullWidth = () => {
    const carousel = carouselRef.current;
    if (!carousel) return 0;
    const item = carousel.querySelector(".carousel-item");
    if (!item) return 0;
    const width = item.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carousel).getPropertyValue("gap")) || 0;
    return width + gap;
  };

  // Atualiza posição do carrossel
  const updateCarousel = (index) => {
    const width = getItemFullWidth();
    setItemWidth(width);
    const carousel = carouselRef.current;
    if (carousel) {
      const offset = -index * width;
      carousel.style.transform = `translateX(${offset}px)`;
    }
  };

  // Avançar slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= 2 ? 0 : prev + 1));
  };

  // Voltar slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Iniciar auto-scroll
  const startAutoScroll = () => {
    clearInterval(autoScrollInterval.current);
    if (window.innerWidth > 768) {
      autoScrollInterval.current = setInterval(() => {
        nextSlide();
      }, itemScrollDuration);
    }
  };

  // Atualiza sempre que o índice muda
  useEffect(() => {
    updateCarousel(currentIndex);
  }, [currentIndex]);

  // Inicia auto-scroll e listeners
  useEffect(() => {
    updateCarousel(currentIndex);
    startAutoScroll();
    window.addEventListener("resize", () => {
      updateCarousel(currentIndex);
      startAutoScroll();
    });
    return () => clearInterval(autoScrollInterval.current);
  }, []);

  return (
    <div className="App">
      {/* HEADER */}
      <header className="main-header">
        <nav className="navbar">
          <div className="logo">BLUEN</div>
          <ul className="nav-links">
            <li><a href="#">SERVIÇOS</a></li>
            <li><a href="#">PROJETOS</a></li>
            <li><a href="#">CONTATE-NOS</a></li>
          </ul>
          <div className="menu-toggle">
            <i className="fas fa-bars"></i>
          </div>
        </nav>

        <div className="hero-content">
          <p className="project-tag">PROJETO EM DESTAQUE</p>
          <h1 className="hero-title">Cozinha</h1>
        </div>
      </header>

      {/* PROJETOS */}
      <section className="projects-carousel-section">
        <div className="carousel-header">
          <h2 className="section-title">Nossos Projetos de Sala de Cozinhas</h2>
          <a href="#" className="btn-ver-tudo">VER TUDO</a>
        </div>

        <div className="carousel-container">
          <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Anterior">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="project-carousel" id="projectCarousel" ref={carouselRef}>
            <div className="carousel-item">
              <img src="./imagens/cz2.png" alt="Projeto Cozinha Moderna" />
              <div className="project-info">
                <h3>Design Moderno e Funcional</h3>
                <p>
                  Um ambiente pensado para o conforto, utilizando paleta de cores neutras
                  com toques vibrantes em azul, garantindo um espaço elegante e acolhedor.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="./imagens/cz3.png" alt="Projeto Cozinha Chic" />
              <div className="project-info">
                <h3>Estilo Rústico Chic</h3>
                <p>
                  Combinamos a textura do cinza com o toque sofisticado do veludo azul-marinho.
                  Perfeito para quem busca aconchego sem abrir mão da modernidade.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="./imagens/cz4.png" alt="Projeto Cozinha Compacta" />
              <div className="project-info">
                <h3>Solução para Espaços Compactos</h3>
                <p>
                  Otimização inteligente do espaço com móveis planejados e iluminação estratégica
                  para ampliar visualmente a cozinha, mantendo a sensação de leveza.
                </p>
              </div>
            </div>
          </div>

          <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Próximo">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-bluen">
        <div className="footer-grid">
          <div className="col-info">
            <h2>BLUEN</h2>
            <h3>SOBRE NÓS</h3>
            <p>
              Na Bluen, acreditamos que cada espaço conta uma história — e a nossa missão é ajudar
              você a contá-la da melhor forma.  Combinamos design inteligente, funcionalidade e estética
              para criar ambientes que refletem quem você é e como você vive. Seja transformando lares
              ou repensando espaços de trabalho, nosso foco é unir beleza, conforto e propósito em cada projeto.
              Bluen — design que inspira, transforma e acolhe.
            </p>
          </div>

          <div className="col-social col-separator">
            <h3>NOS SIGA</h3>
            <ul>
              <li><a href="#"><i className="fab fa-instagram"></i> @bluen</a></li>
              <li><a href="#"><i className="fab fa-facebook-f"></i> @bluenbook</a></li>
              <li><a href="#"><i className="fab fa-linkedin-in"></i> @bluein</a></li>
              <li><a href="#"><i className="fab fa-youtube"></i> @blueen</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
