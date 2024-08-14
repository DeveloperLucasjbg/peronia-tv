import AdBanner from './components/AdBanner'

const channelIds = ['UCeY0bbntWzzVIaj2z3QigXg'] // Reemplaza con tus IDs de canal

export default function Page () {
  return (
    <main>
      <h1>Live Videos</h1>
      {/* <LiveVideo channelIds={channelIds} /> */}
      <AdBanner dataAdFormat='auto' dataFullWidthResponsive={true} />
      <div style={{ height: '300px',width: '100%', background: 'black' }} className='bg-black mb-5'>
        <AdBanner dataAdFormat='auto' dataFullWidthResponsive={true} />
      </div>
    </main>
  )
}
