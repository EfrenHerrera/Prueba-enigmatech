import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTokenSpotify } from "redux/actions/authActions";
import { withCookies } from "react-cookie";
import { Box, FilledInput, ImageList, ImageListItem, Typography } from "@mui/material";
import Search from "./Components/Search";
import CardSong from "./Components/CardSong";
import TracksListFav from "./Components/TracksListFav";
import { getFavoritesUser } from "redux/actions/favoriteTracksActions";


class Home extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state ={
            searchKey: '',
            searchResults: [],
            dataInitial: [],
            playingTrack: [],
            lyrics: ""
        }
        this.externalWindow = null;
    }

    async componentDidMount(){
        this._isMounted = true;
        const { setTokenSpotify, token, getFavoritesUser, cookies } = this.props 

        if(Object.keys(token).length === 0){
            const resp = await axios.get('http://localhost:8080/auth/token');

            if(Object.keys(resp.data.access_token).length === 0){
                var scope = "streaming \
                user-read-email \
                user-read-private"
                if(this.externalWindow === null) 
                this.externalWindow = window.open("https://accounts.spotify.com/authorize?" +
                    "client_id=688f227a9c084f279678cc32097a67cb" + // your client id
                    "&response_type=code" +
                    "&redirect_uri=http://localhost:8080/auth/callback" +       
                    "&show_dialog=true" +
                    "&scope="+ scope, '', 
                    "width=600, height=500")
            } else { 
                setTokenSpotify(resp.data.access_token)
            }
        } 

        // setTimeout(() => {
        // }, 3600);
        const obj = JSON.parse(cookies.cookies.authToken);
        getFavoritesUser(obj.data !== undefined ? obj.data.id : obj.id)

    }

    async componentDidUpdate(prevProps){
        if(this._isMounted){
            const { token } = this.props;
            const { token: prevToken } = prevProps;

            if(prevToken !== token) {
                function getRandomSearch() {
                    
                    let randomSearch = '';
                    const characters = 'abcdefghijklmnopqrstuvwxyz';
                    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    
                    switch (Math.round(Math.random())) {
                        case 0:
                            randomSearch = randomCharacter + '%';
                            break;
                        case 1:
                            randomSearch = '%' + randomCharacter + '%';
                            break;
                    }
    
                    return randomSearch;
                }
    
                const {data} = await axios.get("https://api.spotify.com/v1/search", {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    },
                    params: {
                        q: getRandomSearch(),
                        type: "track"
                    }
                })

                this.setState({ dataInitial: data.tracks.items })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    setSearch = (e) => {
        this.setState({ searchKey: e.target.value })
    }

    setSearchResults = value => {
        this.setState({ searchResults: value })
    }

    render(){
        const { token, favorites } = this.props;
        const { searchKey, searchResults, dataInitial } = this.state
        return(
            <Box sx={{ width: '100vw', overflowX: 'hidden', overflowY: 'hidden' }}>
                <Box sx={{ padding: '0px 50px', flexDirection: 'column', justifyContent: 'center' }} >
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontWeight: 'bold', marginLeft: '5px' }}>
                            Favorite tracks
                        </Typography>
                        <TracksListFav favorites={favorites} />
                        <Search 
                            setSearch={this.setSearch}
                            setSearchResults={this.setSearchResults} 
                            search={searchKey} 
                            token={token}/>
                        {
                            searchResults !== undefined &&
                            <ImageList sx={{ width: '100%', height: '100%' }} cols={5} gap={20} >
                                {
                                    searchResults.length !== 0 ?
                                        searchResults.map((item) => (
                                            <ImageListItem key={item.id}>
                                                <CardSong item={item} isFavorite={favorites.find(data => data.idTrack === item.id ) !==  undefined ? true : false}/>
                                            </ImageListItem>
                                        )) :
                                        dataInitial.map( item => (
                                            <ImageListItem key={item.id}>
                                                <CardSong item={item} isFavorite={favorites.find(data => data.idTrack === item.id ) !==  undefined ? true : false}/>
                                            </ImageListItem>
                                        ))
                                }
                            </ImageList>
                        }
                </Box>
            </Box>
        );
    }

}

const mapStateToProps = state => ({
    token: state.auth.tokenSpotify,
    favorites: state.favorites.favorites,
});

const bindActions = dispatch => ({
    setTokenSpotify: data => dispatch(setTokenSpotify(data)),
    getFavoritesUser: data => dispatch(getFavoritesUser(data)),
    
});

export default withCookies(connect( mapStateToProps, bindActions )(Home));