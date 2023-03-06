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


export default function SubGredditList({ subgreddits,setSubgreddits }) {
    console.log(subgreddits);
    const handleDeleteSubgreddit = (subgredditId) => {
        console.log("deleting",subgredditId,subgreddits[0]._id)
        const updatedSubgreddits = subgreddits.filter(subgreddit => subgreddit._id !== subgredditId);
        setSubgreddits(updatedSubgreddits);
      };
      const navigate = useNavigate();
    function handleClick(id) {
        localStorage.setItem("subgredditId", id);
        navigate(`/mysubgreddits/${id}`);
    }


    
    //   console.log(subgreddits);
    console.log(subgreddits)
    return (subgreddits &&
        <div>
            {   subgreddits.map((subgreddit) => {
                    return (
                        <div align="center">
                            <Card key={subgreddit.Name} variant="outlined" sx={{ width: 450 }} >
                                {console.log(subgreddit.Name)}
                                <h1>{subgreddit.Name}</h1>
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
                                            {subgreddit.Name}
                                        </h4>}
                                </Typography>
                                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                                    {subgreddit.Description}
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
                                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        Tags:
                                        {" " + subgreddit.Tags + " "}
                                    </Typography>
                                    <Divider orientation="vertical" />
                                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        Banned Keywords:
                                        {" " + subgreddit.Banned + ""}
                                    </Typography>
                                    
                                    <Typography  align="right" level="body1" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                // delete the subgreddit from the database
                                                axios.delete(`/api/mysubgreddits/${subgreddit._id}`)
                                                    .then(res => {
                                                        console.log("deleted")
                                                        handleDeleteSubgreddit(subgreddit._id);
                                                        
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    })
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Typography>
                                    <Typography  align="right" level="body1" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            
                                            onClick={
                                                
                                                () => handleClick(subgreddit._id)} 
                                             >
                                                {console.log(subgreddit._id)}
                                                JOIN
                                            </Button>
                                    </Typography>

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