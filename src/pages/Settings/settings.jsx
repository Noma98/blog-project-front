import React, { memo } from 'react'
import SetBlog from './SetBlog/setBlog'
import SetPassword from './SetPassword/setPassword'
import SetUser from './SetUser/setUser'

const Settings = memo(({ user, api, onFetchUser, onFetchLoginData }) => {
    return (
        <div>
            <SetBlog user={user} api={api} onFetchUser={onFetchUser} />
            <SetUser user={user} api={api} onFetchLoginData={onFetchLoginData} />
            <SetPassword user={user} api={api} onFetchUser={onFetchUser} />
        </div>
    )
})

export default Settings

