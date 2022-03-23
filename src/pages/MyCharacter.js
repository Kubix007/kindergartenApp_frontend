import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import { Paper, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../api/Repository';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';
import Auth from '../api/Auth';
import ClothesCardList from '../components/Character/ClothesCardList';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

const resourceCharactersAPI = 'characters';
const resourceUserClothes = 'users_clothes';
const resourceUserDetailsAPI = 'user_details';

const useStyles = makeStyles(theme => ({
    pageContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSave: {
        margin: theme.spacing(3),
    },
    paper: {
    }
}))

const MyCharacter = () => {
    const classes = useStyles();
    const [character, setCharacter] = useState();
    const [userClothes, setUserClothes] = useState();
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);
    const [characterId, setCharacterId] = useState();
    let userId = null;


    function renderCharacter(svgString) {
        var container = document.getElementById('character')
        var svg = new DOMParser().parseFromString(svgString, 'text/html');
        if (container.hasChildNodes()) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(
                container.ownerDocument.importNode(svg.documentElement, true),
            )
        } else {
            container.appendChild(
                container.ownerDocument.importNode(svg.documentElement, true),
            )
        }
    }

    const getCharactersAPI = () => {
        let id = parseInt(Auth.getUserId());
        Repository.getById(resourceCharactersAPI, id).then(
            (data) => {
                setCharacter(data.data[0].source);
                setCharacterId(data.data[0].id);
                getUserDetails();
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getUserDetails = () => {
        let id = parseInt(Auth.getUserId());
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                userId = data.data.data.user_id;
                getUserClothesAPI(userId);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getUserClothesAPI = (id) => {
        Repository.getById(resourceUserClothes, id).then(
            (data) => {
                setUserClothes(data.data);
                setUpdatingStatusPopup(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const updateItemsAPI = (data) => {
        Repository.update(resourceCharactersAPI, characterId, data).then(
            () => {
                toast.success(`Pomyślnie zaktualizowano Twoją postać`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            },
            () => {
                toast.error(`Nie udało się zaktualizować Twojej postaci`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        );
    }

    const handleSaveCharacter = () => {
        var el = document.getElementById('character').querySelector('svg');
        const data = {
            source: el.outerHTML,
        }
        updateItemsAPI(data);
    }

    useEffect(() => {
        getCharactersAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageHeader
                title="Postać"
                subTitle="Tutaj dostosujesz swoją postać"
                icon={<AndroidOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Grid container spacing={1} className={classes.pageContent} direction='column'>
                    <Grid item xs={12}>
                        {userClothes ? <ClothesCardList
                            clothes={userClothes} setUpdatingStatusPopup={setUpdatingStatusPopup}
                        /> : null}
                    </Grid>
                    <Grid item xs={8}>
                        {character ? renderCharacter(character) : null}
                        <Paper elevation={6} className={classes.paper}><div id="character"></div></Paper>
                    </Grid>
                    {character ? <Button className={classes.buttonSave}
                        variant="contained"
                        size='large'
                        color="primary"
                        onClick={handleSaveCharacter}
                    >
                        Zapisz
                    </Button> : null}
                </Grid>
            </Container>
            <UpdatingStatusPopup
                openPopup={updatingStatusPopup}
                setOpenPopup={setUpdatingStatusPopup}
                isTitle={false}
            >
                <UpdatingStatusForm
                    setOpenPopup={updatingStatusPopup}
                />
            </UpdatingStatusPopup>
        </>
    );
}

export default MyCharacter;