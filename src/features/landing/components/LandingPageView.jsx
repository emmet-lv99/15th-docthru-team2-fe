import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import * as styles from '@/features/landing/components/landing.css.js';

const IMAGE_ROOT = '/images/landing';

const features = [
  {
    id: 'together',
    icon: 'icon-trophy.svg',
    title: '혼자서는 막막했던 번역,\n챌린지로 함께 완성하기',
    description: '중요한 건 꺾이지 않는 마음! 동료들과 함께 기술 문서를 번역해 보세요.',
    desktopImage: 'challenge-desktop.png',
    mobileImage: 'challenge-mobile.png',
    width: 570,
    height: 411,
    mobileWidth: 343,
    mobileHeight: 277,
  },
  {
    id: 'choice',
    icon: 'icon-heart.svg',
    title: '내가 좋아하는 기술 번역,\n내가 필요한 기술 번역',
    description: '이미 진행 중인 번역 챌린지에 참여하거나, 새로운 번역 챌린지를 시작해 보세요.',
    desktopImage: 'translation-desktop.png',
    mobileImage: 'translation-mobile.png',
    width: 570,
    height: 455,
    mobileWidth: 375,
    mobileHeight: 299,
  },
  {
    id: 'feedback',
    icon: 'icon-feedback.svg',
    title: '피드백으로 함께 성장하기',
    description:
      '번역 작업물에 대해 피드백을 주고 받으며 영어 실력은 물론, 개발 실력까지 키워 보세요',
    desktopImage: 'feedback-desktop.png',
    mobileImage: 'feedback-mobile.png',
    width: 505,
    height: 346,
    mobileWidth: 343,
    mobileHeight: 235,
  },
];

/** Figma의 PC·모바일 이미지 자산을 각 브레이크포인트에 맞춰 사용합니다. */
function FeatureImage({ feature }) {
  return (
    <picture className={styles.featureImage}>
      <source
        media="(max-width: 640px)"
        srcSet={`${IMAGE_ROOT}/${feature.mobileImage}`}
        width={feature.mobileWidth}
        height={feature.mobileHeight}
      />
      <Image
        src={`${IMAGE_ROOT}/${feature.desktopImage}`}
        alt=""
        aria-hidden="true"
        width={feature.width}
        height={feature.height}
        sizes="(max-width: 1024px) 100vw, 570px"
        className={styles.featureImageElement}
      />
    </picture>
  );
}

export default function LandingPageView() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="landing-heading">
        <picture className={styles.heroBackground}>
          <source media="(max-width: 640px)" srcSet={`${IMAGE_ROOT}/hero-mobile.png`} />
          <source media="(max-width: 1024px)" srcSet={`${IMAGE_ROOT}/hero-tablet.png`} />
          <Image
            src={`${IMAGE_ROOT}/hero-desktop.png`}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
        </picture>
        <div className={styles.heroContent}>
          <div className={styles.heroBrand} aria-hidden="true">
            <Image src="/icons/docthru-logo.svg" alt="" width={23} height={26} />
            <span>Docthru</span>
          </div>
          <h1 id="landing-heading" className={styles.heroTitle}>
            함께 번역하며 성장하는
            <span>개발자의 새로운 영어 습관</span>
          </h1>
          <Button
            as={Link}
            href="/challenges"
            variant="outline"
            size="lg"
            className={styles.heroButton}
          >
            번역 시작하기
          </Button>
        </div>
      </section>

      <div className={styles.content}>
        {features.map((feature, index) => (
          <section
            key={feature.id}
            className={[
              styles.feature,
              index === 0 ? styles.firstFeature : '',
              index === 1 ? styles.secondFeature : '',
              index === 2 ? styles.thirdFeature : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-labelledby={`landing-feature-${feature.id}`}
          >
            <div className={styles.featureText}>
              <Image
                src={`${IMAGE_ROOT}/${feature.icon}`}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className={styles.featureIcon}
              />
              <h2 id={`landing-feature-${feature.id}`} className={styles.featureTitle}>
                {feature.title}
              </h2>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
            <FeatureImage feature={feature} />
          </section>
        ))}
        <div className={styles.footerCallToAction}>
          <h2 className={styles.footerTitle}>함께 번역하고 성장하세요!</h2>
          <Button
            as={Link}
            href="/challenges"
            variant="solid"
            size="lg"
            className={styles.footerButton}
          >
            <span className={styles.desktopCtaLabel}>번역 시작하기</span>
            <span className={styles.mobileCtaLabel}>작업 도전하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
