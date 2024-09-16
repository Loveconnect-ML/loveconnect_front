import React from 'react'

function Snap({ image, content, createdAt, id, title, updatedAt }: Snap) {

    return (
        <div key={id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <p>{createdAt}</p>
        </div>
    )
}

export default Snap