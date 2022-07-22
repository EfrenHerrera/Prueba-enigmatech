import { FilledInput } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

const Search = ({ search, token, setSearch, setSearchResults }) => {

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!token) return
    
        let cancel = false
        const searchArtists = async () => {
            if (cancel) return

            const {data} = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                },
                params: {
                    q: search,
                    type: "track"
                }
            })
        
            setSearchResults(data.tracks.items)
        }
        searchArtists();
    
        return () => (cancel = true)
    }, [search, token])
    
  return (
    <>
        <FilledInput
            autoComplete="off"
            value={search}
            onChange={ (e) => setSearch(e) }
            placeholder="Search"
        />
    </>
  )
}

export default Search