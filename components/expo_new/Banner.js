import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/expo_new/Banner.module.css";
import { imageKitLoader, ImagePath } from "@/helper/Helper";
import { staticBlurDataUrl } from "@/utils/staticBlurDataUrl";

import Developers from "@/components/expo_new/Developers";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Banner({ data = [], developer, section, dSection,event }) {
  // ✅ Find active expos
  // console.log(data)
  const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
        const status = (expo.status || "").toUpperCase();
        return (
          status === "ACTIVE" ||
          (status === "UPCOMING" && Number(expo.default_status) === 1)
        );
      })
    : [];
  const description =
    ImagePath(section?.sectionSubHeading) ||
    "Inch & Brick has joined hands with 30+ of Dubai’s leading developers to bring you the finest in luxury and trust.";

  const pathname = usePathname();
  const shouldShowDeveloper =
    pathname.startsWith("/events") || Boolean(dSection);

  useEffect(() => {
    const navLinks = Array.from(document.querySelectorAll(".side-nav a"));
    const sections = navLinks.map((a) =>
      document.querySelector(`#${a.dataset.target}`)
    );

    const handleClick = (e, targetId) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    navLinks.forEach((link) => {
      const handler = (e) => handleClick(e, link.dataset.target);
      link.addEventListener("click", handler);
      link._handler = handler;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const corresponding = document.querySelector(
            `.side-nav a[data-target="${id}"]`
          );
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("active"));
            corresponding?.classList.add("active");
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => sec && io.observe(sec));

    return () => {
      navLinks.forEach((link) =>
        link.removeEventListener("click", link._handler)
      );
      io.disconnect();
    };
  }, []);

  return (
    <header className={`${styles.hero}`} id="home" role="banner">
      <style jsx>{`
        .hero::before {
          background: linear-gradient(
            90deg,
            rgba(6, 8, 12, 0.85),
            rgba(0, 0, 0, 0.39) 40%,
            #fff 70%,
            #fff
          );
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>

      <Image
        loader={imageKitLoader}
        src={data.thumbnail}
        alt={data.title}
        width={100}
        height={200}
        className={styles.bannerBanner}
        placeholder="blur"
        blurDataURL={staticBlurDataUrl()}
        quality={50}
        sizes="(max-width: 426px) 40vw, 426px"
      />

      <div className={styles.heroInner}>
        <div className={styles.headline}>
          <h1>
            {section?.sectionHeading || (
              <>
                Meet us at <br /> 4th Edition of Grand Dubai Property Expo in
                Hyderabad
              </>
            )}
          </h1>
          <p
            className={styles.sub}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>

          {/* ✅ CTA Row */}
          <div className={styles.ctaRow}>
            {activeExpos.length > 0 ? (
              <Link className={styles.btn} href="/expo-invitation">
                Download Free VIP Pass
              </Link>
            ) : (
              <Link
                className={`${styles.btn} ${styles.ghost}`}
                href="/contact-us"
              >
                Talk to Us
              </Link>
            )}
          </div>
        </div>
      </div>

      {shouldShowDeveloper && (
        <Developers data={developer} section={dSection} />
      )}
    </header>
  );
}

export default Banner;
