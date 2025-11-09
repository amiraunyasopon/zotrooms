'use client';

import Navbar from "../components/Navbar"
import { useState, useEffect } from 'react';
import { fetchRooms, fetchRoom } from "./api/user-api";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';


import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function MainPage() {
    const [data, setData] = useState([]);
    const [buildings, setBuildings] = useState({ LangsonLibrary: true, ScienceLibrary: true, GatewayStudyCenter: true, MultimediaResourcesCenter: true, GrunigenMedicalLibrary: true });
    const [minCapacity, setMinCapacity] = useState(1000);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [day, setDay] = useState(null);
    // all buttons for buildings initially are selected
    // if a button is selected it turns the value for the building true
    // if unselected it turns the value for the building false


    // if a capacity is selected, make sure to map through study rooms and only pass study rooms with capacities >= minCapacity


    // if a date is selected, make sure to map through study rooms and only pass study rooms which have at least one slot on the day that isAvailable = true


    // check for slots between start time and end time, if all slots are available, it passes the map check


    useEffect(() => {
        const getData = async () => {
            try {
                const json = await fetchRooms();
                setData(json.data);
                console.log('getData', json.data);
            } catch (error) {
                console.error("Error fetching room data. ", error);
            }
        }
        getData();
    }, [])


  
       const handleLocationChange = (e, type) => {
        
        let newVal = e.target.checked
        setBuildings((old) => ({
            ...old,
            [type]: newVal
        }))
    
}



    return (
        <>
            <div className="min-h-screen w-screen">
                
                


                <div className="bg-[#255799] w-1/4 h-full  relative overflow-auto">
               <div className="flex flex-row items-center">
                   <img src="logo.png"  className=" h-2/3 w-2/3 "></img>
               <h1 className="text-[1.90vw] font-serif text-white font-extrabold overflow-hidden w-3/4" >Zot Rooms</h1></div>
           <h2 className="text-[1.10vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-center" >Select Date</h2>
      
      
               <LocalizationProvider dateAdapter={AdapterDayjs}>
           
                 <DateCalendar value={day} onChange={(newDay) => setDay(newDay)} className="text-white" />
             
           </LocalizationProvider>
      
      
      
      
           <h2 className="text-[1.10vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-center" >Select Time</h2>
           <div className="w-full flex flex-row justify-center gap-7"> <input
               type="time"
               id="startTime" onChange={(e) => setStartTime(e.target.value)}/>
      
      
           <input
               type="time"
               id="endTime" onChange={(e) => setEndTime(e.target.value)}/> </div>
      
      
           <h2 className="text-[1.10vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-center mt-5" >Select Location</h2>
         
      
      
           <FormGroup className='w-full  flex flex-col items-center'>
           <FormControlLabel control={<Checkbox defaultChecked />} label="Science Library" onChange={(e) => handleLocationChange(e, "ScienceLibrary")} className='w-2/3 flex justify-start'/>
           <FormControlLabel control={<Checkbox defaultChecked />} label="Langson Library" onChange={(e) => handleLocationChange(e, "LangsonLibrary")} className='w-2/3 flex justify-start'/>
           <FormControlLabel control={<Checkbox defaultChecked />} label="Gateway Study Center" onChange={(e) => handleLocationChange(e, "GatewayStudyCenter")} className='w-2/3 flex justify-start'/>
           <FormControlLabel control={<Checkbox defaultChecked />} label="Multimedia Resources Center" onChange={(e) => handleLocationChange(e, "MultimediaResourcesCenter")} className='w-2/3 flex justify-start'/>
           <FormControlLabel control={<Checkbox defaultChecked />} label="Grunigen Medical Library" onChange={(e) => handleLocationChange(e, "GrunigenMedicalLibrary")} className='w-2/3 flex justify-start'/>
           </FormGroup>
         
         
      
      
           </div>


                <div>
                    <h1>Science Library</h1>
                    {
                        buildings.ScienceLibrary ?
                            data.filter((room) =>
                                room.location === "Science Library"
                            )
                                .map((item) =>
                                    <div key={item.id}>{item.id}</div>
                                )
                            :
                            <div> No Rooms Available for SL</div>
                    }
                    <h1>Langston Library</h1>
                    {
                        buildings.LangsonLibrary ?
                            data.filter((room) =>
                                room.location === "Langson Library"
                            )
                                .map((item) =>
                                    <div key={item.id}>{item.id}</div>
                                )
                            :
                            <div> No Rooms Available for LL</div>
                    }
                    <h1>Gateway Study Center</h1>
                    {
                        buildings.GatewayStudyCenter ?
                            data.filter((room) =>
                                room.location === "Gateway Study Center"
                            )
                                .map((item) =>
                                    <div key={item.id}>{item.id}</div>
                                )
                            :
                            <div> No Rooms Available for GSC</div>
                    }
                    <h1>Multimedia Resources Center</h1>
                    {
                        buildings.MultimediaResourcesCenter ?
                            data.filter((room) =>
                                room.location === "Multimedia Resources Center"
                            )
                                .map((item) =>
                                    <div key={item.id}>ITEM {item.id}</div>
                                )
                            :
                            <div> No Rooms Available for MRC</div>
                    }
                    <h1>Grunigen Medical Library</h1>
                    {
                        buildings.GrunigenMedicalLibrary ?
                            data.filter((room) =>
                                room.location === "Grunigen Medical Library"
                            )
                                .map((item) =>
                                    <div key={item.id}>{item.id}</div>
                                )
                            :
                            <div> No Rooms Available for GML</div>
                    }
                </div>
            </div>
        </>
    )
}