import React, { useState } from 'react'
import { db, auth } from '../firebase'

import { Input, Button } from '@material-ui/core'

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: new Date().getTime()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button  type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage