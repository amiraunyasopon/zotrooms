'use client';

import { useState, useEffect } from 'react';
import { fetchRooms, fetchRoom } from "./api/user-api";

export default function random() {
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [buildings, setBuildings] = useState(["Langston Library", "Science Library", "Gateway Study Center", "Multimedia Resources Center"]);
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

    return (
        <>
            {
                buildings && buildings.includes("Langston Library") ? <div>Map list to display study rooms for LL</div> : <div> No Rooms Available for LL</div>
            }
            {
                buildings && buildings.includes("Science Library") ? <div>Map list to display study rooms for SL</div> : <div> No Rooms Available for SL</div>
            }
            {
                buildings && buildings.includes("Gateway Study Center") ? <div>Map list to display study rooms for GSC</div> : <div> No Rooms Available for GSC</div>
            }
            {
                buildings && buildings.includes("Multimedia Resources Center") ? <div>Map list to display study rooms for MRC</div> : <div> No Rooms Available for MRC</div>
            }
        </>
    )
}