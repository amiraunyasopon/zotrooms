'use client';

import { useState, useEffect } from 'react';
import { fetchRooms, fetchRoom } from "./api/user-api";

export default function MainPage() {
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [buildings, setBuildings] = useState(["Langston Library", "Science Library", "Gateway Study Center", "Multimedia Resources Center", "Grunigen Medical Library"]);
    const [maxCapacity, setMaxCapacity] = useState(1000);

    const getData = async () => {
        try {
            const json = await fetchRooms();
            setData(json.data);
            console.log('getData', json.data);
        } catch (error) {
            console.error("Error fetching room data. ", error);
        }
    }

    const getRoomsData = async () => {
        for (let i = 0; i < data.length; i++) {
            const specificRoomData = await fetchRoom(data[i].id)
            setRooms((prevList) => {
                return [...prevList, specificRoomData]
            })
        }
        console.log(rooms)
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            getRoomsData();
        }
    }, [data])
    useEffect(() => {
        if (rooms.length == 74)
            console.log(rooms)
    }, [rooms])
    return (
        <>
            <h1>Langston Library</h1>
            {
                buildings && buildings.includes("Langston Library") ?
                    <div>Map list to display study rooms for LL</div>
                    :
                    <div> No Rooms Available for LL</div>
            }
            <h1>Science Library</h1>
            {
                buildings && buildings.includes("Science Library") ?
                    <div>Map list to display study rooms for SL</div>
                    :
                    <div> No Rooms Available for SL</div>
            }
            <h1>Gateway Study Center</h1>
            {
                buildings && buildings.includes("Gateway Study Center") ?
                    <div>Map list to display study rooms for GSC</div>
                    :
                    <div> No Rooms Available for GSC</div>
            }
            <h1>Multimedia Resources Center</h1>
            {
                buildings && buildings.includes("Multimedia Resources Center") ?
                    <div>Map list to display study rooms for MRC</div>
                    :
                    <div> No Rooms Available for MRC</div>
            }
            <h1>Grunigen Medical Library</h1>
            {
                buildings && buildings.includes("Grunigen Medical Library") ?
                    <div>Map list to display study rooms for GML</div>
                    :
                    <div> No Rooms Available for GML</div>
            }
        </>
    )
}