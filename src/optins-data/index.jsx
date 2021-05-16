import React, { useEffect, useState } from 'react'
import {
    Button,
    Checkbox,
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
    useEffect(() => {
        if (db) {
            console.log(db)
            var docRef = db.collection('TrackAndTrace').doc('Hagglers')
            docRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log('Document data:', doc.data())
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
                        console.log(dates)
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
                    <Statistic size="small">
                        <Statistic.Value>{grandTotal}</Statistic.Value>
                        <Statistic.Value>Checkins</Statistic.Value>
                    </Statistic>
                </Grid.Column>
                <Grid.Column>
                    <Statistic size="small">
                        <Statistic.Value>{totalOptedIn}</Statistic.Value>
                        <Statistic.Value>
                            Opted in for marketing
                        </Statistic.Value>
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
                        const { names, consented } = item.flatCheckins.reduce(
                            (accumulator, [id, person]) => {
                                if (person && person.name) {
                                    accumulator.names.push(person.name)
                                }
                                if (person && person.consent) {
                                    accumulator.consented.push({
                                        ...person,
                                        id,
                                    })
                                }
                                return accumulator
                            },
                            { names: [], consented: [] }
                        )
                        return (
                            <Table.Row key={item.date}>
                                <Table.Cell>
                                    {item.date.split('-').reverse().join('/')}
                                </Table.Cell>
                                <Table.Cell>{item.total}</Table.Cell>
                                <Table.Cell>
                                    {names.map((name, index) => {
                                        if (index === 4) {
                                            return (
                                                <small key={`${name}${index}`}>
                                                    {' '}
                                                    ...
                                                </small>
                                            )
                                        } else if (index < 4) {
                                            return (
                                                <small key={`${name}${index}`}>
                                                    {name}
                                                    {',\n'}
                                                </small>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
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
