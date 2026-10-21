import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { DogReport, DonationPoint, RescueCase } from '../types';
import {
  Search,
  Filter,
  MapPin,
  Utensils,
  Droplets,
  Heart,
  AlertTriangle,
  PlusCircle,
  Eye,
  Navigation,
  CheckCircle2,
  Calendar,
  Layers,
  List
} from 'lucide-react';

export type MapFilterCategory =
  | 'all'
  | 'dog_location'
  | 'food_needed'
  | 'water_needed'
  | 'donation_point'
  | 'emergency';

interface MapViewProps {
  reports: DogReport[];
  donationPoints: DonationPoint[];
  rescueCases: RescueCase[];
  initialCategory?: MapFilterCategory;
  onSelectMarker?: (item: DogReport | DonationPoint | RescueCase, category: MapFilterCategory) => void;
  className?: string;
  showControls?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  reports,
  donationPoints,
  rescueCases,
  initialCategory = 'all',
  onSelectMarker,
  className = '',
  showControls = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeCategory, setActiveCategory] = useState<MapFilterCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedItem, setSelectedItem] = useState<{
    item: DogReport | DonationPoint | RescueCase;
    category: MapFilterCategory;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Default center: Bengaluru central coordinates (12.9716, 77.5946)
  const defaultCenter: [number, number] = [12.9716, 77.6412];

  // Helper to create custom SVG HTML icons
  const createCustomIcon = (category: MapFilterCategory, isUrgent: boolean = false) => {
    let bgColor = '#F28C38';
    let iconSvg = '🐾';
    let pulseClass = '';

    if (category === 'food_needed') {
      bgColor = '#E59500';
      iconSvg = '🍚';
    } else if (category === 'water_needed') {
      bgColor = '#0284C7';
      iconSvg = '💧';
    } else if (category === 'donation_point') {
      bgColor = '#2F6B4F';
      iconSvg = '❤️';
    } else if (category === 'emergency') {
      bgColor = '#D64545';
      iconSvg = '🆘';
      pulseClass = 'pulse-emergency';
    }

    const html = `
      <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg border-2 border-white ${pulseClass}" style="background-color: ${bgColor};">
          <span>${iconSvg}</span>
        </div>
        <div class="absolute -bottom-1.5 w-2 h-2 rotate-45 border-r border-b border-white" style="background-color: ${bgColor};"></div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-leaflet-pin',
      iconSize: [40, 44],
      iconAnchor: [20, 42],
      popupAnchor: [0, -36]
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 13,
        zoomControl: false
      });

      // OpenStreetMap Tiles (Completely free, no API key required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Add zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers based on Filters & Search
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    const bounds: [number, number][] = [];

    // Filter Verified Donation Points only on public map
    const verifiedPoints = donationPoints.filter((dp) => dp.verificationStatus === 'verified');

    // 1. Food Needed
    if (activeCategory === 'all' || activeCategory === 'food_needed') {
      const foodReports = reports.filter(
        (r) =>
          r.assistanceType === 'food_needed' &&
          (searchQuery === '' ||
            r.approximateLocation.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.nickname && r.nickname.toLowerCase().includes(searchQuery.toLowerCase())))
      );

      foodReports.forEach((rep) => {
        const coords: [number, number] = [rep.approximateLocation.lat, rep.approximateLocation.lng];
        bounds.push(coords);

        const marker = L.marker(coords, {
          icon: createCustomIcon('food_needed')
        });

        marker.on('click', () => {
          setSelectedItem({ item: rep, category: 'food_needed' });
          if (onSelectMarker) onSelectMarker(rep, 'food_needed');
        });

        layer.addLayer(marker);
      });
    }

    // 2. Water Needed
    if (activeCategory === 'all' || activeCategory === 'water_needed') {
      const waterReports = reports.filter(
        (r) =>
          r.assistanceType === 'water_needed' &&
          (searchQuery === '' ||
            r.approximateLocation.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.nickname && r.nickname.toLowerCase().includes(searchQuery.toLowerCase())))
      );

      waterReports.forEach((rep) => {
        const coords: [number, number] = [rep.approximateLocation.lat, rep.approximateLocation.lng];
        bounds.push(coords);

        const marker = L.marker(coords, {
          icon: createCustomIcon('water_needed')
        });

        marker.on('click', () => {
          setSelectedItem({ item: rep, category: 'water_needed' });
          if (onSelectMarker) onSelectMarker(rep, 'water_needed');
        });

        layer.addLayer(marker);
      });
    }

    // 3. Street Dogs Donation Points (Approved only)
    if (activeCategory === 'all' || activeCategory === 'donation_point') {
      const points = verifiedPoints.filter(
        (dp) =>
          searchQuery === '' ||
          dp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dp.approximateLocation.locality.toLowerCase().includes(searchQuery.toLowerCase())
      );

      points.forEach((point) => {
        const coords: [number, number] = [point.approximateLocation.lat, point.approximateLocation.lng];
        bounds.push(coords);

        const marker = L.marker(coords, {
          icon: createCustomIcon('donation_point')
        });

        marker.on('click', () => {
          setSelectedItem({ item: point, category: 'donation_point' });
          if (onSelectMarker) onSelectMarker(point, 'donation_point');
        });

        layer.addLayer(marker);
      });
    }

    // 4. Emergency Assistance
    if (activeCategory === 'all' || activeCategory === 'emergency') {
      const emergencies = rescueCases.filter(
        (c) =>
          c.status !== 'resolved' &&
          (searchQuery === '' ||
            c.location.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      emergencies.forEach((ec) => {
        const coords: [number, number] = [ec.location.lat, ec.location.lng];
        bounds.push(coords);

        const marker = L.marker(coords, {
          icon: createCustomIcon('emergency', true)
        });

        marker.on('click', () => {
          setSelectedItem({ item: ec, category: 'emergency' });
          if (onSelectMarker) onSelectMarker(ec, 'emergency');
        });

        layer.addLayer(marker);
      });
    }

    // 5. General Dog Locations
    if (activeCategory === 'all' || activeCategory === 'dog_location') {
      const generalReports = reports.filter(
        (r) =>
          r.assistanceType !== 'food_needed' &&
          r.assistanceType !== 'water_needed' &&
          r.assistanceType !== 'injured' &&
          (searchQuery === '' ||
            r.approximateLocation.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.nickname && r.nickname.toLowerCase().includes(searchQuery.toLowerCase())))
      );

      generalReports.forEach((rep) => {
        const coords: [number, number] = [rep.approximateLocation.lat, rep.approximateLocation.lng];
        bounds.push(coords);

        const marker = L.marker(coords, {
          icon: createCustomIcon('dog_location')
        });

        marker.on('click', () => {
          setSelectedItem({ item: rep, category: 'dog_location' });
          if (onSelectMarker) onSelectMarker(rep, 'dog_location');
        });

        layer.addLayer(marker);
      });
    }

    // Fit map bounds if markers are present
    if (bounds.length > 0 && mapInstanceRef.current) {
      const latLngBounds = L.latLngBounds(bounds);
      mapInstanceRef.current.fitBounds(latLngBounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [reports, donationPoints, rescueCases, activeCategory, searchQuery, onSelectMarker]);

  // Request browser location
  const handleLocateMe = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([userLat, userLng], 14, { duration: 1.5 });
          // Add user circle
          L.circle([userLat, userLng], {
            radius: 300,
            color: '#2F6B4F',
            fillColor: '#2F6B4F',
            fillOpacity: 0.15
          }).addTo(mapInstanceRef.current);
        }
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        setLocationError('Location permission was denied. You can search your locality manually above.');
      },
      { timeout: 8000 }
    );
  };

  const categories = [
    { id: 'all', label: 'All Markers', icon: Layers, color: 'bg-cream text-charcoal' },
    { id: 'dog_location', label: '🐾 Dog Location', icon: MapPin, color: 'text-primary' },
    { id: 'food_needed', label: '🍚 Food Needed', icon: Utensils, color: 'text-amber-600' },
    { id: 'water_needed', label: '💧 Water Needed', icon: Droplets, color: 'text-blue-600' },
    { id: 'donation_point', label: '❤️ Street Dogs Donation Point', icon: Heart, color: 'text-secondary' },
    { id: 'emergency', label: '🆘 Emergency Assistance', icon: AlertTriangle, color: 'text-emergency' }
  ];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {showControls && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-300 shadow-soft space-y-4">
          {/* Top Bar: Search, View Switch, Actions */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted" />
              <input
                type="text"
                placeholder="Search dog nickname, locality (e.g. Indiranagar, Domlur)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-cream/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-muted hover:text-charcoal"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Switcher & GPS button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLocateMe}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-cream hover:bg-cream-200 border border-cream-300 text-xs font-semibold text-charcoal-light transition-colors"
                title="Use current GPS location"
              >
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                <span className="hidden sm:inline">Locate Me</span>
              </button>

              <div className="flex items-center bg-cream-100 p-1 rounded-xl border border-cream-300">
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'map' ? 'bg-white text-primary shadow-sm' : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
              </div>

              {/* Action Buttons */}
              <Link
                to="/report-dog"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-warm transition-transform active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Dog</span>
              </Link>
              <Link
                to="/add-donation-point"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Add Donation Point</span>
              </Link>
            </div>
          </div>

          {locationError && (
            <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              {locationError}
            </p>
          )}

          {/* Map Legend & Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-bold text-charcoal-muted flex items-center gap-1 mr-1 flex-shrink-0">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as MapFilterCategory)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-charcoal text-white border-charcoal shadow-sm'
                    : 'bg-white hover:bg-cream-100 text-charcoal-light border-cream-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content: Map or List View */}
      {viewMode === 'map' ? (
        <div className="relative rounded-2xl overflow-hidden border border-cream-300 shadow-soft h-[550px] lg:h-[620px] bg-cream">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Active Legend Overlay on Map */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-cream-300 shadow-soft text-xs space-y-1.5 max-w-[220px] hidden sm:block">
            <p className="font-extrabold text-charcoal text-[11px] uppercase tracking-wider">Map Legend</p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
              <span className="text-charcoal-light font-medium">🐾 Dog Location</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="text-charcoal-light font-medium">🍚 Food Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
              <span className="text-charcoal-light font-medium">💧 Water Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
              <span className="text-charcoal-light font-medium">❤️ Donation Point</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emergency inline-block"></span>
              <span className="text-charcoal-light font-medium">🆘 Emergency</span>
            </div>
          </div>

          {/* Selected Marker Detail Slide-out Card */}
          {selectedItem && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 max-w-sm w-full bg-white rounded-2xl border border-cream-300 shadow-soft-lg p-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-cream-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cream-200 text-charcoal">
                    {selectedItem.category.replace('_', ' ')}
                  </span>
                  <h4 className="font-extrabold text-charcoal text-base mt-1">
                    {'name' in selectedItem.item
                      ? selectedItem.item.name
                      : 'nickname' in selectedItem.item && selectedItem.item.nickname
                      ? selectedItem.item.nickname
                      : 'Street Dog Report'}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 rounded-lg text-charcoal-muted hover:bg-cream text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Photo if available */}
              {'photoUrls' in selectedItem.item && selectedItem.item.photoUrls.length > 0 && (
                <div className="mt-2.5 h-32 rounded-xl overflow-hidden bg-cream">
                  <img
                    src={selectedItem.item.photoUrls[0]}
                    alt="Dog or Donation Point"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="mt-2.5 space-y-1.5 text-xs text-charcoal-light">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">
                    {'approximateLocation' in selectedItem.item
                      ? selectedItem.item.approximateLocation.address || selectedItem.item.approximateLocation.locality
                      : selectedItem.item.location.address || selectedItem.item.location.locality}
                  </span>
                </div>

                {'description' in selectedItem.item && (
                  <p className="line-clamp-2 text-charcoal leading-relaxed mt-1">
                    {selectedItem.item.description}
                  </p>
                )}

                {'currentNeeds' in selectedItem.item && (
                  <div className="mt-1">
                    <span className="font-bold text-[11px] text-secondary">Current Needs: </span>
                    <span className="text-charcoal-muted">{selectedItem.item.currentNeeds.slice(0, 2).join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Action Link based on category */}
              <div className="mt-3 pt-2.5 border-t border-cream-200 flex items-center justify-between">
                {'verificationStatus' in selectedItem.item ? (
                  <Link
                    to={`/donation-points/${selectedItem.item.id}`}
                    className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-center text-xs transition-colors"
                  >
                    View Donation Point Details
                  </Link>
                ) : 'urgency' in selectedItem.item ? (
                  <Link
                    to="/emergency"
                    className="w-full py-2 rounded-xl bg-emergency hover:bg-emergency-hover text-white font-bold text-center text-xs transition-colors"
                  >
                    View Emergency Case
                  </Link>
                ) : (
                  <Link
                    to="/feeding-tasks"
                    className="w-full py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-center text-xs transition-colors"
                  >
                    Help / Feed This Dog
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List View Mode */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Food/Water Reports */}
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-2xl border border-cream-300 p-4 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary-dark uppercase">
                      {rep.assistanceType.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-charcoal-muted">
                      {new Date(rep.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-charcoal text-base">
                    {rep.nickname || 'Street Dog Report'}
                  </h4>
                  <p className="text-xs text-charcoal-light mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{rep.approximateLocation.locality}</span>
                  </p>
                  <p className="text-xs text-charcoal mt-2 line-clamp-2 leading-relaxed">
                    {rep.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary capitalize">
                    {rep.status.replace('_', ' ')}
                  </span>
                  <Link
                    to="/feeding-tasks"
                    className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold"
                  >
                    Assist
                  </Link>
                </div>
              </div>
            ))}

            {/* Donation Points */}
            {donationPoints
              .filter((dp) => dp.verificationStatus === 'verified')
              .map((dp) => (
                <div
                  key={dp.id}
                  className="bg-white rounded-2xl border border-secondary/30 p-4 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Drop Point
                      </span>
                    </div>
                    <h4 className="font-extrabold text-charcoal text-base">{dp.name}</h4>
                    <p className="text-xs text-charcoal-light mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      <span>{dp.approximateLocation.locality}</span>
                    </p>
                    <p className="text-xs text-charcoal mt-2 line-clamp-2 leading-relaxed">
                      {dp.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-cream-200">
                    <Link
                      to={`/donation-points/${dp.id}`}
                      className="block w-full text-center py-2 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold"
                    >
                      View Drop Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
