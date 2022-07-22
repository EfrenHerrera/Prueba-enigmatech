import React, { useState } from 'react'
import { Box, IconButton, Paper, Typography, Modal, FilledInput, Button, Alert } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { addFavorites } from 'redux/actions/favoriteTracksActions';
import { useCookies } from 'react-cookie';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #0000000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

const CardSong = ({item, isFavorite}) => {
    const [cookies] = useCookies(['authToken']);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    const handleSetFavorite = () => {
        if( note === "" ){
            alert("No a agregado porque le gusta la canción")
            return;
        }

        const track = {
            idTrack: item.id,
            image: item.album.images.length !== 0 && item.album.images[0].url,
            name: item.name,
            artists: item.artists.map( (artist, index) => index === 0  ? `${artist.name}` : 
                (item.artists.length - 1) === index ? ` ${artist.name}` : ` ${artist.name}` ).toString(),
            note: note,
            userId: cookies.authToken.data.id
        }
        dispatch(addFavorites(track))
        setNote("");
        setOpen(false);
    };

    return (
        <Paper elevation={2} >
            <Box sx={{ width: '100%', height: '250px', }}>
                {
                    item.album.images.length !== 0 &&
                    <img
                        src={`${item.album.images[0].url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.album.images[0].url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                        loading="lazy"
                    />
                }
            </Box>
            <Box sx={{ width: '100%', padding: '10px 2px 10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography  sx={{ fontSize: 16, fontWeight: 'bold',  }}>{item.name}</Typography>
                    <Typography sx={{ fontSize: 14 }}>
                        { 
                            item.artists.map( (artist, index) => 
                                (item.artists.length - 1 ) === index  ? artist.name : `${artist.name}, ` 
                            ) 
                        }
                    </Typography>   
                </Box>
                <Box>
                    <IconButton onClick={() => !isFavorite ? setOpen(true) : {} }>
                        {
                            isFavorite ? 
                                <FavoriteIcon sx={{ color: '#fa1b49' }}/> 
                                : <FavoriteBorderIcon />
                        }
                    </IconButton>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{ fontSize: 14, marginBottom: '15px' }} >
                        Porque te gusta esta canción.
                    </Typography>
                    <FilledInput
                        autoComplete="off"
                        value={note}
                        multiline
                        minRows={3}
                        maxRows={7}
                        sx={{ marginBottom: '15px' }}
                        onChange={ (e) => setNote(e.target.value) }
                        placeholder="note..."
                    />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleSetFavorite}> Guardar </Button>
                    </Box>
                </Box>
            </Modal>
        </Paper>
    )
}

export default CardSong