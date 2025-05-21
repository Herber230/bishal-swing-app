import { Button } from '@heroui/button';
import { Title } from '@/components/atoms/title';
import { Paragraph } from '@/components/atoms/paragraph';
import { Carousel } from '@/components/molecules/carousel';
import { getServerTranslations } from '@/utils/i18n/get-server-translations';
import type { HeroSectionProps } from './hero-section.types';

export async function HeroSection({
  carousel,
  ns = 'home.hero',
}: HeroSectionProps): Promise<React.JSX.Element> {
  const { t } = await getServerTranslations({ ns });

  return (
    <div className="flex flex-col items-center justify-center mt-s mx-xs gap-s">
      <div>
        <Title>{t('discoverYourPassion')}</Title>
        <Title variation>
          {t('in')}
          <span className="text-primary ml-2xs">{t('bishalSwing')}</span>
        </Title>
      </div>
      <div className="relative">
        <Carousel {...carousel} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black from-50% to-80% z-1" />
        <div className="absolute bottom-0 left-0 z-2 py-s mx-m flex flex-col items-center justify-center gap-s">
          <Paragraph className="text-white text-center leading-none">
            {t('becomePartOfOurFamily')}
          </Paragraph>
          <Paragraph className="text-white font-bold text-base uppercase font-primary text-center">
            {t('scheduleYourClass')} <br />
            <span className="text-primary mx-3xs">{t('free')}</span>
            {t('today')}
          </Paragraph>
          <Button
            color="primary"
            className="font-bold text-base uppercase font-primary text-center py-m px-l"
          >
            {t('iAmInterested')}
          </Button>
        </div>
      </div>
      <Paragraph className="font-black uppercase font-primary text-center text-lg italic">
        {t('slogan')}
      </Paragraph>
    </div>
  );
}
