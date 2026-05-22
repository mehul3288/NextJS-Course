import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
  return (

    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
            {/* Here the image will be resolved at runtime and hence because of that the Image tag doesn't haven info about the image's width and height because of which it can't automatically resolve the dimension so we use fill property which will fill the avaibale space as per the image*/}
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}