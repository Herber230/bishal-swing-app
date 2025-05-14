import { Divider } from '@heroui/divider';

const placeHolders = [
  { title: 'Servicios' },
  { title: 'Ubicaciones' },
  { title: 'Contacto' },
  { title: 'Nuestras Metodologías' },
  { title: 'Agenda tu clase de prueba gratis' },
  { title: 'Pie de pagina' },
];

export default async function Page() {
  return (
    <>
      {placeHolders.map((placeHolder, i) => (
        <section key={`section-${i}`} className="w-full">
          <div className="flex flex-col justify-center items-center h-[700px]">
            <h2>{placeHolder.title}</h2>
          </div>
          <Divider className="border-black" />
        </section>
      ))}
    </>
  );
}
