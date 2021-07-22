import withAuth from '../../hoc/withAuth'

function Home({ user }) {
    return (
        <div>
            {user ? `Hello, ${user.name}!` : "This is home..."}
        </div>
    )
}

export default withAuth(Home, null);
