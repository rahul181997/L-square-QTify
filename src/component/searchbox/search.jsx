import './search.css';
import searchLogo from '../../assets/search-icon.svg';

export default function Searchbox() {
  return (
    <>
        <div className='searchbox'>
            <input type='text' className='search' placeholder='Search a album of your choice' />
            <button  className='searchbutton'>
                <img src={searchLogo} alt='logo' className='searchLogo' />
            </button>
        </div>
    </>
  );
}


