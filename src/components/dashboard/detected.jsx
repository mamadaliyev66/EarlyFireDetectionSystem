import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { Link } from 'react-router-dom'




export default function Detected({user_id}) {

  const [detections,setDetections] =useState()
  const fetchDataFromFirestore = async () => {

 

  
  
    try {
     
      const q = query(collection(db, "Detected"), where("online_user_id", "==", user_id));
      const querySnapshot = await getDocs(q);
      
      let docs=[]
      querySnapshot.forEach((doc)=>{
          docs.push(doc.data()) 
      })
      docs.reverse()
      setDetections(docs)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
    fetchDataFromFirestore()
  },[])


 
  return (
    <div>

        <div>


                  <h1 className='text-4xl text-center  text-[#37517E]'>
                    Section to check all detected fire alerts
                  </h1>

        </div>

        <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 my-16 p-4">
        <div className="h-full">
            {/* <!-- Table - /-> */}
            <div className="w-full   bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b ">
                    <h2 className="font-semibold text-gray-800 text-right">Search Camera: <input className='border rounded-xl sm:mx-6 '  type="search" placeholder='camera title . . .'/></h2>
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
                                        <div className="font-semibold text-left">Images</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Accuracy</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Added Date</div>
                                    </th>
                                   
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                              
                              
                           
                               
                                    {detections?(detections.map((detection,i)=>{
                                    let addedDate = new Date(detection.detected_time.toDate()).toDateString()
                                     
                                    return(
                                      <tr key={i} className="hover:bg-gray-100 hover:cursor-pointer">
                                      <td className="p-2 whitespace-nowrap">
                                          <div className="flex items-center">
                                              <div className="font-medium text-gray-800">1</div>
                                          </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap text-[#37517E]">
                                     <Link to={`/camera-details/$`}>
                                          <div title="Camera Details" className="text-left text-xl">TashCamera - 1</div>
                                      </Link>
                                      </td>
                                      
                                      <td className="p-2 whitespace-nowrap">
                                          <div className="text-left font-medium text-green-500">
                                              <span className='border border-green-500 hover:bg-green-500 hover:text-white transition duration-3000 p-2 rounded-xl'>Captured Image</span> 

                                          
                                                              
                                                           
                          
                                                    
                                              <span className='border border-green-500 hover:bg-green-500 hover:text-white transition duration-3000 p-2 rounded-xl'>Detected Image</span>
                                              
                                          </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                          <div className="text-lg text-center"> {detection.accuracy>0?(<h1 className="text-lg rounded text-white hover:border hover:border-green-500 transition duration-3000 hover:bg-white bg-green-500 hover:text-green-500">True</h1>):(<h1 className="text-lg rounded text-white hover:border hover:border-rose-500 transition duration-3000 hover:bg-white bg-rose-500 hover:text-rose-500">False</h1>)}</div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                          <div className="text-lg text-center">
                                              {addedDate}
                                          </div>
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
