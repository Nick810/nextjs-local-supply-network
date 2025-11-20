// components/ExpressAddressMap.tsx
'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
// import { Input } from '@/components/ui/input' // หรือใช้ input ปกติก็ได้

const containerStyle = { width: '100%', height: '420px', borderRadius: '12px' }

type Props = {
  onSelect: (data: { lat: number; lng: number; address: string; link: string }) => void
}

export default function ExpressAddressMap({ onSelect }: Props) {
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null)
  const [address, setAddress] = useState('')
  const [map, setMap] = useState<google.maps.Map | null>(null)

  // 1. คลิกบนแผนที่ → ปักหมุด + reverse geocode
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    updateMarker(lat, lng)
  }, [])

  // 2. พิมพ์ค้นหา → Places Autocomplete
  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry?.location) return

      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      const formatted = place.formatted_address || ''

      setAddress(formatted)
      updateMarker(lat, lng)
      map?.panTo({ lat, lng })
      map?.setZoom(17)
    })
  }

  const updateMarker = (lat: number, lng: number) => {
    setMarker({ lat, lng })
    const link = `https://maps.google.com/?q=${lat},${lng}`
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const addr = results[0].formatted_address
        setAddress(addr)
        onSelect({ lat, lng, address: addr, link })
      }
    })
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
      libraries={['places']}
    >
      <div className="space-y-4">
        <p className="text-lg font-medium">ปักหมุดหรือค้นหาตำแหน่งรับสินค้า</p>

        {/* ช่องค้นหาที่อยู่ */}
        <div className="relative">
          <input
            type="text"
            placeholder="ค้นหาที่อยู่ เช่น บ้านเลขที่, หมู่บ้าน, ถนน..."
            className="w-full px-4 py-6 text-lg"
            onFocus={(e) => {
              const autocomplete = new google.maps.places.Autocomplete(e.target, {
                types: ['geocode'],
                componentRestrictions: { country: 'th' },
              })
              handleLoad(autocomplete)
            }}
          />
        </div>

        {/* แผนที่ */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marker || { lat: 13.7563, lng: 100.5018 }}
          zoom={marker ? 17 : 10}
          onClick={handleMapClick}
          onLoad={setMap}
          options={{ streetViewControl: false }}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>

        {address && (
          <div className="p-5 bg-green-50 border-2 border-green-300 rounded-xl">
            <p className="font-semibold text-green-800">ตำแหน่งที่เลือกแล้ว</p>
            <p className="text-sm mt-1">{address}</p>
            <a href={`https://maps.google.com/?q=${marker?.lat},${marker?.lng}`} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 underline text-sm">เปิดใน Google Maps</a>
          </div>
        )}
      </div>
    </LoadScript>
  )
}