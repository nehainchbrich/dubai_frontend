import Link from "next/link";
import OwlCarousel from '../../OwlCarousel';
import styles from "../../../styles/Banner.module.css";
import BannerCard from './BannerCard';
const options = { loop: true, nav: true, navText: [`<i class='fa fa-chevron-left ${styles.left_btn}'></i>`, `<i class='fa fa-chevron-right ${styles.right_btn}'></i>`], items: 1, dots: false, autoplay: false, autoplayTimeout: 5000, autoplayHoverPause: true };
const Banner = ({ data }) => {
  const imageItems = data.filter(item => {
    const ext = item.thumbnail.split('.').pop().toLowerCase();
    return ext === 'jpg' || ext === 'svg' || ext === 'png' || ext === 'jpeg' || ext === 'webp';
  });
  const videoItems = data.filter(item => {
    const ext = item.thumbnail.split('.').pop().toLowerCase();
    return ext === 'mp4' || ext === 'webm' || ext === 'ogg';
  });

  return (
    <>
      <div className={styles.bannerContainer}>
        <OwlCarousel className={`owl-theme ${styles.banner_owl}`} {...options}>
          {imageItems && imageItems.map((item, index) => (
            <div key={`img-${index}`} className={styles.item}>
              <BannerCard item={item} index={index} />
            </div>
          ))}
          {videoItems && videoItems.map((item, index) => (
            <div key={`vid-${index}`} className={styles.item}>
              <BannerCard item={item} isVideo={true} />
            </div>
          ))}
        </OwlCarousel>

        <div className={styles.bannerText}>
          <div className="container">
            <span className={styles.eyebrow}>Since 2018 • Real Estate Experts</span>
            <h1 className={styles.mainTitle}>
              Luxury Living <span>Redefined</span>
            </h1>
            <p className={styles.subTitle}>Experience Dubai's most exclusive properties with Inch & Brick Realty</p>
            <div className={styles.ctaGroup}>
              <Link href="/buy-property-in-dubai" className={styles.primaryBtn}>
                Explore Properties
              </Link>
              <Link href="/top-real-estate-developer-in-dubai" className={styles.secondaryBtn}>
                Top Developers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner;
