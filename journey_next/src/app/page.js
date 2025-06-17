/*Conteudo da Pagina*/
import Image from "next/image";
import {Header, ImageCard, Footer, AsideBar, Firstfilter, Secondfilter, Cursos} from "./Components";

export default function Main() {
  return (
    <div>
      <Header />
      <ImageCard />
      <main>
        <aside>
          <AsideBar />
          <Firstfilter />
          <Secondfilter />
        </aside>
        <Cursos />
      </main>
      <Footer />
    </div> 
  );
}
