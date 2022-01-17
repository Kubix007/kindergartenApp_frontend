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

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSave: {
        margin: theme.spacing(1),
    }
}))

const MyCharacter = () => {
    const classes = useStyles();
    const [character, setCharacter] = useState();
    const [userClothes, setUserClothes] = useState();
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);
    const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);
    const [isLoadingClothes, setIsLoadingClothes] = useState(true);
    const [characterId, setCharacterId] = useState();

    function render_xml(id, xml_string) {
        var el = document.getElementById(id)
        var doc = new DOMParser().parseFromString(xml_string, 'text/html');
        if (el.hasChildNodes()) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            el.appendChild(
                el.ownerDocument.importNode(doc.documentElement, true),
            )
        } else {
            el.appendChild(
                el.ownerDocument.importNode(doc.documentElement, true),
            )
        }
    }

    const getCharactersAPI = () => {
        let id = parseInt(Auth.getUserId());
        Repository.getById(resourceCharactersAPI, id).then(
            (data) => {
                setCharacter(data.data[0].source);
                setCharacterId(data.data[0].id);
                setIsLoadingCharacter(false);
                setUpdatingStatusPopup(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getUserClothesAPI = () => {
        Repository.getAll(resourceUserClothes).then(
            (data) => {
                setUserClothes(data.data);
                setIsLoadingClothes(false);
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
        getUserClothesAPI();
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
                            clothes={userClothes}
                        /> : null}
                    </Grid>
                    <Grid item xs={8}>
                        {character ? render_xml('character', character) : null}
                        <Paper elevation={6}><div id="character"></div></Paper>
                    </Grid>
                    {character ? <Button
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