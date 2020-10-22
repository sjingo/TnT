import React, { useState } from 'react'
import {
    Button,
    Card,
    Header,
    Icon,
    Image,
    Label,
    Modal,
} from 'semantic-ui-react'
import BarMenuImage from './../assets/BarMenu.png'
import BhajiShopImage from './../assets/BhajiShopImage.jpg'

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
            <Header as="h2" color="teal">
                <Header.Content>
                    <Icon name="food" size="small" />
                    <Icon name="bar" size="small" />
                    Food and Drink
                </Header.Content>
            </Header>
            <Card.Group itemsPerRow={1}>
                <Card>
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
                            Beer, wine, fizz, cocktails, ixers, gins, spirits,
                            rum, tequilas ...
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button
                            color="teal"
                            onClick={() => handleSetOpen('/BarMenu.jpg')}
                        >
                            <Icon name="image outline" />
                            Menu
                        </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
            <Card.Group itemsPerRow={1}>
                <Card as="a">
                    <Label
                        as="a"
                        color="purple"
                        ribbon
                        style={{ left: '-1rem' }}
                    >
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
                        <Card.Description>
                            Serving freshly cooked Indian inspire food.
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    )
}
