import {Image} from "react-bootstrap";
import NotFoundPicture from "../assets/notFoundPepe.svg"

function NotFound() {
     return (
         <div className="text-center vh-100">
             <Image fluid={true}  src={NotFoundPicture} alt="Страница не найдена" className="h-25"/>
             <h1 className="h4 text-muted">Страница не найдена</h1>
             <p className="text-muted">Вы можете перейти <a href={`/`}>на главную страницу</a></p>
         </div>
     );
}
export default NotFound;