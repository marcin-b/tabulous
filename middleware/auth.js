export default function ({ store, error }) {
    if (!store.state.authUser) {
        error({
            message: 'You need to be logged in to see that page',
            statusCode: 401
        })
    }
}
