import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import PostsList from  './PostsList';

function Displayposts({ posts, setPosts, Details }) {
   

    React.useEffect(() => {
        axios.get(`/api/mysubgreddits/postid/${localStorage.getItem("subgredditId")}`)
            .then((res) => {
                console.log(res.data);
                setPosts(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <>
            {
                posts && <PostsList posts={posts} setPosts={setPosts}/>
            }
        </>
    )
}
export default function Myposts() {
    const [Details, setDetails] = useState({})
    const [myposts, setMyPosts] = useState(false);
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    
    const [posts, setPosts] = useState([]);

    console.log("rerender")
    function Newpost() {
        const Newpost = {
            name: Name !== '' ? Name : undefined,
            description: Description !== '' ? Description : undefined,
            ID: localStorage.getItem("id"),
            postid: localStorage.getItem("subgredditId")

        }
        console.log("newpost", Newpost)
        axios.post(`/api/mysubgreddits/${localStorage.getItem("subgredditId")}`, Newpost)
            .then((res) => {
                console.log("ID is ", localStorage.getItem("id"));
                console.log("res", res.data);
                const updatingto = {
                    Name: res.data.Name,
                    Description: res.data.Description,
                    Author: localStorage.getItem("id"),
                    PostID : localStorage.getItem("subgredditId")
                }
                console.log("upd",updatingto);
                setPosts([...posts, updatingto])
            // if(posts
            //     .ID === localStorage.getItem("id")){
            //     setPosts([...posts, updatingto])
            // }

            })
            .catch((err) => { console.log(err) })

    }
    function SortAscending() {

        const temp_array = [...posts]
        const sortedCards = temp_array.sort((a, b) => {
            if (a.Name < b.Name)
                return -1
        });

        if (sortedCards) {
            setPosts(sortedCards);
        }
    }

    function SortDescending({ posts, setPosts }) {
        const temp_array = [...posts]
        const sortedCards = temp_array.sort((a, b) => {
            if (a.Name > b.Name)
                return -1
        });
        console.log("Sorted", sortedCards)
        setPosts(sortedCards)
    }
    const handleSaveClick = async () => {
        setMyPosts(false);
        // console.log(`Changes: First Name: ${Name}, Last Name: ${lastName}, Username: ${Description}, Contact: ${Tags}, Age: ${Banned}, Email: ${email}`);
        Newpost();
        setName("");
        setDescription("");
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);

    };


    //Use Effect call to get the posts from the backend
    React.useEffect(() => {
        axios.get(`/api/myposts/${localStorage.getItem("id")}`)
        .then((res) => {
            console.log(res.data);
            setPosts(res.data)
        })
        .catch((err) => { console.log(err) })
    }, [setPosts])

    return (
        <div>
            <h1>My posts</h1>
            <button onClick={() => setMyPosts(true)}>
                Create New post
            </button>
            <h1>
                <table border="0">
                    <tr>
                        <th>
                            <button onClick={() => SortAscending()}>Ascending</button>
                        </th>
                        <th>
                            <button onClick={() => SortDescending({ posts, setPosts })}>Descending</button>
                        </th>
                    </tr>
                </table>

            </h1>
            {myposts && (
                <form>
                    <label>
                        Name:
                        <input type="text" value={Name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={Description} onChange={handleDescriptionChange} />
                    </label>
                    <button type="button" onClick={handleSaveClick}>Save</button>
                </form>
            )}
            
            {posts && <Displayposts posts={posts} setPosts={setPosts}/>}

        </div>

    )
}