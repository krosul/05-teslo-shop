import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import Styles from './SlideShow.module.css';
import 'react-slideshow-image/dist/styles.css';
interface Props {
  images: string[];
}
export const SlideShow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={7000} indicators defaultIndex={0}>
      {images.map((img) => {
        const url = `/products/${img}`;
        return (
          <div className={Styles['each-slide']} key={img}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
