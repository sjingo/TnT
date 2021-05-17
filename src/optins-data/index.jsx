import React, { useEffect, useState } from 'react'
import {
    Button,
    Segment,
    Feed,
    Grid,
    Statistic,
    Table,
    Icon,
    TableHeaderCell,
} from 'semantic-ui-react'
import { CSVLink } from 'react-csv'

const OptinsData = ({ db }) => {
    const [data, setData] = useState([])
    const [grandTotal, setGrandTotal] = useState(0)
    const [totalOptedIn, setTotalOptedIn] = useState(0)
    const [optedInData, setOptedInData] = useState(null)
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
                                const flatCheckins = Object.entries(
                                    checkins
                                ).map((item) => {
                                    return {
                                        ...item[1],
                                        id: item[0],
                                        ['Checked in']: date
                                            .split('-')
                                            .reverse()
                                            .join('-'),
                                    }
                                })
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
                                    (item) => item.consent
                                )
                                accum.grandTotal += total
                                accum.optedIn += optedIn.length
                                accum.optedInData = [
                                    ...accum.optedInData,
                                    ...[optedIn][0],
                                ]
                                return accum
                            },
                            { grandTotal: 0, optedIn: 0, optedInData: [] }
                        )
                        setGrandTotal(totals.grandTotal)
                        setTotalOptedIn(totals.optedIn)
                        setOptedInData(totals.optedInData)
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

    if (!data || !optedInData) return null
    return (
        <>
            <Grid columns={3} as={Segment}>
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
                <Grid.Column>
                    <Button
                        positive
                        size="large"
                        disabled={optedInData.length === 0}
                    >
                        <Icon name="table" />
                        <CSVLink data={optedInData} style={{ color: 'white' }}>
                            Download all opted in
                        </CSVLink>
                    </Button>
                </Grid.Column>
            </Grid>
            <Table stackable striped>
                <Table.Header>
                    <Table.Row>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Total</TableHeaderCell>
                        <TableHeaderCell>Track and Trace</TableHeaderCell>
                        <TableHeaderCell>Send stuff</TableHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((item, index) => {
                        const consented = item.flatCheckins.filter(
                            (person) => person.consent
                        )
                        return (
                            <Table.Row key={item.date}>
                                <Table.Cell>
                                    {item.date.split('-').reverse().join('/')}
                                </Table.Cell>
                                <Table.Cell>{item.total}</Table.Cell>
                                <Table.Cell>
                                    <Button secondary data-date={item.date}>
                                        <Icon name="group" />
                                        <CSVLink
                                            style={{ color: 'white' }}
                                            data={data[index].flatCheckins}
                                        >
                                            Download Track & Trace
                                        </CSVLink>
                                    </Button>
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
