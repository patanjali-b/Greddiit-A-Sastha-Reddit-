import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import SubGredditList from './SubGredditList';

function DisplaySubGreddits({ subgreddits, setSubgreddits, Details }) {
    // const [subgreddits, setSubgreddits] = useState();

    React.useEffect(() => {
        axios.get(`/api/mysubgreddits`)
            .then((res) => {
                console.log(res.data);
                setSubgreddits(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <>
            {
                subgreddits && <SubGredditList subgreddits={subgreddits} setSubgreddits={setSubgreddits}/>
            }
        </>
    )
}
export default function MySubGreddits() {
    const [Details, setDetails] = useState({})
    const [mysubgreddits, setMySubgreddits] = useState(false);
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Tags, setTags] = useState("");
    const [Banned, setBanned] = useState("");
    const [subgreddits, setSubgreddits] = useState([]);

    console.log("rerender")
    function NewSubGreddit() {
        const NewSubGreddit = {
            name: Name !== '' ? Name : undefined,
            description: Description !== '' ? Description : undefined,
            tags: Tags !== '' ? Tags : undefined,
            banned: Banned !== '' ? Banned : undefined,
            ID: localStorage.getItem("id"),

        }
        axios.post(`/api/allsubgreddits`, NewSubGreddit)
            .then((res) => {
                console.log("ID is ", localStorage.getItem("id"));
                console.log("res", res.data);
                const updatingto = {
                    Name: res.data.Name,
                    Tags: res.data.Tags,
                    Description: res.data.Description,
                    Banned: res.data.Banned,
                    ID: localStorage.getItem("id"),
                }
                console.log("upd",updatingto);
                setSubgreddits([...subgreddits, updatingto])
            // if(subgreddits
            //     .ID === localStorage.getItem("id")){
            //     setSubgreddits([...subgreddits, updatingto])
            // }

            })
            .catch((err) => { console.log(err) })

    }
    function SortAscending() {

        const temp_array = [...subgreddits]
        const sortedCards = temp_array.sort((a, b) => {
            if (a.Name < b.Name)
                return -1
        });

        if (sortedCards) {
            setSubgreddits(sortedCards);
        }
    }

    function SortDescending({ subgreddits, setSubgreddits }) {
        const temp_array = [...subgreddits]
        const sortedCards = temp_array.sort((a, b) => {
            if (a.Name > b.Name)
                return -1
        });
        console.log("Sorted", sortedCards)
        setSubgreddits(sortedCards)
    }
    const handleSaveClick = async () => {
        setMySubgreddits(false);
        // console.log(`Changes: First Name: ${Name}, Last Name: ${lastName}, Username: ${Description}, Contact: ${Tags}, Age: ${Banned}, Email: ${email}`);
        NewSubGreddit();
        setName("");
        setDescription("");
        setTags("");
        setBanned("");
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);

    };

    const handleTagsChange = (event) => {
        setTags(event.target.value);
    };

    const handleBannedChange = (event) => {
        setBanned(event.target.value);
    };

    //Use Effect call to get the subgreddits from the backend
    React.useEffect(() => {
        axios.get(`/api/mysubgreddits/${localStorage.getItem("id")}`)
        .then((res) => {
            console.log(res.data);
            setSubgreddits(res.data)
        })
        .catch((err) => { console.log(err) })
    }, [setSubgreddits])

    return (
        <div>
            <h1>My SubGreddits</h1>
            <button onClick={() => setMySubgreddits(true)}>
                Create New SubGreddit
            </button>
            <h1>
                <table border="0">
                    <tr>
                        <th>
                            <button onClick={() => SortAscending()}>Ascending</button>
                        </th>
                        <th>
                            <button onClick={() => SortDescending({ subgreddits, setSubgreddits })}>Descending</button>
                        </th>
                    </tr>
                </table>

            </h1>
            {mysubgreddits && (
                <form>
                    <label>
                        Name:
                        <input type="text" value={Name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={Description} onChange={handleDescriptionChange} />
                    </label>
                    <label>
                        Tags:
                        <input type="text" value={Tags} onChange={handleTagsChange} />
                    </label>
                    <label>
                        Banned:
                        <input type="text" value={Banned} onChange={handleBannedChange} />
                    </label>

                    <button type="button" onClick={handleSaveClick}>Save</button>
                </form>
            )}
            {
                // DisplaySubGreddits()
                // React.useEffect(() => {
                //     axios.get(`/api/mysubgreddits`)
                //         .then((res) => {
                //             console.log(res.data);
                //             setSubgreddits(res.data)
                //         })
                //         .catch((err) => { console.log(err) })
                // },[])
            }
            {/* {console.log(subgreddits)} */}
            {subgreddits && <DisplaySubGreddits subgreddits={subgreddits} setSubgreddits={setSubgreddits}/>}

        </div>

    )
}