import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import Service from '../../utils/api/service';
import { ArticleCard } from '../../Components/ArticleCard/ArticleCard';
import { Loading } from '../../Components/Loading/Loading';

export const Home = () => {

    const [news, setNews] = useState<number[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await Service.getNewArticles();
            const data = response.data;
            setNews(data);
        }
        getData();

        const interval = setInterval(() => {
            getData();
        }, 60*1000);

        return () => clearInterval(interval);
    }, []);

    if(!news.length) {
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        )
    }

    document.title = "Hacker News - Empowering Curiosity";
 
    return (
        <div className={styles.container}>
            {news.map(article => 
                <ArticleCard 
                    id={article}
                    key={article}
                />)}
        </div>
    )

}