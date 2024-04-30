import './albums.css';
import axios from 'axios';
import { useEffect, useState,useRef } from 'react';
import BasicTabs from "./BasicTabs";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { FreeMode, Pagination, Navigation } from 'swiper/modules';






const Album =({image,num,likeFollow})=>{
    return(
        <div className='SingleAlbum'>
            <div className='SingleAlbumBody'>
                <img src={image} alt="album img" />
            </div>
            <div className='SingleAlbumFooter'>
                <button className='SingleAlbumFooterButton'>{num} {likeFollow}</button>
            </div>
        </div>
    )
}

const SingleAlbumBox =({id,title,image,follows,slug,like,showMenu})=>{
    let num = 0; 
    let likeFollow= "";
    if(showMenu){
        num = like;
        likeFollow='Likes';
    }else{
        num = follows;
        likeFollow='Follows';
    }
    return(
        <div className='SingleAlbumBox'>
            <Album image={image} num={num} likeFollow={likeFollow} />
            <p>{title}</p>
        </div>
    )
}


const MenuBox =({genres,selectFun})=>{
    return(
        <div className='alumsMenu'>
           <BasicTabs genres={genres} selectFun={selectFun} />
        </div>
    )
}


const AlbumBox =({rowname,data,showMenu})=>{
    const [genres,setGenres] = useState([]);
    const [song,setSong] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
   
   
    
    const getAlbumData= async()=>{
        try{
            //console.log(url)
            await axios.get('https://qtify-backend-labs.crio.do/genres')
            .then(function (response) {
                //console.log(response.data);
                setGenres(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getAlbumData()
        if(showMenu){
            setSong(data)
        }
    },[])
    //console.log(song)

    const selectFun = (event, newValue) => {
        
        // console.log(newValue)
        newValue = newValue-1;
        setSelectedValue(genres.data[newValue]['key']);
        const newList = data.filter(so=>so.genre['key'] === genres.data[newValue]['key']);
        setSong(newList)
        // console.log(newList);
        // console.log(genres.data[newValue]['key'])
    };

    return(
        <div className='alumsBox'>
            <div className='alumsheader'>
                <p>{rowname}</p>
                <p className='showall'>Show all</p>
            </div>
            {
                showMenu && (<MenuBox selectFun={selectFun} genres={genres} />)
            }
           
            <div className='alumsbody'>
                <Swiper
                    slidesPerView={7}
                    //spaceBetween={1}
                    className="mySwiper"
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                {
                    showMenu && selectedValue?
                        song?.map((al)=>{
                            return (
                                <SwiperSlide>
                                <SingleAlbumBox 
                                    key={al.id}
                                    id={al.id}
                                    title={al.title}
                                    image={al.image}
                                    follows={al.follows}
                                    slug={al.slug}
                                    like={al.likes}
                                    showMenu={showMenu}
                                />
                                </SwiperSlide>
                            )
                        })
                    : 
                    data?.map((al)=>{
                        return (
                            <SwiperSlide>
                            <SingleAlbumBox 
                                key={al.id}
                                id={al.id}
                                title={al.title}
                                image={al.image}
                                follows={al.follows}
                                slug={al.slug}
                                like={al.likes}
                                showMenu={showMenu}
                            />
                            </SwiperSlide>
                        )
                    })
                }
                </Swiper>
            </div>
        </div>
    )
}


const RowAlbums = ({apiName,rowname,showMenu})=> {
    const [data,setData] = useState([])
    let url = "";
    if(showMenu){
        //song
        url = `https://qtify-backend-labs.crio.do/songs`;
        //url = `https://qtify-backend-labs.crio.do/albums/${apiName}`;
    }
    else{
        //album
        url = `https://qtify-backend-labs.crio.do/albums/${apiName}`;
    }
    
    const getAlbumData= async()=>{
        try{
            //console.log(url)
            await axios.get(url)
            .then(function (response) {
                //console.log(response.data);
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getAlbumData()
    },[])

    return (
      <>
        <AlbumBox  rowname={rowname} data={data} showMenu={showMenu}  />
      </>
    )
}


const AlbumsRow = ()=> {
    return (
      <div className='alumsRow'>
        <RowAlbums apiName='top' rowname="Top Albums" />
        <RowAlbums apiName='new' rowname="New Albums" />
        <RowAlbums apiName='new' rowname="Songs" showMenu={true} />
       </div>
    )
}
  

export default AlbumsRow;
  