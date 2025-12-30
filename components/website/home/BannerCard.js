import { imageKitLoader } from '@/helper/Helper';
import Image from 'next/image';
import Link from 'next/link';

const BannerCard = ({ item, isVideo }) => {
  return (
    <>
      {item.permalink && item.permalink !== "" ? (
        <Link href={item.permalink} target='_blank' style={{ display: 'block', width: '100%', height: '100%' }}>
          {isVideo ? (
            <video autoPlay muted loop playsInline>
              <source src={`${process.env.API_URL}${item.thumbnail}`} type={`video/${item.thumbnail.split('.').pop().toLowerCase()}`} />
            </video>
          ) : (

            // <Image
            //   loader={imageKitLoader}
            //   src={`${item.thumbnail}`}

            //   alt={item.heading1 || 'Inchbrick luxury project'}
            //   fill
            //   style={{ objectFit: 'cover' }}
            //   quality={90}
            //   priority={true}
            // />
            <Image

              src="/images/banner.jpg"
              alt={item.heading1 || 'Inchbrick luxury project'}
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
              priority={true}
            />
          )}
        </Link>
      ) : (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {isVideo ? (
            <video autoPlay muted loop playsInline>
              <source src={`${process.env.API_URL}${item.thumbnail}`} type={`video/${item.thumbnail.split('.').pop().toLowerCase()}`} />
            </video>
          ) : (
            // <Image
            //   loader={imageKitLoader}
            //   src={`${item.thumbnail}`}
            //   alt={item.heading1 || 'Inchbrick luxury project'}
            //   fill
            //   style={{ objectFit: 'cover' }}
            //   quality={90}
            //   priority={true}
            // />
            <Image

              src="/images/banner.jpg"
              alt={item.heading1 || 'Inchbrick luxury project'}
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
              priority={true}
            />
          )}
        </div>
      )}

    </>
  )
}

export default BannerCard
