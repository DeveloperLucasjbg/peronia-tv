import AdBanner from './components/AdBanner'
import LiveVideo from './components/LiveVideo'

const channelIds = ['UCeY0bbntWzzVIaj2z3QigXg'] // Reemplaza con tus IDs de canal

export default function Page () {
  return (
    <main>
      <h1>Live Videos</h1>
      <LiveVideo channelIds={channelIds} />
      <AdBanner
        dataAdFormat='auto'
        dataFullWidthResponsive={true}
      />
    </main>
  )
}
