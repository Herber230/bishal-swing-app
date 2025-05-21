import { HeroSection } from '@/components/organisms/hero-section';

const placeHolders = [
  { title: 'Servicios' },
  { title: 'Ubicaciones' },
  { title: 'Contacto' },
  { title: 'Nuestras Metodologías' },
  { title: 'Agenda tu clase de prueba gratis' },
  { title: 'Pie de pagina' },
];

const carouselItems = [
  {
    src: '/images/carousel-1.png',
    alt: 'Image 1',
  },
  {
    src: '/images/carousel-2.png',
    alt: 'Image 2',
  },
  {
    src: '/images/carousel-3.png',
    alt: 'Image 3',
  },
  {
    src: '/images/carousel-4.png',
    alt: 'Image 4',
  },
];

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-s">
      <HeroSection
        carousel={{
          items: carouselItems,
        }}
      />
      <hr className="border-primary w-[215px]" />
      {placeHolders.map((placeHolder, i) => (
        <section key={`section-${i}`} className="w-full">
          <div className="flex flex-col justify-center items-center h-[700px]">
            <h2>{placeHolder.title}</h2>
          </div>
          <hr className="border-primary w-[430px]" />
        </section>
      ))}
    </div>
  );
}
