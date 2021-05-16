import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
const OptinsData = ({ db }) => {
    const [data, setData] = useState()
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
                        const dates = raw.reduce(
                            (accumulator, [key, checkins]) => {
                                if (!String(key).includes('-')) {
                                    console.log(key)
                                    return accumulator
                                }
                                let date = key
                                let d = key.split('-')
                                if (d[0].length > d[2].length) {
                                    date = [d[2], d[1], d[0]].join('-')
                                }
                                const data = { date, checkins }
                                console.log(data)
                                accumulator = [...accumulator, data]
                                return accumulator
                            },
                            []
                        )
                        console.log(dates)
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
    return <Table></Table>
}
export default OptinsData
