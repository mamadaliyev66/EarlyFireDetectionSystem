import React from 'react'
import { useParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline ,useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet'  
import { collection, query, where, getDocs,deleteDoc,updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

export default function CameraDetails() {
    const params=useParams()
    const cameraName =params.camera_name 
    const [camera,setCamera] = useState()
    // console.log(cameraName);

    const [currentPosition, setCurrentPosition] = useState([0, 0]);
    const [destination, setDestination] = useState([0,0]); // Example custom destination coordinates
    const [loading, setLoading] = useState(true);
    const [polyline, setPolyline] = useState([]);
  
    const [distance, setDistance] = useState(0)
    
    const [totalDetected, setTotalDetected] = useState(0)
    const [truePositives,setTruePositives]=useState(0)
    const [accuracy,setAccuracy]=useState(0)

    const [added,setAdded]=useState()

    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
 

    const [markerPosition, setMarkerPosition] = useState([]); 


    const StringMarkerPosition=markerPosition.toString()
    const [cameraTitle,setCameraTitle]=useState()
    const [webAddress,setWebAddress] = useState()
    const [cameraCity,setCameraCity] = useState()

    const handleOpen = () => {setOpen(!open);open?(deleteDocument()):(<></>)}
    const handleOpenUpdate = () => {setOpenUpdate(!openUpdate);openUpdate?(updateDocuments()):(<></>)};
    const handleOpenUpdateCancel=()=>setOpenUpdate(!openUpdate);
    
    useEffect(() => {
        fetchDataFromFirestore();
        
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentPosition([latitude, longitude]);
              setLoading(false);
            },
            (error) => {
              console.error('Error getting current position:', error);
              alert('Geolocation permission denied. Please allow access to show your location.');
              setLoading(false);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          alert('Geolocation is not supported by this browser.');
          setLoading(false);
        }
      };
  
      getLocation();
    }, []);
  
    useEffect(() => {
      const getRoute = async () => {
        if (currentPosition[0] !== 0 && destination[0] !== 0) {
          const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${currentPosition[1]},${currentPosition[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`);
          const data = await response.json();
          if (data.code === 'Ok') {
            setPolyline(data.routes[0].geometry.coordinates);
          } else {
            console.error('Error fetching route:', data);
          }
        }
      };
  
      getRoute();
      calculateDistanceFromCurrentLocationToFirestore()
      fetchDetectedData()
    }, [currentPosition, destination]);
    

    const fetchDataFromFirestore = async () => {

        try {
          var cam={}
          const q = query(collection(db, "Cameras"), where("camera_name", "==", cameraName));
          const querySnapshot = await getDocs(q);
          
          let docs=[]
          querySnapshot.forEach((doc)=>{
            
            let location=doc.data().location;
            const [latitude, longitude] = location.split(",").map(Number);
                setDestination(
                    [latitude, longitude]
                )
                setMarkerPosition([latitude, longitude])


           
            setCamera(doc.data())           
        })
          
  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };





// calculate the distance 

function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  
  function calculateDistanceFromCurrentLocationToFirestore() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const myLatitude = position.coords.latitude;
        const myLongitude = position.coords.longitude;
  // Replace with your Firestore longitude
  
        const distance = getDistanceFromLatLonInKm(
          myLatitude,
          myLongitude,
          destination[0],
          destination[1]
        );
        setDistance(distance.toFixed(2))
      }, (error) => {
        console.error('Error getting current position:', error);
      });
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }









  const fetchDetectedData = async () => {
    try {
      const q = query(collection(db, "Detected"), where("camera_name", "==", cameraName));
      const querySnapshot = await getDocs(q);
  
      const detectedData = [];
      let accuracy = 0;
      let postives=0;
      querySnapshot.forEach((doc) => {
        detectedData.push(doc.data());
        if(doc.data().accuracy==1){
            postives++
        }
    });
    setTotalDetected(detectedData.length)
    setTruePositives(postives)
    setAccuracy(Math.ceil((100/detectedData.length)*postives))
    const addedDate = new Date(camera?.added_date.toDate()).toDateString();
    setAdded(addedDate)
      // Use the detectedData array containing documents where camera_name matches
      return detectedData;
    } catch (error) {
      console.error("Error fetching detected data:", error);
      return [];
    }
  };
  
  const theme = {
    dialog: {
      defaultProps: {
        size: "md",
        dismiss: {},
        animate: {
          unmount: {},
          mount: {},
        },
        className: "",
      },
      valid: {
        sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
      },
      styles: {
        base: {
          backdrop: {
            display: "grid",
            placeItems: "place-items-center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "w-screen",
            height: "h-screen",
            backgroundColor: "bg-black",
            backgroundOpacity: "bg-opacity-60",
            backdropFilter: "backdrop-blur-sm",
          },
          container: {
            position: "relative",
            bg: "bg-white",
            m: "m-4",
            borderRadius: "rounded-lg",
            boxShadow: "shadow-2xl",
            color: "text-blue-gray-500",
            fontSmoothing: "antialiased",
            fontFamily: "font-sans",
            fontSize: "text-base",
            fontWeight: "font-light",
            lineHeight: "leading-relaxed",
          },
        },
        sizes: {
          xs: {
            width: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4",
            minWidth: "min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%]",
            maxWidth: "max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]",
          },
          sm: {
            width: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3",
            minWidth: "min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%]",
            maxWidth: "max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]",
          },
          md: {
            width: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5",
            minWidth: "min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%]",
            maxWidth: "max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]",
          },
          lg: {
            width: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5",
            minWidth: "min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%]",
            maxWidth: "max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]",
          },
          xl: {
            width: "w-full md:w-5/6 2xl:w-3/4",
            minWidth: "min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%]",
            maxWidth: "max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]",
          },
          xxl: {
            display: "flex",
            flexDirection: "flex-col",
            width: "w-screen",
            minWidth: "min-w-[100vw]",
            maxWidth: "max-w-[100vw]",
            height: "h-screen",
            minHeight: "min-h-[100vh]",
            maxHeight: "max-h-[100vh]",
            m: "m-0",
            borderRadius: "rounded-none",
          },
        },
      },
    },
  };
  



  // Initial marker position
 
  const handleMarkerDrag = (e) => {
    
    setMarkerPosition([e.target._latlng.lat, e.target._latlng.lng]);
    // Use markerPosition for any updates or tracking of coordinates
    
  };

  const ChangeView = ({ center }) => {
    const map = useMapEvents({
      dragend: () => {
        const newCenter = map.getCenter();
        setMarkerPosition([newCenter.lat, newCenter.lng]);

      },
    });
    map.setView(center, map.getZoom());
    return null;
  };

  


  const deleteDocument = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Cameras"), where("camera_name", "==", cameraName))
      );
  
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
  
      // Perform any additional tasks after deletion
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };




  const updateDocuments = async () => {
    try {
      
  
      if (!cameraTitle || !cameraCity || !StringMarkerPosition || !webAddress) {
        alert("Invalid data. Please fill in all fields.");
        return; // Stop execution if any field is empty
      }
  
      const querySnapshot = await getDocs(
        query(collection(db, "your_collection_name"), where("camera_name", "==", cameraName))
      );
  
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          camera_name: cameraTitle,
          city: cameraCity,
          location: StringMarkerPosition,
          web_address: webAddress,
        });
      });
      // Perform any additional tasks after update

      window.location.href='/dashboard/'
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  };
  

  console.log(cameraTitle,webAddress,cameraCity,StringMarkerPosition);
  return (
    <div>

        <h1 className='text-3xl text-center text-[#37517E] mt-9'>Camera : <span className='font-bold sm:mr-6'>{cameraName}</span>    </h1>

        <div>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-4 ml-6 mr-6 mt-16'>
                        <div className=' w-full  col-span-2 space-y-6  '>
                                    <div className='border border-[#37517E] h-96  hover:shadow hover:shadow-2xl shadow-[#37517E] transition duration-2000 '>
                                        <h1 className='bg-[#37517E] p-4 text-xl text-white'>Statistics</h1>

                                        <div className='text-xl m-9 space-y-6 border border-gray-500 p-6 rounded'>
                                            <div className=' border-b border-gray-500 grid grid-cols-2'><h2>Total Detections</h2> <h2 className='text-right mr-3 font-semibold'>{totalDetected}</h2></div>
                                            <div className=' border-b border-gray-500 grid grid-cols-2'><h2>True Positives</h2> <h2 className='text-right mr-3 font-semibold'>{truePositives}</h2></div>
                                            <div className=' border-b border-gray-500 grid grid-cols-2'><h2>Accuracy</h2> <h2 className='text-right mr-3 font-semibold'>{accuracy}%</h2></div>
                                            
                                        </div>
                                    </div>
                                    <div className='border border-[#37517E]   hover:shadow hover:shadow-2xl shadow-[#37517E] transition duration-2000 '>
                                        <h1 className='bg-[#37517E] p-4 text-xl text-white'>About Camera</h1>
                                        <div className='text-xl m-9 space-y-6 border border-gray-500 p-6 rounded'>
                                            <div className=' border-b border-gray-500 grid grid-cols-2'><h2>Title:</h2> <h2 className='text-right mr-3 font-semibold'>{cameraName}</h2></div>
                                            <div className=' border-b border-gray-500 grid grid-cols-2'><h2>City:</h2> <h2 className='text-right mr-3 font-semibold'>{camera?.city}</h2></div>
                                            <div className=' border-b border-gray-500 grid grid-cols-2'><h2>Added:  </h2> <h2 className='text-right mr-3 font-semibold'>{added}</h2></div>
                                            
                                        </div>

                                        <div className='text-right sm:mr-6'>
                                           
                                                    <Dialog
                                                        open={open}
                                                        handler={handleOpen}
                                                        animate={{
                                                        mount: { scale: 1, y: 0 },
                                                        unmount: { scale: 0.9, y: -100 },
                                                        }}
                                                    >
                                                        <DialogHeader>Alert !</DialogHeader>
                                                        <DialogBody className='text-xl'>
                                                        Would You Like To Delete This Camera ?
                                                        </DialogBody>
                                                        <DialogFooter>
                                                        <Button
                                                            variant="text"
                                                            color="blue"
                                                            onClick={handleOpen}
                                                            className="mr-1"
                                                        >
                                                            <span>Cancel</span>
                                                        </Button>
                                                        <Button className='bg-rose-600' onClick={handleOpen}>
                                                            <span>Delete</span>
                                                        </Button>
                                                        </DialogFooter>
                                                    </Dialog>




                                                    {destination[0]?(<>
                                                    
                                                    
                                                        <button onClick={handleOpenUpdate} className='w-36 h-12 mb-6 m-2 text-blue-500  border-blue-500 border rounded text-xl hover:text-white hover:bg-blue-500 transition duration-4000'>Edit</button>
                                            <button onClick={handleOpen} className='w-36 h-12 mb-6 m-2 text-rose-500  border-rose-500 border rounded text-xl hover:text-white hover:bg-rose-500 transition duration-4000'>Delete</button>
                                            
                                                    <Dialog
                                                        open={openUpdate}
                                                        handler={handleOpenUpdate}
                                                        animate={{
                                                        mount: { scale: 1, y: 0 },
                                                        unmount: { scale: 0.9, y: -100 },
                                                        }}
                                                    >
                                                        <DialogHeader>Update Camera Info</DialogHeader>
                                                        <DialogBody className="h-[42rem] overflow-scroll ">
                                                        <div className='space-y-6'>
                                                            <h1>Camera Name: </h1>
                                                            <Input color="blue" value={cameraName} disabled title="You don't able to change camera name !" />
                                                            <h1>Camera Web Address: </h1>
                                                           
                                                            <Input color="purple" label={camera.web_address}  onChange={(e)=>{setWebAddress(e.target.value)}}    />
                                                            
                                                            <h1>City (camera placed): </h1>
                                                           
                                                            <Input color="indigo" label={camera.city}   onChange={(e)=>{setCameraCity(e.target.value)}}  />
                                                            <Input color="teal" label="Location" disabled   value={markerPosition}/>
                                                            <div style={{ height: "400px" }}>
                                                            <MapContainer center={markerPosition}   zoom={13} style={{ height: "100%" }}>
                                                                <ChangeView center={markerPosition} />
                                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                                <Marker
                                                                draggable={true}
                                                                position={markerPosition}
                                                                eventHandlers={{ dragend: handleMarkerDrag }}
                                                                />
                                                            </MapContainer>
                                                             </div>




                                                        </div>
                                                        </DialogBody>
                                                        <DialogFooter>
                                                        <Button
                                                            variant="text"
                                                            color="blue"
                                                            onClick={handleOpenUpdateCancel}
                                                            className="mr-1"
                                                        >
                                                            <span>Cancel</span>
                                                        </Button>
                                                        <Button className='bg-yellow-600' onClick={handleOpenUpdate}>
                                                            <span>Update</span>
                                                        </Button>
                                                        </DialogFooter>
                                                    </Dialog>
                                                    </>):(<>loading .  .  .</>)} 

                                        </div>
                                    </div>
                            </div>
                        
                        <div className=' w-full  col-span-3 border border-[#37517E] border-2  '>
                            <div className='pl-3 pt-3 pb-3 bg-[#37517E] text-white grid grid-cols-2'>
                                <h1 className='ml-3'>Location</h1>
                                <h1 className='text-right mr-9'>{distance}km </h1>
                            </div>


                            <div>
                           
                           
                           
                            <div className=' h-[40rem] m-6'>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <MapContainer center={currentPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; OpenStreetMap contributors"
                                    />
                                    <Marker position={currentPosition}>
                                        <Popup>
                                        Your current location! Change this with your content.
                                        </Popup>
                                    </Marker>
                                    <Marker position={destination} >
                                        <Popup>
                                        {cameraName}
                                        </Popup>
                                    </Marker>
                                    {polyline.length > 0 && <Polyline positions={polyline.map(coord => [coord[1], coord[0]])} color="red" />}
                                    </MapContainer>
                                )}
                                </div>
                                                            
                                                            
                                                            
                           
                           
                           
                           
                           
                           
                           

                            
                            </div>
                        </div>

                </div>

        </div>


    </div>
  )
}
