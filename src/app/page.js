'use client';

import { useState, useEffect } from 'react';
import { fetchRooms, fetchRoom } from "./api/user-api";

export default function MainPage() {
    const [data, setData] = useState([]);
    const [buildings, setBuildings] = useState([{ "Langston Library": true }, { "Science Library": true }, { "Gateway Study Center": true }, { "Multimedia Resources Center": true }, { "Grunigen Medical Library": true }]);
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
    }, [])

    return (
        <>
            <h1>Langston Library</h1>
            {
                data && buildings["Langston Library"] ?
                    data.filter((room) => {
                        room.location === "Langston Library"
                    })
                        .map((item) => {
                            <div key={item.id}>{item.id}</div>
                        })
                    :
                    <div> No Rooms Available for LL</div>
            }
            <h1>Science Library</h1>
            {
                buildings["Science Library"] ?
                    <div>Map list to display study rooms for SL</div>
                    :
                    <div> No Rooms Available for SL</div>
            }
            <h1>Gateway Study Center</h1>
            {
                buildings["Gateway Study Center"] ?
                    <div>Map list to display study rooms for GSC</div>
                    :
                    <div> No Rooms Available for GSC</div>
            }
            <h1>Multimedia Resources Center</h1>
            {
                buildings["Multimedia Resources Center"] ?
                    <div>Map list to display study rooms for MRC</div>
                    :
                    <div> No Rooms Available for MRC</div>
            }
            <h1>Grunigen Medical Library</h1>
            {
                buildings["Grunigen Medical Library"] ?
                    <div>Map list to display study rooms for GML</div>
                    :
                    <div> No Rooms Available for GML</div>
            }
        </>
    )
}