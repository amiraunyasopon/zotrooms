'use client';

import { useState, useEffect } from 'react';
import { fetchRooms } from "./api/user-api";

export default function random() {
    const [roomData, setRoomData] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [building, setBuilding] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchRooms();
                setRoomData(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching room data. ", error);
            }
        }
        getData();
    }, [])



    return(
        <div>

        </div>
    )
}