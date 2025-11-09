'use client';

import Navbar from "../components/Navbar"
import { useState, useEffect } from 'react';
import { fetchRooms, fetchRoom } from "./api/user-api";

export default function MainPage() {
    const [data, setData] = useState([]);
    const [buildings, setBuildings] = useState({ LangsonLibrary: true, ScienceLibrary: true, GatewayStudyCenter: true, MultimediaResourcesCenter: true, GrunigenMedicalLibrary: true });
    const [minCapacity, setMinCapacity] = useState(1000);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [day, setDay] = useState(0);
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

        console.log(data.filter((room) => room.location === "Science Library"))
    }, [])

    return (
        <>
            <div className="min-h-screen w-screen">
                <Navbar />
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