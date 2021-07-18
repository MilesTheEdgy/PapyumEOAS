import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a> */}
        <span className="ml-1" onClick = {() => {
          const deleteAll = async () => {
            const res = await fetch('/api/reset', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${document.cookie.slice(11)} `
              }
            })
            if (res.status === 200) {
              console.log("reset successfull")
            } else {
              console.log("reset failed")
            }
          }
          deleteAll()
        }} >&copy; 2021 Eczane Ortak Alım İYS.</span>
      </div>
      <div className="mfs-auto">
        {/* <span className="mr-1">Muhammet Aldulaimi'e aittir.</span> */}
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
