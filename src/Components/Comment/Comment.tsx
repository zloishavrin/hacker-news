import { FC, useEffect, useState } from "react"
import Service from "../../utils/api/service";
import styles from './Comment.module.css';
import DOMPurify from 'dompurify';
import { Item } from "../../utils/interfaces/itemInterface";

interface Props {
    id: number;
}

export const Comment:FC<Props> = ({ id }) => {

    const [comment, setComment] = useState<null | Item>(null);
    const [kids, setKids] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const response = await Service.getArticle(String(id));
            const data = response.data;
            setComment(data);
        }
        getData();
    }, [id]);

    if(!comment) {
        return null;
    }

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentHeader}>
                <p>{comment.deleted || comment.dead ? <p>[Comment deleted]</p> : comment.by}</p>
                <p>{new Date(comment.time*1000).toLocaleDateString()}</p>
            </div>
            {
                comment.deleted || comment.dead ? 
                    <p>[Comment deleted]</p>
                    :
                    comment.text &&
                    <p 
                        className={styles.commentText}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }} 
                    />
            }
            
            {
                !kids ?
                    comment.kids && 
                        <p 
                            className={styles.moreComments}
                            onClick={() => setKids(true)}
                        >
                            More comments
                        </p>
                    : 
                    comment.kids && comment.kids.map((kid) => (
                        <Comment
                            id={kid}
                            key={kid}
                        />
                    ))
            }
        </div>
    )

}