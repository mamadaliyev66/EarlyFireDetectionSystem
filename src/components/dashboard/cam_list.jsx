
import React, { useEffect, useState } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

export default function CamList({user_id}) {
    const [detections, setDetections] = useState(0);
    const [truePositives, setTruePositives] = useState(0);
    
    const [cameraName, setCameraName] = useState("");
    const [filteredDetectedData, setFilteredDetectedData] = useState([]);
    const [accuracy,setAccuracy]=useState(0)
    
    const [cameras, setCameras] = useState()
    const fetchDataFromFirestore = async () => {

      try {
        var cam={}
        const q = query(collection(db, "Cameras"), where("user_online_id", "==", user_id));
        const querySnapshot = await getDocs(q);
        
        let docs=[]
        querySnapshot.forEach((doc)=>{
            docs.push(doc.data()) 
        })
        docs.reverse()
        setCameras(docs)
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
        
    fetchDataFromFirestore();
      }, [user_id]);
      
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
      
      function calculateDistanceFromCurrentLocationToFirestore(firestoreLatitude,firestoreLongitude,i) {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const myLatitude = position.coords.latitude;
            const myLongitude = position.coords.longitude;
      // Replace with your Firestore longitude
      
            const distance = getDistanceFromLatLonInKm(
              myLatitude,
              myLongitude,
              firestoreLatitude,
              firestoreLongitude
            );
            const distanceElement = document.getElementById("distance"+String(i));
            distanceElement.textContent = distance.toFixed(2); // Set the distance to the HTML element

          }, (error) => {
            console.error('Error getting current position:', error);
          });
        } else {
          console.error('Geolocation is not supported in this browser.');
        }
      }
      
      const fetchDetectedData = async (cameraName,i) => {
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
          const detectElement = document.getElementById("detections"+String(i));
          detectElement.textContent=String(Math.ceil((100/detectedData.length)*postives))+"%"+" ("+String(postives)+"/"+String(detectedData.length)+")"
          // Use the detectedData array containing documents where camera_name matches
          setAccuracy(Math.ceil((100/detectedData.length)*postives))
          return detectedData;
        } catch (error) {
          console.error("Error fetching detected data:", error);
          return [];
        }
      };

 
  return (
    <div>

        <main className="text-4xl mt-20 text-center">
            <h1>Section to check all cameras</h1>
        </main>

            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 my-16 p-4">
        <div className="h-full">
            {/* <!-- Table - /-> */}
            <div className="w-full   bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b ">
                    <h2 className="font-semibold text-gray-800 text-right">Search Camera: <input className='border rounded-xl sm:mx-6 ' value={cameraName} onChange={(e) => setCameraName(e.target.value)} type="search" placeholder='camera title . . .'/></h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">#</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Camera Title</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">City</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Disance</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Added Date</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Accuracy (True Positives / Total detecting)</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                              
                              
                                {cameras?(cameras.map((camera,i)=>{
                                    let addedDate = new Date(camera.added_date.toDate()).toDateString()

                                    let coordinates = camera.location
                                    const [latitude, longitude] = coordinates.split(",").map(Number);

                                    fetchDetectedData(camera.camera_name,i)
                                    calculateDistanceFromCurrentLocationToFirestore(latitude,longitude,i);
                                    return(
                                        <tr className="hover:bg-gray-100 hover:cursor-pointer" key={i}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="font-medium text-gray-800">{i}</div>
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap text-[#37517E]">
                                       <Link to={`/camera-details/${camera.camera_name}`}>
                                            <div title="Camera Details" className="text-left">{camera.camera_name}</div>
                                        </Link>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left font-medium text-green-500">{camera.city}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center"> <span id={"distance"+String(i)}></span> km</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center">{
                                                addedDate
                                            }</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center"><span id={"detections"+String(i)}></span></div>
                                        </td>
                                    </tr>        
                                    )
                                    })):(<>Looks like you don't have any cameras :) </>)
                                }

                               
                                                
                                            

                                  

                                        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>







    </div>
  )
}
