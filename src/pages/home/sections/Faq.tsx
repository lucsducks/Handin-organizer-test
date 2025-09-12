import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ id }: { id: string }) {
  const questions = [
    {
      question: "¿Cómo puedo convertirme en instructor de Handin?",
      answer:
        "Para convertirte en instructor de Handin, primero debes registrarte en la plataforma haciendo clic en el botón de registro ubicado en la parte superior derecha de nuestra página web. Una vez que completes el proceso de registro, tendrás acceso a tu panel de usuario. Desde allí, deberás completar tu perfil de instructor proporcionando información detallada sobre tu experiencia y las áreas en las que planeas ofrecer cursos. Handin revisará tu perfil y, una vez aprobado, podrás empezar a crear tus propios eventos o cursos para ofrecer a los estudiantes. Estos eventos pueden ser presenciales, en vivo o grabados, según lo que mejor se adapte a tu estilo de enseñanza y a las necesidades de tus alumnos.",
    },
    {
      question: "¿Cómo creo un curso en Handin?",
      answer:
        "Crear un curso en Handin es un proceso sencillo y accesible desde tu panel de usuario una vez que te hayas registrado como instructor. Primero, debes hacer clic en 'Crear nuevo curso' o 'Crear evento', dependiendo del formato que desees ofrecer. Luego, se te guiará a través de un asistente de creación donde podrás ingresar todos los detalles de tu curso, como el título, la descripción, el contenido del curso, los materiales de apoyo y los métodos de evaluación. También tendrás la opción de establecer si el curso será presencial, en vivo (streaming), o grabado para acceso posterior. Handin ofrece herramientas para que puedas subir videos, documentos y otros recursos que enriquecerán la experiencia de aprendizaje de tus estudiantes.",
    },
    {
      question: "¿Mi curso puede ser sobre cualquier tema?",
      answer:
        "Sí, en Handin valoramos la diversidad de conocimientos y permitimos que los instructores creen cursos sobre una amplia variedad de temas, siempre y cuando cumplan con nuestras políticas de contenido. Esto significa que los cursos deben ser apropiados, legales, y ofrecer valor educativo o práctico a los estudiantes. Antes de publicar tu curso, nuestro equipo revisará el contenido para asegurar que cumple con nuestros estándares de calidad. Queremos asegurarnos de que todos los cursos ofrecidos en Handin proporcionen una experiencia educativa de alta calidad y que los estudiantes puedan confiar en la relevancia y la precisión de la información que reciben.",
    },
    {
      question:
        "¿Tengo que pagar alguna tarifa para convertirme en instructor?",
      answer:
        "No, registrarte como instructor en Handin es completamente gratuito. No hay tarifas iniciales ni cargos ocultos para empezar a ofrecer tus cursos en nuestra plataforma. Sin embargo, una vez que comiences a vender tus cursos o eventos, Handin retendrá un pequeño porcentaje de cada venta como tarifa de servicio. Este porcentaje cubre los costos de operación de la plataforma, así como las herramientas y el soporte que ofrecemos para ayudarte a crear y gestionar tus cursos de manera eficiente. De esta forma, solo pagarás una tarifa cuando realmente estés generando ingresos a través de la plataforma.",
    },
    {
      question: "¿Hay algún requisito que deba cumplir mi curso?",
      answer:
        "Sí, Handin tiene ciertas pautas y estándares de calidad que todos los cursos deben cumplir para garantizar que proporcionen una experiencia de aprendizaje efectiva y valiosa. Por ejemplo, los cursos deben estar bien estructurados, con objetivos claros y contenido organizado que facilite el aprendizaje progresivo de los estudiantes. También es importante que los materiales sean originales o que tengas los derechos para utilizarlos si son de terceros. Además, te alentamos a incluir actividades prácticas, evaluaciones y recursos adicionales para mejorar la experiencia educativa. Antes de que tu curso sea publicado, nuestro equipo lo revisará para asegurarse de que cumple con estos requisitos y que está listo para ofrecer una experiencia de aprendizaje de calidad a los estudiantes.",
    },
    {
      question:
        "¿Se reserva Handin derechos exclusivos sobre mi curso una vez que lo ofrezco en la plataforma?",
      answer:
        "No, Handin no reclama derechos exclusivos sobre tu contenido. Como instructor, tú mantienes todos los derechos sobre los cursos que creas y publicas en nuestra plataforma. Lo que Handin obtiene es una licencia para alojar y vender tu curso, lo que nos permite mostrar tu contenido a los estudiantes y facilitar las transacciones. Esto significa que aún puedes ofrecer tu curso en otras plataformas o medios si lo deseas. Valoramos la propiedad intelectual de nuestros instructores y queremos asegurarte que tienes pleno control sobre tu contenido, mientras nosotros nos encargamos de ofrecer una plataforma robusta para que llegues a una amplia audiencia.",
    },
  ];
  return (
    <article
      id={id}
      className="mx-auto flex w-[90%] flex-col gap-8 py-6 sm:py-8 lg:grid lg:grid-cols-3"
    >
      <section className="flex flex-col gap-4">
        <div className="w-fit gap-2 rounded-full bg-primary-50 px-4 py-1 text-sm text-primary-500-main sm:text-base">
          FAQ
        </div>
        <h1 className="text-2xl font-semibold text-grayscale-800 sm:text-5xl">
          Preguntas Frecuentes
        </h1>
        <p className="text-grayscale-600">
          Aquí encontrarás respuestas a las preguntas más frecuentes sobre
          Handin.
        </p>
      </section>
      <section className="col-span-2">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-4 outline-none"
        >
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-grayscale-800">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-justify">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
