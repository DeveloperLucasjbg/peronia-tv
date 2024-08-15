import Image from 'next/image';
import AdBanner from './components/AdBanner';
import Cotizaciones from './components/Cotizaciones/Cotizaciones';
import Riesgo from './components/Riesgo/Riesgo';
import Inflacion from './components/Riesgo/inflacion';


const channelIds = ['UCWSfXECGo1qK_H7SXRaUSMg'] // Reemplaza con tus IDs de canal

export default function Page () {

  return (
    <main>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', margin: '1.5rem'}}>
      <Image src="/perucaIcon.png" alt="Peruca Icon" width={100} height={100} />
      <div>
      <h1>gordoSeViene</h1>
      <p>gordo data center</p>
      </div>
      <Riesgo></Riesgo>
      <Inflacion></Inflacion>
      </div>
      <Cotizaciones></Cotizaciones>
     
      {/* <LiveVideo channelIds={channelIds} /> */}
      <div
        style={{ height: '300px', width: '100%', background: 'black' }}
        className='bg-black mb-5'
      >
        <AdBanner
          dataAdFormat='auto'
          dataFullWidthResponsive={true}
          idd={5171626815}
        />
        <AdBanner
          dataAdFormat='auto'
          dataFullWidthResponsive={true}
          idd={2689767857}
        />
      </div>
    </main>
  )
}
