import React, { useState, useEffect, useRef, useCallback } from 'react';
import './closet.css';
// Dados dos projetos para manter o componente limpo e fácil de atualizar
const projectData = [
  {
    imageSrc: 'imagens/closet2.png',
    alt: 'Projeto Closet Moderno',
    title: 'Design Moderno e Funcional',
    description: 'Um ambiente pensado para o conforto, utilizando paleta de cores neutras com toques vibrantes em azul, garantindo um espaço elegante e acolhedor.',
  },
  {
    imageSrc: 'imagens/closet4.png',
    alt: 'Projeto Closet Chic',
    title: 'Estilo Rústico Chic',
    description: 'Combinamos a textura do cinza com o toque sofisticado do veludo azul-marinho. Perfeito para quem busca aconchego sem abrir mão da modernidade.',
  },
  {
    imageSrc: 'imagens/closet3.png',
    alt: 'Projeto Closet Compacto',
    title: 'Solução para Espaços Compactos',
    description: 'Otimização inteligente do espaço com móveis planejados e iluminação estratégica para ampliar visualmente o closet, mantendo a sensação de leveza.',
  },
];

const ITEM_SCROLL_DURATION = 5000; // 5 segundos

function Closet() {
  // 1. Estados para o carrossel (índice atual)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 2. Refs para acessar os elementos DOM diretamente
  const carouselRef = useRef(null);
  const itemsRef = useRef([]);

  // Função para calcular a largura total de um item (largura + gap)
  const getItemFullWidth = useCallback(() => {
    const item = itemsRef.current[0];
    if (!item) return 0;

    const itemWidth = item.getBoundingClientRect().width;
    // Tenta obter o gap do CSS (requer que o CSS esteja importado e aplicado)
    const carouselElement = carouselRef.current;
    const gapStyle = carouselElement ? getComputedStyle(carouselElement).getPropertyValue('gap') : '0px';
    const gapValue = gapStyle ? parseFloat(gapStyle) : 0;
    
    return itemWidth + gapValue;
  }, []);

  // Função para atualizar a posição do carrossel
  const updateCarousel = useCallback(() => {
    const width = getItemFullWidth();
    const offset = -currentIndex * width;

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [currentIndex, getItemFullWidth]);

  // Lógica para avançar/voltar no slide
  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex >= projectData.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  }, []);

  // Efeito principal: Atualiza o carrossel quando currentIndex muda
  useEffect(() => {
    updateCarousel();
  }, [currentIndex, updateCarousel]);


  // Efeito de Auto-Scroll
  useEffect(() => {
    let autoScrollInterval;

    const startAutoScroll = () => {
        // Apenas inicia se não for mobile (para evitar conflito com scroll nativo)
        if (window.innerWidth > 768) {
            autoScrollInterval = setInterval(nextSlide, ITEM_SCROLL_DURATION);
        }
    };
    
    // Inicia o auto-scroll
    startAutoScroll();

    // Limpeza (cleanup) do efeito: remove o intervalo
    return () => clearInterval(autoScrollInterval);
  }, [nextSlide]); // Depende apenas de nextSlide (que é estável graças ao useCallback)

  // Efeito de Resize (ajusta a posição ao redimensionar a janela)
  useEffect(() => {
    const handleResize = () => {
      // Força a atualização do carrossel ao redimensionar
      updateCarousel();
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [updateCarousel]);

  // Renderização do HTML (JSX)
  return (
    <>
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
          <h1 className="hero-title">Closet</h1>
        </div>
      </header>

      <section className="projects-carousel-section">
        <div className="carousel-header">
          <h2 className="section-title">Nossos Projetos de Closet</h2>
          <a href="#" className="btn-ver-tudo">VER TUDO</a>
        </div>

        <div 
            className="carousel-container"
            // Adiciona listeners para pausar o auto-scroll ao interagir
            onMouseEnter={() => clearInterval(window.autoScrollInterval)}
            onMouseLeave={() => {
                // Reinicia o intervalo se ele tiver sido limpo
                window.autoScrollInterval = setInterval(nextSlide, ITEM_SCROLL_DURATION);
            }}
        >
            {/* Botão Anterior */}
            <button 
                className="nav-btn prev-btn" 
                aria-label="Anterior" 
                onClick={prevSlide}
                disabled={currentIndex === 0}
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            {/* Carrossel de Itens */}
            <div className="project-carousel" ref={carouselRef}>
              {projectData.map((project, index) => (
                <div 
                  className="carousel-item" 
                  key={index}
                  ref={el => itemsRef.current[index] = el} // Ref para cada item
                >
                  {/* Importante: No HTML puro você usava "./imagens/", mas como você colocou as imagens na pasta public, o caminho deve ser relativo à raiz, ou seja, "/imagens/" ou apenas "imagens/". O React lida com isso. */}
                  <img src={project.imageSrc} alt={project.alt} />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Próximo */}
            <button 
                className="nav-btn next-btn" 
                aria-label="Próximo" 
                onClick={nextSlide}
                disabled={currentIndex === projectData.length - 1}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
      </section>
      
      <footer className="footer-bluen">
        <div className="footer-grid">
          <div className="col-info">
            <h2>BLUEN</h2>
            <h3>SOBRE NÓS</h3>
            <p>Na Bluen, acreditamos que cada espaço conta uma história — e a nossa missão é ajudar você a contá-la da melhor forma. Combinamos design inteligente, funcionalidade e estética para criar ambientes que refletem quem você é e como você vive.
            Seja transformando lares ou repensando espaços de trabalho, nosso foco é unir beleza, conforto e propósito em cada projeto.
            Bluen — design que inspira, transforma e acolhe.</p>
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
    </>
  );
}

export default Closet;