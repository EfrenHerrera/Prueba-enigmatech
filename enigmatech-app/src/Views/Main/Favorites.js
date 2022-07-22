import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";


import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { makeStyles } from "@mui/styles";

import { useSearch } from "Hooks/useSearch";
import TableCustom from "./Components/TableCustom";
import DrawerFavoriteEdit from "./Components/DrawerFavoriteEdit";
import { getFavoritesUser } from "redux/actions/favoriteTracksActions";
import { setTrackFavorite } from "redux/actions/favoriteTracksActions";
import { DeleteFavorite } from "redux/actions/favoriteTracksActions";

const useStyles = makeStyles((theme) => ({
    removeicon: {
        color: theme.palette.error.main,
    },
    addicon: {
        color: theme.palette.success.main,
    },
    updateIcon: {
        color: theme.palette.warning.light,
    },
    viewIcon: {
        color: theme.palette.gray,
    },
}));

const Favorites = () => {    

    const classes = useStyles();
    const [cookies] = useCookies(['authToken']);
    let history = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites);
    const [, , isCreating, , , , , handleOpen, handleClose] = useSearch();

    useEffect(() => {
        dispatch(getFavoritesUser(cookies.authToken.data !== undefined ? cookies.authToken.data.id : cookies.authToken.id))
    }, [])
    
    let data = {
        rows: favorites.map(e => ({ 
            internalId: e.id,
            id: e.id, 
            Name: e.name, 
            Note: e.note, 
            Artists: e.artists, 
        })),
        columns: [
            {
                field: 'Name',
                cellClassName: 'super-app-theme--header',
                headerName: 'Name',
                flex: 1,
            },
            {
                field: 'Artists',
                headerName: 'Artists',
                flex: 1,
            },
            {
                field: 'Note',
                headerName: 'Note',
                flex: 1.3,
            },
            {
                field: 'actions',
                headerName: 'Actions',
                flex: 0.5,
                renderCell: (params) => {
                    return  [
                            <GridActionsCellItem
                                icon={<ModeEditOutlineOutlinedIcon  
                                    className={classes.updateIcon}/>}
                                label="Edit"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    handleOpen(e);
                                    params.api.selectRow(params.id)
                                    dispatch(setTrackFavorite(favorites.find(data => data.id === params.id)))
                                }}
                                color="inherit"
                            />,
                            <GridActionsCellItem
                                icon={<DeleteOutlineRoundedIcon 
                                    className={classes.removeicon}/>}
                                label="Delete"
                                onClick={(e)=>{  
                                    e.preventDefault(); 
                                    Swal.fire({
                                        title: '¿Está seguro?',
                                        text: "¡No podrás revertir esto!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: '¡Sí, bórralo!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            dispatch(DeleteFavorite(params.id))
                                        }
                                    })                  
                                }}
                                color="inherit"
                            />,
                        ];
                },
            },
        ],
    }
    
    return (
        <>
            <TableCustom
                data={data}
                drawerComponent={()=>{}}
                drawerComponentEdit={DrawerFavoriteEdit}
                isEditing={isCreating}
                handleCloseEdit={handleClose}
            />
        </>
    );
}

export default Favorites;