import Image from "next/image";
/*Resolver problema de carregamento de imagens*/

export function Header() {
  return (
    <header>
      <div className="logosContainer">
        <a href="">
          <img src="/imagens/logoPuc.png" alt="LogoPuc"/>
        </a>
        <div className="divLogo"></div>
        <a href="">
          <img src="/imagens/logoIcei.png" alt="LogoIcei"/>
        </a>
      </div>
      <div className="opcoesContainer">
        <a href="">CURSOS</a>
        <a href="">DÚVIDAS</a>
      </div>
    </header>
  );
}

/*Imagem abaixo do Header*/
export function ImageCard() {
  return (
    <section>
      <div className="floatingCards">
        <div className="floatingCardsTop">
          CURSOS DE PÓS EM TECNOLOGIAS DIGITAIS
        </div>
        <div className="floatingCardsBottom">
          INOVAÇÃO PARA UM MUNDO EM EVOLUÇÃO
        </div>
      </div>

      <div className="mainImage">
        <img src="/imagens/banner.png" alt="Imagem_do_Header"/>
      </div>
    </section>
  );
}

/*Footer*/
export function Footer() {
  return (
    <footer>
      <div className="logosContainer">
        <a href="">
          <img src="/imagens/logoPuc.png" alt="Logo PUC" />
        </a>
        <a href="">
          <img src="/imagens/logoIcei.png" alt="Logo ICEI" />
        </a>
      </div>
      <nav>
        <a href="">Linkedin</a>
        <a href="">EMEC</a>
        <a href="">PUC Minas</a>
        <a href="">ICEI</a>
      </nav>
    </footer>
  );
}

/*---------------
Navibar Functions
----------------*/

export function AsideBar() {
  return (
    <div className="asideBtns">
      <input className="pesquisarCursos" placeholder="Pesquisar" />
      <button className="compararCursos">
        <ion-icon name="git-compare-outline"></ion-icon>
        <h2>Comparar Cursos</h2>
      </button>
    </div>
  );
}

export function Firstfilter() {
  return (
    <div className="tipoCursos">
      <div className="tipoCursosHeader">
        <h1>Tipo de Curso</h1>
      </div>
      <div className="cursosSelect">
        <select id="opcoes" name="opcoes">
          <option value="opcao1">Todos</option>
          <option value="opcao2">Online</option>
          <option value="opcao3">EAD</option>
        </select>
      </div>
    </div>
  );
}

export function Secondfilter() {
  return (
    <div className="tipoCursos">
      <div className="tipoCursosHeader">
        <h1>Tópico</h1>
      </div>
      <div className="cursosSelect">
        <select id="filtro-cursos" name="filtro-cursos"></select>
      </div>
    </div>
  );
}

export function Cursos(){
  return(
    <div className="Cursos">
      <div className="textoCurso">
        <h1>Cursos</h1>
      </div>
      <section id="dados-importados">
      </section>
    </div>
  );
}