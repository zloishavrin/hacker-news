import { FC, useEffect, useState } from 'react';
import { Star } from '../Star/Star';
import styles from './ArticleCard.module.css';
import Service from '../../utils/api/service';
import { Link } from 'react-router-dom';
import { Item } from '../../utils/interfaces/itemInterface';

interface Props {
    id: number;
}

export const ArticleCard:FC<Props> = ({ id }) => {

    const [article, setArticle] = useState<null | Item>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await Service.getArticle(String(id));
            const data = response.data;
            setArticle(data);
        }
        getData();
    }, [id]);

    if (!article) {
        return null;
    }

    return (
        <Link to={`/article/${id}`} className={styles.element}>
            <h1>{article.title}</h1>
            <div>
                {
                    article.score &&
                    <div className={styles.rating}>
                        <Star isActive={article.score > 10 ? true : false} />
                        <p>{article.score}</p>
                    </div>
                }
                <div className={styles.info}>
                    <p>{new Date(article.time*1000).toDateString()}</p>
                    <p>{article.by}</p>
                </div>
            </div>
        </Link>
    )

}