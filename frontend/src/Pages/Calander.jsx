import React from 'react'

const Calander = () => {
  return (
    <div>
       <div style={{ width: "100%", height: "800px" }}>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_LINK"
        style={{ border: 0 }}
        width="100%"
        height="100%"
        title="Calendar"
      ></iframe>
    </div>
    </div>
  )
}

export default Calander
