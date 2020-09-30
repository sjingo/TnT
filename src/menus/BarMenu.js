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
    const cards = [
        {
            header: 'Beer, wine, fizz, cocktails',
            description: 'Drinks Menu 1',
            image: BarMenuImage,
            imageLink: '/BarMenu_page_1.jpg',
        },
        {
            header: 'Mixers, gins, spirits, rum, tequilas ... ',
            description: 'Drinks Menu 2',
            image: BarMenuImage,
            imageLink: '/BarMenu_page_2.jpg',
        },
    ]
    return (
        <>
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
                closeIcon
                basic
                size="fullscreen"
            >
                <Modal.Content image>
                    <Image size="massive" src={imageUrl} wrapped />
                </Modal.Content>
            </Modal>
            <Header as="h2" color="teal">
                <Header.Content>
                    <Icon name="food" size="small" />
                    <Icon name="bar" size="small" />
                    Food and Drink
                </Header.Content>
            </Header>
            <Card.Group itemsPerRow={2}>
                {cards.map((item) => (
                    <>
                        <Card key={item.header}>
                            <Card.Content>
                                <Card.Header>{item.header}</Card.Header>
                            </Card.Content>
                            <img
                                src={item.image}
                                alt={item.description}
                                style={{ width: '100%' }}
                            />
                            <Card.Content>
                                <Card.Description>
                                    {item.description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button
                                    positive
                                    onClick={() =>
                                        handleSetOpen(item.imageLink)
                                    }
                                >
                                    <Icon name="image outline" />
                                    Menu
                                </Button>
                            </Card.Content>
                        </Card>
                    </>
                ))}
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
