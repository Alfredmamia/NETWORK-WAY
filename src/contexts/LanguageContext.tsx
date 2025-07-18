import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.network': 'Réseau',
    'nav.assets': 'Inventaire',
    'nav.clients': 'Clients',
    'nav.maintenance': 'Maintenance',
    'nav.reports': 'Rapports',
    'nav.planning': 'Planification',
    
    // Common
    'common.search': 'Rechercher...',
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.status': 'Statut',
    'common.location': 'Localisation',
    'common.date': 'Date',
    'common.actions': 'Actions',
    'common.loading': 'Chargement...',
    'common.export': 'Exporter',
    'common.import': 'Importer',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord Network Way',
    'dashboard.welcome': 'Bienvenue dans votre système de gestion réseau fibre optique',
    'dashboard.totalClients': 'Clients Totaux',
    'dashboard.activeConnections': 'Connexions Actives',
    'dashboard.networkUptime': 'Disponibilité Réseau',
    'dashboard.pendingTickets': 'Tickets en Attente',
    'dashboard.recentActivity': 'Activité Récente',
    'dashboard.networkOverview': 'Vue d\'ensemble du Réseau',
    'dashboard.performanceMetrics': 'Métriques de Performance',
    
    // Network
    'network.title': 'Gestion du Réseau',
    'network.map': 'Carte du Réseau',
    'network.elements': 'Éléments du Réseau',
    'network.addElement': 'Ajouter un Élément',
    'network.cable': 'Câble',
    'network.junctionBox': 'Boîtier de Jonction',
    'network.dslam': 'DSLAM',
    'network.clientPoint': 'Point Client',
    'network.pole': 'Poteau',
    'network.conduit': 'Conduit',
    
    // Assets
    'assets.title': 'Inventaire des Actifs',
    'assets.infrastructure': 'Infrastructure',
    'assets.equipment': 'Équipements',
    'assets.cables': 'Câbles',
    'assets.totalValue': 'Valeur Totale',
    'assets.addAsset': 'Ajouter un Actif',
    
    // Clients
    'clients.title': 'Gestion des Clients',
    'clients.addClient': 'Ajouter un Client',
    'clients.residential': 'Résidentiel',
    'clients.business': 'Entreprise',
    'clients.enterprise': 'Grande Entreprise',
    'clients.active': 'Actif',
    'clients.suspended': 'Suspendu',
    'clients.pending': 'En Attente',
    
    // Maintenance
    'maintenance.title': 'Maintenance',
    'maintenance.tickets': 'Tickets',
    'maintenance.addTicket': 'Créer un Ticket',
    'maintenance.priority.low': 'Faible',
    'maintenance.priority.medium': 'Moyenne',
    'maintenance.priority.high': 'Élevée',
    'maintenance.priority.critical': 'Critique',
    'maintenance.status.open': 'Ouvert',
    'maintenance.status.inProgress': 'En Cours',
    'maintenance.status.resolved': 'Résolu',
    'maintenance.status.closed': 'Fermé',
    
    // Reports
    'reports.title': 'Rapports',
    'reports.generate': 'Générer un Rapport',
    'reports.performance': 'Performance',
    'reports.regulatory': 'Réglementaire',
    'reports.maintenance': 'Maintenance',
    'reports.financial': 'Financier',
    'reports.artCompliance': 'Conformité ART',
    
    // Planning
    'planning.title': 'Planification Réseau',
    'planning.projects': 'Projets',
    'planning.addProject': 'Nouveau Projet',
    'planning.budget': 'Budget',
    'planning.estimatedCost': 'Coût Estimé',
    'planning.coverage': 'Couverture',
    'planning.materials': 'Matériaux',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.network': 'Network',
    'nav.assets': 'Assets',
    'nav.clients': 'Clients',
    'nav.maintenance': 'Maintenance',
    'nav.reports': 'Reports',
    'nav.planning': 'Planning',
    
    // Common
    'common.search': 'Search...',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.status': 'Status',
    'common.location': 'Location',
    'common.date': 'Date',
    'common.actions': 'Actions',
    'common.loading': 'Loading...',
    'common.export': 'Export',
    'common.import': 'Import',
    
    // Dashboard
    'dashboard.title': 'Network Way Dashboard',
    'dashboard.welcome': 'Welcome to your fiber optic network management system',
    'dashboard.totalClients': 'Total Clients',
    'dashboard.activeConnections': 'Active Connections',
    'dashboard.networkUptime': 'Network Uptime',
    'dashboard.pendingTickets': 'Pending Tickets',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.networkOverview': 'Network Overview',
    'dashboard.performanceMetrics': 'Performance Metrics',
    
    // Network
    'network.title': 'Network Management',
    'network.map': 'Network Map',
    'network.elements': 'Network Elements',
    'network.addElement': 'Add Element',
    'network.cable': 'Cable',
    'network.junctionBox': 'Junction Box',
    'network.dslam': 'DSLAM',
    'network.clientPoint': 'Client Point',
    'network.pole': 'Pole',
    'network.conduit': 'Conduit',
    
    // Assets
    'assets.title': 'Asset Inventory',
    'assets.infrastructure': 'Infrastructure',
    'assets.equipment': 'Equipment',
    'assets.cables': 'Cables',
    'assets.totalValue': 'Total Value',
    'assets.addAsset': 'Add Asset',
    
    // Clients
    'clients.title': 'Client Management',
    'clients.addClient': 'Add Client',
    'clients.residential': 'Residential',
    'clients.business': 'Business',
    'clients.enterprise': 'Enterprise',
    'clients.active': 'Active',
    'clients.suspended': 'Suspended',
    'clients.pending': 'Pending',
    
    // Maintenance
    'maintenance.title': 'Maintenance',
    'maintenance.tickets': 'Tickets',
    'maintenance.addTicket': 'Create Ticket',
    'maintenance.priority.low': 'Low',
    'maintenance.priority.medium': 'Medium',
    'maintenance.priority.high': 'High',
    'maintenance.priority.critical': 'Critical',
    'maintenance.status.open': 'Open',
    'maintenance.status.inProgress': 'In Progress',
    'maintenance.status.resolved': 'Resolved',
    'maintenance.status.closed': 'Closed',
    
    // Reports
    'reports.title': 'Reports',
    'reports.generate': 'Generate Report',
    'reports.performance': 'Performance',
    'reports.regulatory': 'Regulatory',
    'reports.maintenance': 'Maintenance',
    'reports.financial': 'Financial',
    'reports.artCompliance': 'ART Compliance',
    
    // Planning
    'planning.title': 'Network Planning',
    'planning.projects': 'Projects',
    'planning.addProject': 'New Project',
    'planning.budget': 'Budget',
    'planning.estimatedCost': 'Estimated Cost',
    'planning.coverage': 'Coverage',
    'planning.materials': 'Materials',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};