import { characteristicsData } from '@/data';
import { Card, CardContent } from '../UI';

export const Characteristics = () => {
  return (
    <section className='relative z-10 py-20 px-6 bg-background border-t-4 border-b-4 border-border shadow-card'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-black mb-6 text-foreground transform -rotate-1'>
            ¿Porque deberías elegir?
          </h2>
          <p className='text-xl text-foreground max-w-2xl mx-auto font-bold'>
            Ofrecemos la mejor experiencia de descarga con características únicas
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {
            characteristicsData.map(({ id, bg, rotate, icon: Icon, title, description }) => (
              <Card
                key={id}
                className={`${bg} border-4 border-border shadow-7xl hover:shadow-6xl hover:translate-x-1 hover:translate-y-1 transition-all transform ${rotate}`}
              >
                <CardContent className='p-6'>
                  <div className='w-16 h-16 bg-accent rounded-lg border-4 border-border flex items-center justify-center mb-4 shadow-6xl'>
                    <Icon className='w-8 h-8 text-foreground' />
                  </div>
                  <h3 className='text-xl font-black mb-2 text-foreground'>
                    {title}
                  </h3>
                  <p className='text-foreground font-bold'>
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>
    </section>
  )
}
