import { Chemical } from '../types';

interface ChemicalDE {
  category: string;
  shortDescription: string;
  longDescription: string;
  foundIn: string[];
  healthEffects: string;
}

const chemicalsDE: Record<string, ChemicalDE> = {
  cotton: {
    category: 'Absorptionsmittel',
    shortDescription: 'Natürliche Weichfaser für Komfort und Absorption',
    longDescription:
      'Der Hauptbestandteil der meisten herkömmlichen Binden und Tampons, der für die weiche Textur und den saugfähigen Kern sorgt.',
    foundIn: ['Tampons', 'Binden', 'Umhüllungen'],
    healthEffects:
      'In der Regel sicher; selten Reizungen bei Verunreinigungen oder chemischer Behandlung.',
  },
  'paraffin-emulsion': {
    category: 'Beschichtungen',
    shortDescription:
      'Wachsartige Beschichtung zur Verbesserung von Textur oder Feuchtigkeitsbeständigkeit',
    longDescription:
      'Wird auf die Außenfläche von Produkten aufgetragen, um ein glatteres Gefühl zu erzeugen und den Feuchtigkeitsfluss zu regulieren.',
    foundIn: ['Tamponhüllen', 'Slipeinlagen'],
    healthEffects:
      'Kann Wärme und Feuchtigkeit einschließen und zu Hautbeschwerden beitragen.',
  },
  polyethylene: {
    category: 'Kunststoffe',
    shortDescription: 'Kunststoffschicht, die Lecks verhindert',
    longDescription:
      'Ein vielseitiger Kunststoff, der in den Rückenlagen von Binden und in einigen Tamponapplikatoren als Feuchtigkeitsbarriere verwendet wird.',
    foundIn: ['Rückenlagen', 'Applikatoren', 'Verpackungen'],
    healthEffects:
      'Kann den Luftstrom reduzieren und Schwitzen oder Reizungen begünstigen.',
  },
  phthalates: {
    category: 'Zusatzstoffe',
    shortDescription:
      'Weichmacher, die Kunststoffe geschmeidig und flexibel machen',
    longDescription:
      "Häufig in 'Duftstoff'-Mischungen oder Kunststoffkomponenten versteckt, um diese geschmeidig und parfümiert zu machen.",
    foundIn: ['Duftstoffe', 'Kunststoffkomponenten'],
    healthEffects:
      'Mögliche Hormonstörungen, Fortpflanzungsbedenken, Hautreizungen.',
  },
  parabens: {
    category: 'Konservierungsstoffe',
    shortDescription:
      'Konservierungsmittel, die das Wachstum von Bakterien und Schimmel verhindern',
    longDescription:
      'Häufig verwendete synthetische Konservierungsstoffe in Körperpflegeprodukten zur Gewährleistung der Lagerstabilität.',
    foundIn: ['Feuchtigkeitscremes', 'Gleitmittel', 'Feuchttücher'],
    healthEffects:
      'Mögliche hormonelle Auswirkungen und allergische Reaktionen.',
  },
  phenols: {
    category: 'Zusatzstoffe',
    shortDescription:
      'Chemische Verbindungen für Konservierung oder Verarbeitung',
    longDescription:
      'Eine breite Gruppe von Chemikalien, die in verschiedenen Herstellungsphasen verwendet werden und manchmal als Spuren im Endprodukt verbleiben.',
    foundIn: ['Herstellungsrückstände', 'Klebstoffe'],
    healthEffects:
      'Hautreizungen, mögliche Toxizität bei hoher Exposition.',
  },
  fragrance: {
    category: 'Zusatzstoffe',
    shortDescription: 'Zugesetzter Duftstoff zur Geruchsverbesserung',
    longDescription:
      "Eine 'proprietäre' Mischung, die Tausende nicht deklarierter Chemikalien enthalten kann, die zur Geruchsmaskierung oder -ergänzung verwendet werden.",
    foundIn: ['Parfümierte Binden', 'Parfümierte Tampons'],
    healthEffects:
      'Allergien, Juckreiz, Reizungen, Kopfschmerzen bei empfindlichen Personen.',
  },
  dioxins: {
    category: 'Zusatzstoffe',
    shortDescription:
      'Industrielle Spurenschadstoffe aus bestimmten Herstellungsprozessen',
    longDescription:
      'Unbeabsichtigte Nebenprodukte der Chlorbleiche, die zur Aufhellung von Holzzellstoff und Baumwolle eingesetzt wird.',
    foundIn: ['Gebleichte Binden', 'Gebleichte Tampons'],
    healthEffects:
      'Langzeitexposition in Verbindung mit Hormonstörungen und möglichem Krebsrisiko.',
  },
  'titanium-dioxide': {
    category: 'Beschichtungen',
    shortDescription: 'Weißes Farbmittel zur Aufhellung von Materialien',
    longDescription:
      'Eine anorganische Verbindung, die dafür sorgt, dass Produkte steril und reinweiß wirken.',
    foundIn: ['Bindenhüllen', 'Tamponspitzen'],
    healthEffects:
      'Geringes Hautrisiko; Inhalationsbedenken gelten hauptsächlich für Pulverformen.',
  },
  'zinc-oxide': {
    category: 'Zusatzstoffe',
    shortDescription: 'Mineral, das die Haut beruhigt und schützt',
    longDescription:
      'Wird aufgrund seiner hautberuhigenden Eigenschaften eingesetzt, häufig in Slipeinlagen für empfindliche Haut.',
    foundIn: ['Einlagen für empfindliche Haut', 'Salben'],
    healthEffects: 'In der Regel hautpflegend und beruhigend.',
  },
  latex: {
    category: 'Kunststoffe',
    shortDescription: 'Naturkautschuk für Flexibilität und Abdichtung',
    longDescription:
      'Ein natürlicher Werkstoff mit hervorragender Elastizität, der jedoch ein häufiges Allergen ist.',
    foundIn: ['Elastikmanschetten', 'Klebstoffe'],
    healthEffects:
      'Allergische Reaktionen von Juckreiz bis hin zu schwerer Latexallergie.',
  },
  silicone: {
    category: 'Kunststoffe',
    shortDescription:
      'Weiches, flexibles Material für Komfort und Auslaufschutz',
    longDescription:
      'Der Goldstandard für Menstruationstassen aufgrund seiner Haltbarkeit und Biokompatibilität.',
    foundIn: ['Menstruationstassen', 'Auskleidungen'],
    healthEffects: 'Selten Reizungen oder eingeschlossene Feuchtigkeit.',
  },
};

export function translateChemical(chemical: Chemical, lang: string): Chemical {
  if (lang !== 'de') return chemical;
  const deFields = chemicalsDE[chemical.id];
  if (!deFields) return chemical;
  return { ...chemical, ...deFields };
}
