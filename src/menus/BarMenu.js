import React, { useState } from 'react'
import { Button, Card, Header, Icon } from 'semantic-ui-react'
import BarMenuImage from './../assets/BarMenu.png'

export default function () {
    const cards = [
        {
            header: 'Beer, wine, fizz, cocktails',
            description: 'Drinks Menu 1',
            image: BarMenuImage,
            pdfLink: './../assets/BarMenu_page_1.pdf',
        },
        {
            header: 'Mixers, gins, spirits, rum, tequilas ... ',
            description: 'Drinks Menu 2',
            image: BarMenuImage,
            pdfLink: './../assets/BarMenu_page_2.pdf',
        },
    ]
    return (
        <>
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
                                <Button positive as="a" href={item.pdfLink}>
                                    <Icon name="file pdf outline" />
                                    View Menu
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
                        <Button positive>
                            <Icon name="file pdf outline" />
                            View Menu
                        </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    )
}
