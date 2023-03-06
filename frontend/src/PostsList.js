import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


export default function PostsList({ posts,setPosts }) {
    console.log(posts);
    // const handleDeleteSubgreddit = (subgredditId) => {
    //     console.log("deleting",subgredditId,posts[0]._id)
    //     const updatedSubgreddits = posts.filter(post => post._id !== subgredditId);
    //     setPosts(updatedSubgreddits);
    //   };
      const navigate = useNavigate();
    function handleClick(id) {
        localStorage.setItem("subgredditId", id);
        navigate(`/myposts/${id}`);
    }


    
    //   console.log(posts);
    console.log(posts)
    return (posts &&
        <div>
            {   posts.map((post) => {
                    return (
                        <div align="center">
                            <Card key={post.Name} variant="outlined" sx={{ width: 450 }} >
                                {console.log(post.Name)}
                                <h1>{post.Name}</h1>
                                <CardOverflow>
                                    <AspectRatio ratio="2">
                                        <img
                                            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                                            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </AspectRatio>
                                </CardOverflow>
                                <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                                    {
                                        <h4>
                                            {post.Name}
                                        </h4>}
                                </Typography>
                                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                                    {post.Description}
                                </Typography>
                                <Divider />
                                <CardOverflow
                                    variant="soft"
                                    sx={{
                                        display: 'flex',
                                        gap: 1.5,
                                        py: 1.5,
                                        px: 'var(--Card-padding)',
                                        bgcolor: 'background.level1',
                                    }}
                                >
                                   
                                    <Divider orientation="vertical" />
                                    
                                    
                                    {/* <Typography  align="right" level="body1" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                // delete the post from the database
                                                axios.delete(`/api/myposts/${post._id}`)
                                                    .then(res => {
                                                        console.log("deleted")
                                                        handleDeleteSubgreddit(post._id);
                                                        
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    })
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Typography> */}
                                    {/* <Typography  align="right" level="body1" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            
                                            onClick={
                                                
                                                () => handleClick(post._id)} 
                                             >
                                                {console.log(post._id)}
                                                JOIN
                                            </Button>
                                    </Typography> */}

                                </CardOverflow>
                            </Card>
                            <h1> </h1>
                        </div>

                    )
                })

            }
        </div>
    )
}