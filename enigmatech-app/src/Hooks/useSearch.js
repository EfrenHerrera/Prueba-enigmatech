import { useState } from 'react';

export const useSearch = ( initialState = {
    isSearch: false,
    search: '',
    isCreating: false,
    whereUpdating: 0,
} ) => {
    const [isSearch, setIsSearch] = useState( initialState.isSearch);
    const [search, setSearch] = useState( initialState.search );
    const [isCreating, setIsCreating] = useState( initialState.isCreating );
    const [whereUpdating, setWhereUpdating] = useState( initialState.whereUpdating );
    
    const reset = ( newFormState = initialState ) => {
        setIsSearch( newFormState.isSearch );
        setSearch( newFormState.search );
        setIsCreating( newFormState.isCreating );
        setWhereUpdating( newFormState.whereUpdating );
    }

    const handleChange = ( event ) => {
        event.preventDefault();
        setSearch(event.target.value);
        setIsSearch(true);
    }

    const handleSetValues = ( values ) =>{
        setIsCreating( values.isCreating );
        setWhereUpdating( values.whereUpdating );
    }
    const handleClose = ( event) => {
        handleSetValues({
            isCreating:  false,
            whereUpdating: 0
        });
    }
    const handleOpen = (event) => {
        event.preventDefault();
        handleSetValues({
            isCreating:  true,
            whereUpdating: 0
        });
    }

    return [ isSearch, search, isCreating, whereUpdating, handleChange, reset, handleSetValues, handleOpen, handleClose];
}