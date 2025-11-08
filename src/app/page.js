'use client';

import { useState, useEffect } from 'react';
import { fetchRooms, fetchRoom } from "./api/user-api";

export default function random() {
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [building, setBuilding] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState(null);
    const [roomTest, setRoomTest] = useState(null)

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
        <div>

        </div>
    )
}