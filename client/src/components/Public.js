import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Assignment</span></h1>
            </header>
            <main className="public__main">
                <p>Md Muhaiminul Islam</p>
                <address className="public__addr">
                    Software engineer<br />
                    Employee Id: 11172<br />
                    Foo City, CA 12345<br />
                </address>
                <br />
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public