import React from 'react'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const TracksListFav = ({ favorites }) => {

    return (
        <Box sx={{ 
            marginBottom: '15px', paddingBottom:'5px', display: 'flex', 
            width: '100%', flexDirection: 'row', overflowX: 'scroll'
            }} >
            {   favorites !== undefined &&
                favorites.map((item) => (
                    <Box sx={{ marginRight: '10px' }} key={item.id}>
                        <Card sx={{  flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width:'190px' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h4">
                                        { item.name }
                                    </Typography>
                                    <Typography variant="h5" color="text.secondary" component="div">
                                        { item.artists }
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        { item.note }
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151, borderTopRightRadius: 5, borderEndEndRadius: 5 }}
                                src={item.image}
                                alt="Live from space album cover"
                            />
                        </Card>
                    </Box>
                )) 
            }

        </Box>
    )
}

export default TracksListFav