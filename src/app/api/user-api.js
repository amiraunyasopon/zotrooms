const BASE_URL = 'https://anteaterapi.com/v2/rest/studyRooms';

// Function to fetch room data for all rooms
export async function fetchRooms() {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch study rooms:');
        throw error;
    }
}

// Function to fetch room data for a specific room
export async function fetchRoom(roomId) {
    try {
        const response = await fetch(`${BASE_URL}/${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch room:', error);
        throw error;
    }
}