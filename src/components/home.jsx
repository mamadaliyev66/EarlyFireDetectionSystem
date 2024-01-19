import "./scrollbar.css"
import { useRef,useState,useEffect } from "react";
import React from "react";
import {
  Navbar,
  Collapse ,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

const YouTubeModal = ({ videoId, onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-screen  flex justify-center items-center bg-black bg-opacity-75 z-50">
        <div className="relative   max-h-screen">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-2xl focus:outline-none z-50"
          >
            X
          </button>
          <iframe
            title="EFDS"
            
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
            className=" xl:h-[800px] lg:h-[1000px] md:h-[800px] sm:h-[500px] xl:w-[1500px] lg:w-[1000px] md:w-[800px] sm:w-[500px]"
          ></iframe>
        </div>
      </div>
    );
  };
  




export  function Home() {
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const section5Ref = useRef(null);

  const scrollToSection2 = () => {
    section2Ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection3 = () => {
    section3Ref.current.scrollIntoView({ behavior: 'smooth' });
  };


  const scrollToSection4 = () => {
    section4Ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection5 = () => {
    section5Ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 


  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState('');

  const openVideo = (videoId) => {
    setVideoId(videoId);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setVideoId('');
  };

 
  const [cards, SetCards] = React.useState();
  const CheckScreen=()=>{
    window.innerWidth >= 1530 && SetCards(false);
    window.innerWidth <= 1530 && SetCards(true);
}
  useEffect(() => {
  
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 1530 && SetCards(false) ,
          );
          window.addEventListener(
              "resize",
              () => window.innerWidth <= 1530 && SetCards(true),
            );
        
        CheckScreen()
  }, []);
 
const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-white  lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center text-lg gap-x-2 p-1 font-medium  transition duration-3000"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z"
            fill="#90A4AE"
          />
        </svg>
 
        <a href="#" className="flex text-lg items-center " onClick={scrollToSection2} >
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="#" className="flex text-lg items-center" onClick={scrollToSection3}>
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0.5C1.46957 0.5 0.960859 0.710714 0.585786 1.08579C0.210714 1.46086 0 1.96957 0 2.5V4.5C0 5.03043 0.210714 5.53914 0.585786 5.91421C0.960859 6.28929 1.46957 6.5 2 6.5H4C4.53043 6.5 5.03914 6.28929 5.41421 5.91421C5.78929 5.53914 6 5.03043 6 4.5V2.5C6 1.96957 5.78929 1.46086 5.41421 1.08579C5.03914 0.710714 4.53043 0.5 4 0.5H2ZM2 8.5C1.46957 8.5 0.960859 8.71071 0.585786 9.08579C0.210714 9.46086 0 9.96957 0 10.5V12.5C0 13.0304 0.210714 13.5391 0.585786 13.9142C0.960859 14.2893 1.46957 14.5 2 14.5H4C4.53043 14.5 5.03914 14.2893 5.41421 13.9142C5.78929 13.5391 6 13.0304 6 12.5V10.5C6 9.96957 5.78929 9.46086 5.41421 9.08579C5.03914 8.71071 4.53043 8.5 4 8.5H2ZM8 2.5C8 1.96957 8.21071 1.46086 8.58579 1.08579C8.96086 0.710714 9.46957 0.5 10 0.5H12C12.5304 0.5 13.0391 0.710714 13.4142 1.08579C13.7893 1.46086 14 1.96957 14 2.5V4.5C14 5.03043 13.7893 5.53914 13.4142 5.91421C13.0391 6.28929 12.5304 6.5 12 6.5H10C9.46957 6.5 8.96086 6.28929 8.58579 5.91421C8.21071 5.53914 8 5.03043 8 4.5V2.5ZM8 10.5C8 9.96957 8.21071 9.46086 8.58579 9.08579C8.96086 8.71071 9.46957 8.5 10 8.5H12C12.5304 8.5 13.0391 8.71071 13.4142 9.08579C13.7893 9.46086 14 9.96957 14 10.5V12.5C14 13.0304 13.7893 13.5391 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5H10C9.46957 14.5 8.96086 14.2893 8.58579 13.9142C8.21071 13.5391 8 13.0304 8 12.5V10.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="#" className="flex text-lg items-center" onClick={scrollToSection4}>
          Sample Videos
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5H14C14.5304 0.5 15.0391 0.710714 15.4142 1.08579C15.7893 1.46086 16 1.96957 16 2.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V2.5ZM3.293 3.793C3.48053 3.60553 3.73484 3.50021 4 3.50021C4.26516 3.50021 4.51947 3.60553 4.707 3.793L7.707 6.793C7.89447 6.98053 7.99979 7.23484 7.99979 7.5C7.99979 7.76516 7.89447 8.01947 7.707 8.207L4.707 11.207C4.5184 11.3892 4.2658 11.49 4.0036 11.4877C3.7414 11.4854 3.49059 11.3802 3.30518 11.1948C3.11977 11.0094 3.0146 10.7586 3.01233 10.4964C3.01005 10.2342 3.11084 9.9816 3.293 9.793L5.586 7.5L3.293 5.207C3.10553 5.01947 3.00021 4.76516 3.00021 4.5C3.00021 4.23484 3.10553 3.98053 3.293 3.793ZM9 9.5C8.73478 9.5 8.48043 9.60536 8.29289 9.79289C8.10536 9.98043 8 10.2348 8 10.5C8 10.7652 8.10536 11.0196 8.29289 11.2071C8.48043 11.3946 8.73478 11.5 9 11.5H12C12.2652 11.5 12.5196 11.3946 12.7071 11.2071C12.8946 11.0196 13 10.7652 13 10.5C13 10.2348 12.8946 9.98043 12.7071 9.79289C12.5196 9.60536 12.2652 9.5 12 9.5H9Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="#" className="flex text-lg items-center" onClick={scrollToSection5}>
          Services
        </a>
      </Typography>
    </ul>
  );
 
    return(

        <div>
            
            <Navbar fullWidth={true}  className="mx-auto   sticky top-0 w-full border-[#37517E] z-[9999]  px-4 bg-[#37517E] py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between ">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer text-3xl py-1.5 font-medium"
        >
          Early Fire Detection
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          
        <Link to="/login">
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block bg-transparent border border-white hover:border-blue-500 hover:bg-blue-500 transition duration-3000  h-12 w-36 text-white"
          >
            <span>Log in</span>
          </Button>
        </Link>

        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              color="white"

              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              color="white"

              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              color="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              color="white"

              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse  open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
          <Link to="/login">
            <Button fullWidth variant="gradient" size="sm" className="bg-black text-white">
              <span>Log in</span>
            </Button>
            </Link>
          </div>
        </div>
      </Collapse >
    </Navbar>

     

            {showVideo && <YouTubeModal videoId={videoId} onClose={closeVideo} />}
    
            <main>
                <section ref={section2Ref} className="h-screen text-white  flex items-center justify-between bg-[#37517E]">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                            <div className="p-6 lg:pl-36">
                                <h1 className="text-3xl font-bold md:pt-36 ">
                                    EARLY FIRE DETECTION    
                                </h1>
                                <div className="text-lg pt-16">
                                With our cutting-edge solution, you’ll never have to worry about fire breaking out in your facilities again. Meet the all-in-one fire protection system that uses the power of IoT to keep you and your assets safe.
                                </div>
                                <div className="gird grid-cols-2 mt-16 space-x-9">
                                        <button onClick={scrollToSection3} className="text-xl ">
                                            
                                            <div className="wrapper">
                                            <a className="cta" href="#">
                                                <span>Get Started</span>
                                                <span>
                                                <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                                    <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                                    <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                                                    </g>
                                                </svg>
                                                </span> 
                                            </a>
                                            </div>
                                        </button>
                                        <button className="text-xl hover:text-blue-500 transition h-16 w-52" onClick={() => openVideo('6SYV7NqlCTI?si=K0I2lBnHNVUzjOI8')}>
                                            
                                        <i className="mx-3 fa-solid fa-circle-play"></i>
                                        Watch Video
                                        </button>         


                                </div>
                            </div>
                            <div className="p-6">
                                <img id="mainIMG" className="w-[850px] z-[-1] rounded" src="https://firebasestorage.googleapis.com/v0/b/infinitumai.appspot.com/o/lands.jpg?alt=media&token=5a9829ce-ac81-4546-9cd2-e88a14a7cace" alt="your browser is not able to open this image file !" />
                            </div>
                        </div>
                
                </section>


                <section ref={section3Ref}  className=" text-gray-800 bg-white">

                        {cards? 
                        (
                            <div className="h-fit">
                                   <div className="text-center mt-20">
                                        <h1 className="text-[#37517E] text-2xl font-semibold">
                                            ABOUT PROJECT 
                                            <hr className="w-48 h-1 mx-auto  bg-gray-100 border-0 rounded my-2 dark:bg-gray-700" />
                                        </h1>
                                    </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 ">
                                    <div className="shadow shadow-xl p-6 m-6">
                                        
                                        <h1 className="text-gray-800 font-bold text-xl">EFD can be solutions to following problems</h1>
                                        
                                        <div className="mt-2">
                                        Early fire detection (EFD) systems can be a vital component to business facilities and places of employment. These systems are responsible for protecting lives and property while reducing the effects of a fire. By detecting the presence of a fire in its early stages, these smart EFD systems can alert building occupants and emergency responders with ample time to take appropriate action and extinguish the fire or evacuate the building.
                                        </div>
                                    
                                        <div className="mt-2">
                                        Moreover, Wildfires also pose a significant threat to both humans and wildlife. They destroy large rural and wildland areas, causing a huge loss of lives and assets. As a result, the capability to detect the occurrence of a wildfire is of utmost importance.
                                        Unfortunately today many wildfire detection systems rely on manual judgment. This could lead to a serious consequence: latency in alerting related parties. While governments are putting in more resources to firefighting, the average size of wildfire continues to increase.</div>
                                        </div>
                                        
                                        <div className="shadow shadow-xl p-6 m-6">
                                        

                                        <h1 className="text-gray-800 font-bold text-xl">EFD can be solutions to following problems</h1>
                                        
                                        <div className="mt-2">
                                        Our EFD project is ground-based camera networks which is used to detect fires early with cnn deep learning algorithm. We also use Yolo8 object detection algorithm and trained this algorithm with 50.000 annotated images which contains smoke or fire.When it comes to accuracy of our model, we have achieved 75% accuracy. Cameras would be installed high altitudes where they can monitor easly as wider as possible. Then cameras working hours will be 24/7 and when they capture smoke or fire they alerts firefighters whose headoffice is located nearest to the detected fire or smoke.In this way, the damage or risk of fire will be prevented.


                                        </div>
                                    
                                        </div>
                                </div>
                                
                                    
                                    
                            </div>        
                            ) 
                            :(
                            <div>

                                    <div className="text-center mt-20">
                                        <h1 className="text-[#37517E] text-2xl font-semibold">
                                            ABOUT PROJECT 
                                            <hr className="w-48 h-1 mx-auto  bg-gray-100 border-0 rounded my-2 dark:bg-gray-700" />
                                        </h1>
                                    </div>


                                    <div className="container  mx-auto w-full h-full">
                                    <div className="relative wrap overflow-hidden p-10 h-full">
                                        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left:'50%'}}></div>
                                        {/* <!-- right timeline --> */}
                                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                                        <div className="order-1 w-5/12"></div>
                                        <div className="z-20 flex items-center order-1 bg-gray-800  shadow-xl w-8 h-8 rounded-full">
                                            <h1 className="mx-auto font-semibold text-lg  text-white"><i class="fa-solid fa-circle-question"></i></h1>
                                        </div>
                                        <div className="order-1 bg-gray-50 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                            <h3 className="mb-3 font-bold text-gray-800 text-xl">How it works?</h3>
                                            <p className=" leading-snug tracking-wide text-gray-900 text-opacity-100">
                                                
                                            Our EFD project is ground-based camera networks which is used to detect fires early with cnn deep learning algorithm. We also use Yolo8 object detection algorithm and trained this algorithm with 50.000 annotated images which contains smoke or fire.When it comes to accuracy of our model, we have achieved 75% accuracy. Cameras would be installed high altitudes where they can monitor easly as wider as possible. Then cameras working hours will be 24/7 and when they capture smoke or fire they alerts firefighters whose headoffice is located nearest to the detected fire or smoke.In this way, the damage or risk of fire will be prevented.


                                                </p>
                                        </div>
                                        </div>

                                        {/* <!-- left timeline --> */}
                                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                        <div className="order-1 w-5/12"></div>
                                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                            <h1 className="mx-auto text-white font-semibold text-lg"><i class="fa-solid fa-lightbulb" ></i></h1>
                                        </div>
                                        <div className="order-1 bg-gray-50 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                            <h3 className="mb-3 font-bold text-gray-800 text-xl">EFD can be solutions to following problems</h3>
                                            <p className=" font-medium leading-snug tracking-wide text-gray-800 text-opacity-100">
                                                <div>Early fire detection (EFD) systems can be a vital component to business facilities and places of employment. These systems are responsible for protecting lives and property while reducing the effects of a fire. By detecting the presence of a fire in its early stages, these smart EFD systems can alert building occupants and emergency responders with ample time to take appropriate action and extinguish the fire or evacuate the building.</div>
                                                <div className="mt-2">
                                                Moreover, Wildfires also pose a significant threat to both humans and wildlife. They destroy large rural and wildland areas, causing a huge loss of lives and assets. As a result, the capability to detect the occurrence of a wildfire is of utmost importance.
Unfortunately today many wildfire detection systems rely on manual judgment. This could lead to a serious consequence: latency in alerting related parties. While governments are putting in more resources to firefighting, the average size of wildfire continues to increase.


                                                </div>
                                            </p>
                                        </div>
                                        </div>
                                        
                                        
                                    </div>
                                    </div>

                            </div>
                            )}






                </section>







                <section className="h-screen bg-gray-100" ref={section4Ref}>
                                
                                    <div className="text-center pt-20 pb-20">
                                        <h1 className="text-[#37517E] text-4xl font-semibold">
                                            Sample Videos 
                                            <hr className="w-48 h-1 mx-auto  bg-gray-100 border-0 rounded my-2 dark:bg-gray-700" />
                                        </h1>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        
                                        
                                        <div className="text-[#37517E]">
                                                <h1 className="text-[#37517E] text-3xl text-center">
                                                Sample videos detected with <span className="font-bold">our model</span>.
                                                </h1>
                                                <p className="mt-16 text-center mb-9">
                                                    In here, there is a list of some videos that fire and smoke detected with our optimised yolov8 based EFD (EarlyFireDetection) model.

                                                    Raw video materials downloaded from: https://t.me/Qoraxabar, https://t.me/BIRINCHI_UZ
                                                </p>

                                        </div>


                                        <div>

                                        <iframe className="xl:h-[600px] lg:h-[400px] md:h-[400px] sm:h-[500px] xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[400px]" src="https://www.youtube.com/embed/videoseries?si=4fKBNJjIhy9T9yR1&amp;list=PLBi9zeOPl2kSbUsyChFOfOprroC0KQjNb" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen=""></iframe>
                                        </div>


                                    </div>

                </section>

                <section className="bg-white " ref={section5Ref}>
                                    <div className="text-center pt-20 pb-20">
                                        <h1 className="text-[#37517E] text-4xl font-semibold">
                                            Services 
                                            <hr className="w-48 h-1 mx-auto  bg-gray-100 border-0 rounded my-2 dark:bg-gray-700" />
                                        </h1>
                                        <h2 className="pt-2 text-lg text-[#37517E]">
                                        EarlyFireDetection project can be used to detect fires which occure in forest areas, residential areas, industrial areas, as well as minign areas.
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto pb-20  gap-4 md:w-6/12 ">
                                                <div className="w-96 shadow hover:shadow-xl h-96 rounded-xl transition duration-2000">
                                                    <img className="rounded-xl " src="https://greenglobaltravel.com/wp-content/uploads/2018/04/Gondwana-Rainforest-Biggest-Forest-feature-update.jpg" alt="" />
                                                   <h1 className="text-[#37517E] font-semibold text-center mt-9"> Detecting fire in forest areas early</h1>
                                                </div>

                                                <div className="w-96 shadow hover:shadow-xl h-96 rounded-xl transition duration-2000">
                                                    <img className="rounded-xl " src="https://www.ibuildnew.com.au/blog/wp-content/uploads/2019/11/AdobeStock_152635746-1-800x484.jpeg" alt="" />
                                                   <h1 className="text-[#37517E] font-semibold text-center mt-9"> Detecting fire in residential areas early</h1>
                                                </div>

                                                <div className="w-96 shadow hover:shadow-xl h-96 rounded-xl transition duration-2000">
                                                    <img className="rounded-xl " src="https://tomorrow.norwalkct.org/wp-content/uploads/2020/05/Industrial-zones-scaled.jpeg" alt="" />
                                                   <h1 className="text-[#37517E] font-semibold text-center mt-9"> Detecting fire in industrial areas early</h1>
                                                </div>

                                                <div className="w-96 shadow hover:shadow-xl h-96 rounded-xl transition duration-2000">
                                                    <img className="rounded-xl " src="https://sustainability.hapres.com/images/JSR_1021_Fig3.jpg" alt="" />
                                                   <h1 className="text-[#37517E] font-semibold text-center mt-9"> Detecting fire in mining areas early</h1>
                                                </div>
                                    </div>

                </section>  
 


            </main>


                <footer className="relative bg-[#37517E]  pt-8 pb-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-white text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl fonat-semibold text-white">Early Fire Detection</h4>
                        <h5 className="text-lg mt-0 mb-2 text-white">
                        Phone: +998 911064233 <br />
                        Email: asliddinmalikov999@gmail.com
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6">
                        <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-twitter"></i></button><button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-facebook-square"></i></button><button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-dribbble"></i></button><button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-github"></i>
                        </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                        <div className="w-full lg:w-4/12 px-4 ml-auto">
                            <span className="block uppercase text-white text-sm font-semibold mb-2">Useful Links</span>
                            <ul className="list-unstyled">
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="h#">About Us</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Blog</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Github</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Free Products</a>
                            </li>
                            </ul>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                            <span className="block uppercase text-white text-sm font-semibold mb-2">Services</span>
                            <ul className="list-unstyled">
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Detecting fires early in forest areas</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Detecting fires early in residential areas</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Detecting fires early in mining areas</a>
                            </li>
                            <li>
                                <a className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Detecting fires early in private sectors</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <hr className="my-6 border-blueGray-300"/>
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-white font-semibold py-1">
                        Copyright © <span id="get-current-year">2023</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                </footer>
        </div>
        
    )
}