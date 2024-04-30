import './button.css';
import searchLogo from '../../assets/search-icon.svg';


const  Button =({classname,value})=> {
  return (
    <>
        <button  className={classname}>{value}</button>
     </>
  );
}



export default Button;

