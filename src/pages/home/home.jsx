import withAuth from '../../hoc/withAuth'

function Home() {
    return (
        <div>
            This is Home..
        </div>
    )
}

export default withAuth(Home, null);
