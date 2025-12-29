import OwlCarousel from '../../OwlCarousel';
import Feature from './Feature';
import Link from 'next/link';
const PropertyFeature = ({ title, heading }) => {

  return (
    <>
      <div data-bg="">
        <div className='container'>
          <h2 class='title'>{title}</h2>
          <p>{heading}</p>

          <div className=''>
            {title === 'Ready to Move Property' ? (
              <Link href='/ready-to-move-properties' className='btns btn-orange'>View More →</Link>
            ) : (
              <Link href='/buy-property-in-dubai' className='btns btn-orange'>View More →</Link>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyFeature;
