import React, { useEffect, useState } from 'react'
import {
    Button,
    Segment,
    Feed,
    Grid,
    Statistic,
    Table,
    TableHeaderCell,
} from 'semantic-ui-react'
const OptinsData = ({ db }) => {
    const [data, setData] = useState([])
    const [grandTotal, setGrandTotal] = useState(0)
    const [totalOptedIn, setTotalOptedIn] = useState(0)
    const [trackTrace, setTrackTrace] = useState([])
    const handleClickView = (e) => {
        const { date } = e.currentTarget.dataset
        const [result] = data.filter((item) => {
            return item.date === date
        })
        const trackTrace = result && result.flatCheckins
        console.log(trackTrace)
        setTrackTrace(trackTrace)
    }
    useEffect(() => {
        if (db) {
            var docRef = db.collection('TrackAndTrace').doc('Hagglers')
            docRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const raw = Object.entries(doc.data())
                        const dates = raw
                            .reduce((accumulator, [key, checkins]) => {
                                if (!String(key).includes('-')) {
                                    return accumulator
                                }
                                let date = key
                                let d = key.split('-')
                                if (d[0].length === 1) {
                                    const zero = `0${d[0]}`
                                    d[0] = zero
                                }
                                if (d[2].length === 1) {
                                    const second = `0${d[2]}`
                                    d[2] = second
                                }

                                if (d[2].length > d[0].length) {
                                    date = [d[2], d[1], d[0]].join('-')
                                } else {
                                    date = [d[0], d[1], d[2]].join('-')
                                }
                                const flatCheckins = Object.entries(checkins)
                                const data = {
                                    date,
                                    total: flatCheckins.length,
                                    flatCheckins,
                                }
                                accumulator = [...accumulator, data]
                                return accumulator
                            }, [])
                            .sort((a, b) => {
                                if (a.date > b.date) {
                                    return -1
                                } else if (b.date > a.date) {
                                    return 1
                                } else {
                                    return -1
                                }
                            })
                        const totals = dates.reduce(
                            (accum, item) => {
                                const { total, flatCheckins } = item
                                const optedIn = flatCheckins.filter(
                                    ([id, item]) => item.consent
                                )
                                accum.grandTotal += total
                                accum.optedIn += optedIn.length
                                return accum
                            },
                            { grandTotal: 0, optedIn: 0 }
                        )
                        setGrandTotal(totals.grandTotal)
                        setTotalOptedIn(totals.optedIn)
                        setData(dates)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!')
                    }
                })
                .catch((error) => {
                    console.log('Error getting document:', error)
                })
        }
    }, [db])

    if (!data) return null
    return (
        <>
            <Grid columns={2} as={Segment}>
                <Grid.Column>
                    <Statistic size="tiny">
                        <Statistic.Value>{grandTotal}</Statistic.Value>
                        <Statistic.Label>Checkins</Statistic.Label>
                    </Statistic>
                </Grid.Column>
                <Grid.Column>
                    <Statistic size="tiny">
                        <Statistic.Value>{totalOptedIn}</Statistic.Value>
                        <Statistic.Label>
                            Opted in for marketing
                        </Statistic.Label>
                    </Statistic>
                </Grid.Column>
            </Grid>
            <Table stackable striped>
                <Table.Header>
                    <Table.Row>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Total</TableHeaderCell>
                        <TableHeaderCell>Checked in</TableHeaderCell>
                        <TableHeaderCell>Send me stuff</TableHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((item, index) => {
                        const consented = item.flatCheckins.reduce(
                            (accumulator, [id, person]) => {
                                if (person && person.consent) {
                                    accumulator.push({
                                        ...person,
                                        id,
                                    })
                                }
                                return accumulator
                            },
                            []
                        )
                        return (
                            <Table.Row key={item.date}>
                                <Table.Cell>
                                    {item.date.split('-').reverse().join('/')}
                                </Table.Cell>
                                <Table.Cell>{item.total}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        primary
                                        onClick={handleClickView}
                                        content={`View all on ${item.date}`}
                                        data-date={item.date}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Feed>
                                        {consented.map((person) => (
                                            <Feed.Event key={person.id}>
                                                <Feed.Label>
                                                    {person.name}
                                                </Feed.Label>
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        <Feed.User>
                                                            {person.email}
                                                        </Feed.User>{' '}
                                                        opted in
                                                        <Feed.Date>
                                                            {person.mobile}
                                                        </Feed.Date>
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        ))}
                                    </Feed>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
}
export default OptinsData
