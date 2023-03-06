import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

import SubGredditList from './SubGredditList';

// const DUMMY_DATA = [];

// Write a get request to the backend to get all the subgreddits and store them subgreddits state
// Use the useEffect hook to call the get request





export default function AllSubGreddits()
{
    const [subgreddits, setSubgreddits] = useState();

    //Use Effect call to get the subgreddits from the backend

    React.useEffect(() => {
        axios.get(`/api/allsubgreddits`)
            .then((res) => {
                console.log(res.data);
                setSubgreddits(res.data)
            })
            .catch((err) => { console.log(err) })
    },[])
    // append each subgreddit in the DUMMY_DATA to the subgreddits state
    // DUMMY_DATA.map((subgreddit) => {
    //     subgreddits.push(subgreddit);
    // })  
    if(!subgreddits){
        return (<div>Loading...</div>)
    }
    return (
        <div>
            <h1>All SubGreddits</h1>
            <SubGredditList subgreddits={subgreddits} />
        </div>
    )
}

// {
//     id: 1,
//     name: 'reactjs',
//     description: 'A JavaScript library for building user interfaces',
//     tags: ['react', 'javascript', 'webdev'],
//     banned:['politics','news'],
// },
// {
//     id: 2,
//     name: 'frontend',
//     description: 'A subreddit for all things frontend development.',
//     tags: ['reddit'],
//     banned: ['A rated'],
// },
// {
//     id: 3,
//     name: 'webdev',
//     description: 'A subreddit for web development.',
//    tags:['subreddit'],
//    banned:['nothing'],
// },