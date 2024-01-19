import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import {BiListCheck,BiSolidCalendarWeek,BiCalendar} from 'react-icons/bi'

export default function Base({ user_id }) {
  


  // chart data
  const [chartData, setChartData] = useState([]);
  
  
  // Last Month Count
  const [detectionsLastMonth, setDetectionsLastMonth] = useState(0);
  const [truePositivesLastMonth, setTruePositivesLastMonth] = useState(0);


  // Last week Count
  const [detectionsLastWeek, setDetectionsLastWeek] = useState(0);
  const [truePositivesLastWeek, setTruePositivesLastWeek] = useState(0);
  
  // total count
  const [allDetectionsCount, setAllDetectionsCount] = useState(0)
  const [totalTruepositive, setTotalTruepositive] = useState(0)
  const [totalAccuracy, setTotalAccuracy] = useState(0)


  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const q = query(collection(db, "Detected"), where("online_user_id", "==", user_id));
        const querySnapshot = await getDocs(q);

        const counts = {};
        
        var truepositive=0

        var count_detections=0;

        querySnapshot.forEach((doc) => {
          const detectedDate = new Date(doc.data().detected_time.toDate()).toLocaleDateString('en-US', { dateStyle: 'medium' });
          
          counts[detectedDate] = (counts[detectedDate] || 0) + 1;
          
          if(doc.data().accuracy==1){
            truepositive++
          }
          count_detections++
          
        });
        


        const formattedChartData = Object.entries(counts).map(([date, count]) => ({
          x: date,
          y: count,
        }));
        
        let detectionsCount = 0;
        let truePositivesCount = 0;

        let lastMonthDetectionsCount = 0;
        let lastMonthTruePositivesCount = 0;

        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 31);

        querySnapshot.forEach((doc) => {
          const detectedDate = new Date(doc.data().detected_time.toDate());

          if (detectedDate >= lastWeek && detectedDate <= today) {
            detectionsCount++;

            // Calculate true positives for last week
            const accuracy = doc.data().accuracy;
            if (accuracy === 1) {
              truePositivesCount++;
            }
          }
          if (detectedDate >= lastMonth && detectedDate <= today) {
            lastMonthDetectionsCount++;

            // Calculate true positives for last week
            const accuracy = doc.data().accuracy;
            if (accuracy === 1) {
              lastMonthTruePositivesCount++;
            }
          }
          
        }
        );
        setDetectionsLastMonth(lastMonthDetectionsCount);
        setTruePositivesLastMonth(lastMonthTruePositivesCount);
        setDetectionsLastWeek(detectionsCount);
        setTruePositivesLastWeek(truePositivesCount);



    
    
        setAllDetectionsCount(count_detections);

        // Sort the dates in ascending order
        formattedChartData.sort((a, b) => new Date(a.x) - new Date(b.x));

        // Fill in missing dates with zero counts
        const allDates = getAllDatesBetween(querySnapshot);
        allDates.forEach(date => {
          if (!counts[date]) {
            formattedChartData.push({ x: date, y: 0 });
          }
        });

        // Sort again after adding zero counts
        formattedChartData.sort((a, b) => new Date(a.x) - new Date(b.x));

        setChartData(formattedChartData);
        setTotalTruepositive(truepositive)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirestore();
    

  }, [user_id]);

  const getAllDatesBetween = (querySnapshot) => {
    const allDates = [];
    querySnapshot.forEach((doc) => {
      const detectedDate = new Date(doc.data().detected_time.toDate()).toLocaleDateString('en-US', { dateStyle: 'medium' });
      allDates.push(detectedDate);
    });
    return [...new Set(allDates)]; // Return unique dates
  };

  const options = {
    animationEnabled: true,
    chart: {
      id: "basic-line",
    },
    xaxis: {
      type: 'Detected Date',
      categories: chartData.map(dataPoint => dataPoint.x),
    },
  };

  const series = [
    {
      name: "Detections count",
      data: chartData.map(dataPoint => dataPoint.y),
    },
  ];




  return (
    <>
    <div className="app border border-gray-600 rounded-xl p-3">
      {options.xaxis.categories==''?(<div className="text-xl text-center">Looks Like You Don't have any Detections :)</div>):(<></>)}
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series}  type="line" />
        </div>
      </div>
    </div>
    <div>
          <h1></h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-20 mx-auto '>
                
                {/* Total */}
                <div className='shadow hover:shadow-xl border border-gray-400 rounded-xl transition duration-2000 pl-3 pt-4 pb-3  text-[#37517E] grid grid-cols-2'>
                    <div>
                          <h1 className="text-3xl font-bold">Total</h1>
                          <div className="mt-3 text-xl space-y-3">
                              <h2>Detected : <span className="font-bold">{allDetectionsCount}</span></h2>
                              <h2>Positive : <span className="font-bold">{totalTruepositive}</span></h2>
                              <h2>Negative : <span className="font-bold">{allDetectionsCount-totalTruepositive}</span></h2>
                              <h2>Accuracy : <span className="font-bold">{Math.ceil((100/allDetectionsCount)*totalTruepositive)}%</span></h2>
                          </div>        
                      </div>
                      <div>
                              <BiListCheck className="text-6xl mx-auto my-9"/>
                      </div>
                </div>

                
                {/* Last Month */}
                <div className='shadow hover:shadow-xl border border-gray-400 rounded-xl transition duration-2000 pl-3 pt-4 pb-3  text-[#37517E] grid grid-cols-2'>
                    <div>
                          <h1 className="text-3xl font-bold">Last Month</h1>
                          <div className="mt-3 text-xl space-y-3">
                              <h2>Detected : <span className="font-bold">{detectionsLastMonth}</span></h2>
                              <h2>Positive : <span className="font-bold">{truePositivesLastMonth}</span></h2>
                              <h2>Negative : <span className="font-bold">{detectionsLastMonth-truePositivesLastMonth}</span></h2>
                              <h2>Accuracy : <span className="font-bold">{Math.ceil((100/detectionsLastMonth)*truePositivesLastMonth)}%</span></h2>
                          </div>        
                      </div>
                      <div>
                              < BiCalendar className="text-6xl mx-auto my-9"/>
                      </div>
                </div>



                
                {/* Last Week */}
                <div className='shadow hover:shadow-xl border border-gray-400 rounded-xl transition duration-2000 pl-3 pt-4 pb-3  text-[#37517E] grid grid-cols-2'>
                    <div>
                          <h1 className="text-3xl font-bold">Last Week</h1>
                          <div className="mt-3 text-xl space-y-3">
                              <h2>Detected : <span className="font-bold">{detectionsLastWeek}</span></h2>
                              <h2>Positive : <span className="font-bold">{truePositivesLastWeek}</span></h2>
                              <h2>Negative : <span className="font-bold">{detectionsLastWeek-truePositivesLastWeek}</span></h2>
                              <h2>Accuracy : <span className="font-bold">{Math.ceil((100/detectionsLastWeek)*truePositivesLastWeek)}%</span></h2>
                          </div>        
                      </div>
                      <div>
                              < BiSolidCalendarWeek className="text-6xl mx-auto my-9"/>
                      </div>
                </div>

          </div>
      </div>

    </>);
}
