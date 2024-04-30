import './navbar.css';
import Button from '../button/button';
import Logo from '../logo/logo';
import Searchbox from '../searchbox/search';

export default function Nevbar() {
  return (
    <>
        <nav className='navbar'>
          <Logo />
          <Searchbox />
          <Button classname='button' value='Give Feedback'/>
        </nav>
     </>
  );
}


