import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import {
  Plus,
  Cable,
  Box,
  Server,
  MapPin,
  Zap,
  Filter,
  Layers,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NetworkMap: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Cameroon coordinates (centered on Douala)
  const center: [number, number] = [4.0511, 9.7679];

  // Sample network elements
  const networkElements = [
    {
      id: '1',
      type: 'dslam',
      name: 'DSLAM Bonanjo',
      position: [4.0611, 9.7579] as [number, number],
      status: 'active',
      properties: { capacity: 1000, used: 750 },
    },
    {
      id: '2',
      type: 'junction_box',
      name: 'Boîtier Akwa',
      position: [4.0411, 9.7679] as [number, number],
      status: 'active',
      properties: { connections: 24 },
    },
    {
      id: '3',
      type: 'client_point',
      name: 'Client Makepe',
      position: [4.0311, 9.7779] as [number, number],
      status: 'active',
      properties: { bandwidth: 100 },
    },
    {
      id: '4',
      type: 'cable',
      name: 'Liaison Principale',
      position: [4.0511, 9.7679] as [number, number],
      status: 'active',
      properties: { length: 5.2, fiberCount: 48 },
    },
  ];

  // Cable routes
  const cableRoutes = [
    {
      id: 'route1',
      name: 'Liaison Bonanjo-Akwa',
      positions: [
        [4.0611, 9.7579] as [number, number],
        [4.0411, 9.7679] as [number, number],
      ],
      status: 'active',
    },
    {
      id: 'route2',
      name: 'Extension Makepe',
      positions: [
        [4.0411, 9.7679] as [number, number],
        [4.0311, 9.7779] as [number, number],
      ],
      status: 'active',
    },
  ];

  const getElementIcon = (type: string, status: string) => {
    const color = status === 'active' ? '#10B981' : status === 'maintenance' ? '#F59E0B' : '#EF4444';
    
    const iconMap = {
      dslam: Server,
      junction_box: Box,
      client_point: MapPin,
      cable: Cable,
      pole: Zap,
    };

    const IconComponent = iconMap[type as keyof typeof iconMap] || MapPin;
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="2"/>
          <text x="16" y="20" text-anchor="middle" fill="white" font-size="12">●</text>
        </svg>
      `)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const layerOptions = [
    { value: 'all', label: 'Tous les éléments', icon: Layers },
    { value: 'cables', label: 'Câbles', icon: Cable },
    { value: 'equipment', label: 'Équipements', icon: Server },
    { value: 'clients', label: 'Points clients', icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('network.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualisation et gestion de votre infrastructure réseau
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Plus className="h-4 w-4 mr-2" />
            {t('network.addElement')}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Couches:</span>
            {layerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedLayer(option.value)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  selectedLayer === option.value
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <option.icon className="h-4 w-4 mr-2" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Map */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-96 lg:h-[600px]">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Cable routes */}
            {cableRoutes.map((route) => (
              <Polyline
                key={route.id}
                positions={route.positions}
                color={route.status === 'active' ? '#10B981' : '#EF4444'}
                weight={4}
                opacity={0.8}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{route.name}</h3>
                    <p className="text-sm text-gray-600">
                      Statut: <span className="capitalize">{route.status}</span>
                    </p>
                  </div>
                </Popup>
              </Polyline>
            ))}

            {/* Network elements */}
            {networkElements
              .filter((element) => 
                selectedLayer === 'all' || 
                (selectedLayer === 'cables' && element.type === 'cable') ||
                (selectedLayer === 'equipment' && ['dslam', 'junction_box'].includes(element.type)) ||
                (selectedLayer === 'clients' && element.type === 'client_point')
              )
              .map((element) => (
                <Marker
                  key={element.id}
                  position={element.position}
                  icon={getElementIcon(element.type, element.status)}
                >
                  <Popup>
                    <div className="p-2 min-w-48">
                      <h3 className="font-semibold text-gray-900">{element.name}</h3>
                      <p className="text-sm text-gray-600 capitalize mb-2">
                        Type: {element.type.replace('_', ' ')}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            element.status === 'active' ? 'bg-green-500' : 
                            element.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="text-sm capitalize">{element.status}</span>
                        </div>
                        {Object.entries(element.properties).map(([key, value]) => (
                          <div key={key} className="text-sm text-gray-600">
                            <span className="capitalize">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Détails
                        </button>
                        <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          Modifier
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Cable className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Câbles Totaux</p>
              <p className="text-2xl font-semibold text-gray-900">127</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Server className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Équipements</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Points Clients</p>
              <p className="text-2xl font-semibold text-gray-900">2,847</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Couverture</p>
              <p className="text-2xl font-semibold text-gray-900">78%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMap;