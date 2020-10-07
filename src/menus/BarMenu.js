import React, { useState } from 'react'
import { Button, Card, Header, Icon, Image, Modal } from 'semantic-ui-react'
import BarMenuImage from './../assets/BarMenu.png'

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
                    <Image size="large" src={imageUrl} style={{width: '100%'}}  />
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
                        <Card >
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
                                Beer, wine, fizz, cocktails, ixers, gins, spirits, rum, tequilas ...
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button
                                    positive
                                    onClick={() =>
                                        handleSetOpen('/BarMenu.jpg')
                                    }
                                >
                                    <Icon name="image outline" />
                                    Menu
                                </Button>
                            </Card.Content>
                        </Card>
            </Card.Group>
            <Card.Group itemsPerRow={1}>
                <Card as="a">
                    <Card.Content>
                        <Card.Header>The Bhaji Shop</Card.Header>
                    </Card.Content>
                    <img
                        src="http://www.thebhajishop.co.uk/wp-content/uploads/2018/11/moor-market-21.jpg"
                        alt="The Bhaji Shop menu"
                        style={{ width: '100%' }}
                    />
                    <Card.Content>
                        <Card.Description>
                            Indian inspired dishes, made fresh daily with plenty
                            of vegetarian, vegan and gluten free options.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button
                            positive
                            onClick={() => handleSetOpen('/BhajiMenu.jpg')}
                        >
                            <Icon name="image outline" />
                            Menu
                        </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    )
}
