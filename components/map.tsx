'use client'

import { icon } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/lib/get-countries'

const Icon = icon({
  iconUrl: '/marker.png',
  iconSize: [50, 50]
})

const Map = ({ location }: { location: string }) => {
  const { getCountryByValue } = useCountries()
  const latLng = getCountryByValue(location)?.latLng

  return (
    <MapContainer
      center={latLng ?? [51.505, -0.09]}
      zoom={8}
      scrollWheelZoom={false}
      className='relative z-0 h-[50vh] rounded-lg'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latLng ?? [51.505, -0.09]} icon={Icon} />
    </MapContainer>
  )
}

export default Map
