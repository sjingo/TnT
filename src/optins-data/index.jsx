import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
const OptinsData = ({ db }) => {
    const [data, setData] = useState()
    useEffect(() => {
        var docRef = db.collection('TrackAndTrace').doc('Hagglers')

        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log('Document data:', doc.data())
                    setData(doc.data)
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!')
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error)
            })
    }, [db])
    return (
        <Table>
            {data
                ? Object.entries(data).map((date) => {
                      Object.entries.map(date).map((item) => {
                          return <Table.Cell>{item.email}</Table.Cell>
                      })
                  })
                : null}
        </Table>
    )
}
export default OptinsData
