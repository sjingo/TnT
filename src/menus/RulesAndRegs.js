import React, { useState } from 'react'
import { Button, Card, Header, Icon, Image, Modal } from 'semantic-ui-react'

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
            <Header
                as="h2"
                color="black"
                style={{
                    background: 'white',
                    padding: '0.25rem',
                    borderRadius: ' 2px',
                }}
            >
                <Header.Content>Rules and regulations</Header.Content>
            </Header>
            <Card.Group itemsPerRow={1}>
                <Card raised>
                    <img
                        src="RulesAndRegulations.png"
                        alt="The rules and regulations whilst at Hagglers"
                        style={{ width: '100%' }}
                    />
                    <Card.Content>
                        <Card.Description>
                            Brush up on how we're staying safe, whilst enjoying
                            the best of Hagglers Corner's goings on.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button
                            color="teal"
                            onClick={() => handleSetOpen('/RulesAndRegs.jpg')}
                        >
                            <Icon name="image outline" />
                            Read
                        </Button>
                    </Card.Content>
                </Card>
            </Card.Group>
        </>
    )
}
