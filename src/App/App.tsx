import { Route, Routes } from 'react-router-dom'
import { Home } from '../Pages/Home/Home'
import { Article } from '../Pages/Article/Article'
import styles from './App.module.css'

function App() {

    return (
        <div>
            <div className={styles.headerContainer}>
                <header className={styles.header}>
                    <h1>Hacker News</h1>
                    <p>Empowering Curiosity</p>
                </header>
            </div>
            <div className={styles.pageContainer}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/article/:id" element={<Article/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
