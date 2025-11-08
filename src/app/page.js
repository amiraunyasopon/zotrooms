'use client';

import { useState, useEffect } from 'react';
import { fetchRooms } from "./api/user-api";

export default function random() {
    const [roomData, setRoomData] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [building, setBuilding] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState(null);

    const getData = async () => {
        try {
            const data = await fetchRooms();
            setRoomData(data.data);
            console.log(data.data)
        } catch (error) {
            console.error("Error fetching room data. ", error);
        }
    }

    useEffect(() => {
        getData();
    }, [])



    return(
        <div>
            
        </div>
    )
}