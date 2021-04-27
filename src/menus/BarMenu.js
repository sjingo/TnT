import React, { useState } from 'react'
import {
    Button,
    Grid,
    Card,
    Header,
    Icon,
    Image,
    Label,
    Modal,
} from 'semantic-ui-react'
import BarMenuImage from './../assets/BarMenu.png'
import BhajiShopImage from './../assets/BhajiShopImage_narrow.png'

export default function () {
    const [modalOpen, setModalOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const handleSetOpen = (url) => {
        setModalOpen(true)
        setImageUrl(url)
    }
    return (
        <>
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
                closeIcon
            >
                <Modal.Content image>
                    <Image
                        size="large"
                        src={imageUrl}
                        style={{ width: '100%' }}
                    />
                </Modal.Content>
            </Modal>
            <Header as="h2" color="black">
                <Header.Content>
                    <Icon name="food" size="small" />
                    <Icon name="bar" size="small" />
                    Food and Drink
                </Header.Content>
            </Header>
            <Card.Group itemsPerRow={1}>
                <Card raised>
                    <Card.Content>
                        <Card.Header>Takk Drinks Menu</Card.Header>
                    </Card.Content>
                    <img
                        src={BarMenuImage}
                        alt="Takk drinks menu"
                        style={{ width: '100%' }}
                    />
                    <Card.Content>
                        <Card.Description>
                            Beer, wine, fizz, cocktails, mixers, gins, spirits,
                            rum, tequilas ...
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button
                            color="teal"
                            onClick={() => handleSetOpen('/BarMenu2021.png')}
                        >
                            <Icon name="image outline" />
                            Menu
                        </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
            <Card.Group itemsPerRow={1}>
                <Card raised>
                    <Label color="purple" ribbon style={{ left: '-1rem' }}>
                        See the chalk boards for today's curry pots
                    </Label>
                    <Card.Content>
                        <Card.Header>The Bhaji Shop</Card.Header>
                    </Card.Content>
                    <img
                        src={BhajiShopImage}
                        alt="The Bhaji Shop menu"
                        style={{ width: '100%' }}
                    />
                    <Card.Content>
                        <Grid columns={2}>
                            {[
                                {
                                    text: 'Thalis',
                                    src: '/Bhaji_Menu_Thalis.png',
                                },
                                {
                                    text: 'Coffee & cake',
                                    src: '/Bhaji_Menu_Coffee_Cakes.png',
                                },
                                {
                                    text: 'Brunch',
                                    src: '/Bhaji_Menu_Brunch.png',
                                },
                                { text: 'Lunch', src: '/Bhaji_Menu_Lunch.png' },
                            ].map((img) => (
                                <Grid.Column>
                                    <Button
                                        style={{ width: '90%' }}
                                        key={img.src}
                                        color="teal"
                                        onClick={() => handleSetOpen(img.src)}
                                    >
                                        <Icon name="image outline" />
                                        {img.text}
                                    </Button>
                                </Grid.Column>
                            ))}
                        </Grid>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            Serving freshly cooked Indian inspire food.
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    )
}
