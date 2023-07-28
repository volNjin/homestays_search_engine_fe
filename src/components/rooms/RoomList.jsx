import React, { useContext, useState } from 'react';
import './RoomList.css'
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import Room from './Room';
export default function RoomList({ hotelID }) {
    const { data, error } = useFetch(`/hotels/room/${hotelID}`);
    return (
        <div className='hotel-roomlist-container'>
            {data?.map((room) =>(
                <Room data={room}/>
            ))}
        </div >
    )
}
