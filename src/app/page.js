'use client';

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
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [day, setDay] = useState("2025-11-08");
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

    const compareTime = (timeOne, timeTwo) => {
        const timeToDate = (time) => {
            const [hours, minutes, seconds] = time.split(":").map(Number);
            const date = new Date(); 
            date.setHours(hours, minutes, seconds || 0, 0);
            return date;
        };

        const dateOne = timeToDate(timeOne);
        const dateTwo = timeToDate(timeTwo);

        return dateOne >= dateTwo;
    };

    useEffect(() => {
        console.log('startTime changed:', startTime)
    }, [startTime])

    useEffect(() => {
        console.log('endTime changed:', endTime)
    }, [endTime])

    useEffect(() => {
        console.log('day changed:', day)
    }, [day])

    return (
        <>
            <div className="min-h-screen w-screen">




                <div className="bg-[#255799] w-1/4 h-full  fixed  l-0 overflow-y-auto overflow-x-hidden">
                <div className="flex flex-row items-center">
                       <img src="logo.png" className="h-1/2 w-1/2 "></img>
                       <h1 className="text-[1.90vw] font-serif text-white font-extrabold overflow-hidden w-3/4" >Zot Rooms</h1></div>
                   <h2 className="text-[1.40vw] font-serif text-white font-bold overflow-hidden w-full text-start ml-5 mb-3" >Select Date</h2>




                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DateCalendar
                           value={dayjs(day)}
                          
                           onChange={(newDay) => {
                               setDay(newDay.format('YYYY-MM-DD'))
                           }}
                          
                           className="text-black bg-white/50 rounded-md"
                          
                       />
                   </LocalizationProvider>








                   <h2 className="text-[1.40vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-start ml-5 mb-3 mt-5" >Select Time</h2>
                   <div className="w-full flex flex-row justify-start gap-3 ml-5 items-center"> <input
                       type="time"
                       id="startTime" onChange={(e) => setStartTime(e.target.value)}
                       className='bg-white/50 rounded-lg hover:bg-white/30 p-3'
                       />


                           {" to "}
                       <input
                           type="time"
                           id="endTime" onChange={(e) => setEndTime(e.target.value)} className='bg-white/50 rounded-lg hover:bg-white/30 p-3'/> </div>




                   <h2 className="text-[1.40vw] font-serif text-white font-bold overflow-hidden w-3/4 w-full text-start ml-5 mb-3 mt-5" >Select Location</h2>






                   <FormGroup className='w-full  flex flex-col items-start ml-5'>
                       <FormControlLabel control={<Checkbox defaultChecked />} label="Science Library" onChange={(e) => handleLocationChange(e, "ScienceLibrary")} className='w-2/3 flex justify-start  ' />
                       <FormControlLabel control={<Checkbox defaultChecked />} label="Langson Library" onChange={(e) => handleLocationChange(e, "LangsonLibrary")} className='w-2/3 flex justify-start  ' />
                       <FormControlLabel control={<Checkbox defaultChecked />} label="Gateway Study Center" onChange={(e) => handleLocationChange(e, "GatewayStudyCenter")} className='w-2/3 flex justify-start  ' />
                       <FormControlLabel control={<Checkbox defaultChecked />} label="Multimedia Resources Center" onChange={(e) => handleLocationChange(e, "MultimediaResourcesCenter")} className='w-2/3 flex justify-start ' />
                       <FormControlLabel control={<Checkbox defaultChecked />} label="Grunigen Medical Library" onChange={(e) => handleLocationChange(e, "GrunigenMedicalLibrary")} className='w-2/3 flex justify-start ' />
                   </FormGroup>




                </div>


                <div className='w-3/4 fixed right-0 h-full bg-yellow-400 overflow-auto'>
                    <h1 className="ml-10 text-2xl font-serif">Science Library</h1> 
                    <div className="w-4/4 h-1/2 bg-yellow-400 flex flex-row gap-2 overflow-auto ml-10">
                    {
                        buildings.ScienceLibrary ? (
                            startTime && endTime ?
                                // if has startTime AND endTime, filter by day, availability, and startTime AND endTime
                                data.filter((room) =>
                                    room.location === "Science Library" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable && compareTime(slot.start.split("T")[1].split("+")[0], startTime) && compareTime(endTime, slot.end.split("T")[1].split("+")[0]) })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-32 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799] 
                                        '>
                                            <a href={item.url}>{item.name.slice(0,7) == "Science" ? item.name.slice(8, 10000) : item.name}</a>
                                            
                                            {item.url}

                                        </div>
                                    ) :
                                // if no startTime AND endTime, only filter by day and availability
                                data.filter((room) =>
                                    room.location === "Science Library" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='min-w-40 h-1/3 font-serif text-white flex flex-col rounded-md bg-[#255799] pl-5 pt-3 '>
                                            <a href={item.url}><div className='text-2xl'>{item.name.slice(0,7) == "Science" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div></a>
                                           <div>🔗 </div>
                                        </div>
                                    )
                        )
                            :
                            <div> No Rooms Available for SL</div>
                    }
                    </div>
                    <h1 className="ml-10 text-2xl font-serif">Langson Library</h1>
                    <div className="w-4/4 h-1/2 bg-yellow-400 flex flex-row gap-2 overflow-auto ml-10">
                    {
                        buildings.LangsonLibrary ? (
                            startTime && endTime ?
                                // if has startTime AND endTime, filter by day, availability, and startTime AND endTime
                                data.filter((room) =>
                                    room.location === "Langson Library" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable && compareTime(slot.start.split("T")[1].split("+")[0], startTime) && compareTime(endTime, slot.end.split("T")[1].split("+")[0]) })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Langson" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div>
                                               


                                        </div>
                                    ) :
                                // if no startTime AND endTime, only filter by day and availability
                                data.filter((room) =>
                                    room.location === "Langson Library" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Langson" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div>
                                               


                                        </div>
                                    )
                        )
                            :

                            <div> No Rooms Available for LL</div>
                    }
                    </div>
                    <h1 className="ml-10 text-2xl font-serif">Gateway Study Center</h1>
                    <div className="w-4/4 h-1/2 bg-yellow-400 flex flex-row gap-2 overflow-auto ml-10">
                    {
                        buildings.GatewayStudyCenter ? (
                            startTime && endTime ?
                                // if has startTime AND endTime, filter by day, availability, and startTime AND endTime
                                data.filter((room) =>
                                    room.location === "Gateway Study Center" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable && compareTime(slot.start.split("T")[1].split("+")[0], startTime) && compareTime(endTime, slot.end.split("T")[1].split("+")[0]) })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Gateway" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div>
                                                


                                        </div>
                                    ) :
                                // if no startTime AND endTime, only filter by day and availability
                                data.filter((room) =>
                                    room.location === "Gateway Study Center" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Gateway" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div>
                                               


                                        </div>
                                    )
                        )
                            :
                            <div> No Rooms Available for GSC</div>
                    }</div>
                    <h1 className="ml-10 text-2xl font-serif">Multimedia Resources Center</h1>
                    <div className="w-4/4 h-1/2 bg-yellow-400 flex flex-row gap-2 overflow-auto ml-10">
                    {
                        buildings.MultimediaResourcesCenter ? (
                            startTime && endTime ?
                                // if has startTime AND endTime, filter by day, availability, and startTime AND endTime
                                data.filter((room) =>
                                    room.location === "Multimedia Resources Center" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable && compareTime(slot.start.split("T")[1].split("+")[0], startTime) && compareTime(endTime, slot.end.split("T")[1].split("+")[0]) })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Science" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div>
                                                


                                        </div>
                                    ) :
                                // if no startTime AND endTime, only filter by day and availability
                                data.filter((room) =>
                                    room.location === "Multimedia Resources Center" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Science" ? item.name.slice(8, 10000) : (item.name.slice(0,10) == "Study room" ? item.name.slice(11, 1000) : (item.name.length < 15 ? item.name : "MORE ->"))}</div>
                                                


                                        </div>
                                    )
                        )
                            :
                            <div> No Rooms Available for MRC</div>
                    }</div>
                    <h1 className="ml-10 text-2xl font-serif">Grunigen Medical Library</h1>
                    <div className="w-4/4 h-1/2 bg-yellow-400 flex flex-row gap-2 overflow-auto ml-10">
                    {
                        buildings.GrunigenMedicalLibrary ? (
                            startTime && endTime ?
                                // if has startTime AND endTime, filter by day, availability, and startTime AND endTime
                                data.filter((room) =>
                                    room.location === "Grunigen Medical Library" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable && compareTime(slot.start.split("T")[1].split("+")[0], startTime) && compareTime(endTime, slot.end.split("T")[1].split("+")[0]) })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name.slice(0,7) == "Science" ? item.name.slice(8, 10000) : (item.name.length < 15 ? item.name : "MORE ->")}</div>
                                               


                                        </div>
                                    ) :
                                // if no startTime AND endTime, only filter by day and availability
                                data.filter((room) =>
                                    room.location === "Grunigen Medical Library" && room.slots.some((slot) => { return slot.start.split("T")[0] === day && slot.isAvailable })
                                )
                                    .map((item) =>
                                        <div key={item.id} className='w-1/4 h-1/3 font-serif text-white flex flex-col p-5 rounded-md bg-[#255799]'>
                                            <div>{item.name}</div>
                                               


                                        </div>
                                    )
                        )
                            :
                            <div> No Rooms Available for GML</div>
                    }</div>
                </div>
            </div>
        </>
    )
}