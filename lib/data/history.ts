export interface HistoryEpoch {
  id:       string
  epochDe:  string
  epochFr:  string
  titleDe:  string
  titleFr:  string
  textDe:   string
  textFr:   string
  quoteDe:  string
  quoteFr:  string
  image:    string
  imageAlt: string
}

export const historyEpochs: HistoryEpoch[] = [
  {
    id:       'confluence',
    epochDe:  'Vor der Stadt',
    epochFr:  'Avant la ville',
    titleDe:  'Die Confluenz',
    titleFr:  'La Confluence',
    textDe:   'Wo Rhône und Saône sich vereinigen, entstand Lugdunum. Der Zusammenfluss war kein Zufall – er war Bedingung. Das Wasser formte die Geographie, die Geographie formte die Stadt, die Stadt formte die Identität. Zwei Flüsse, zwei Charaktere: die ruhige, grüne Saône und die mächtige, blaue Rhône. Wo sie sich berühren, beginnt Lyon.',
    textFr:   "Là où le Rhône et la Saône se rejoignent, Lugdunum est née. La confluence n'était pas un hasard — c'était une condition. L'eau a façonné la géographie, la géographie a façonné la ville, la ville a façonné l'identité. Deux fleuves, deux caractères : la Saône calme et verte, le Rhône puissant et bleu. Là où ils se touchent, Lyon commence.",
    quoteDe:  'Zwei Flüsse, eine Seele.',
    quoteFr:  'Deux fleuves, une âme.',
    image:    '/images/dmz-lyon-1238709_1920.jpg',
    imageAlt: 'Confluenz von Rhône und Saône',
  },
  {
    id:       'roman',
    epochDe:  '43 v. Chr.',
    epochFr:  '43 av. J.-C.',
    titleDe:  'Die Römerstadt',
    titleFr:  'La ville romaine',
    textDe:   'Lugdunum wurde zur Hauptstadt Galliens. Auf dem Fourvière-Hügel entstanden Theater, Tempel und Aquädukte. Die Stadt wuchs in die Höhe und in die Fläche – geordnet, mächtig, dauerhaft. Das Amphitheater der Drei Gallier fasste zehntausend Menschen. Kaiser wurden hier geboren. Das Erbe ist noch immer sichtbar.',
    textFr:   "Lugdunum devint la capitale des Gaules. Sur la colline de Fourvière s'élevèrent théâtres, temples et aqueducs. La ville grandit en hauteur et en étendue — ordonnée, puissante, durable. L'amphithéâtre des Trois Gaules accueillait dix mille personnes. Des empereurs y naquirent. L'héritage est encore visible.",
    quoteDe:  'Auf dem Hügel begann die Geschichte.',
    quoteFr:  "Sur la colline commença l'histoire.",
    image:    '/images/twalmedia-basilica-2382830_1920.jpg',
    imageAlt: 'Fourvière-Hügel mit Basilika',
  },
  {
    id:       'renaissance',
    epochDe:  '15.–16. Jahrhundert',
    epochFr:  'XVe – XVIe siècle',
    titleDe:  'Renaissance und Druckkunst',
    titleFr:  'Renaissance et imprimerie',
    textDe:   'Lyon wurde zum europäischen Zentrum des Buchdrucks und des Handels. Rabelais schrieb hier. Bankiers aus ganz Europa trafen sich auf den Jahrmärkten. Die Stadt öffnete sich der Welt. Im Vieux-Lyon entstanden die Renaissance-Stadtpalais mit ihren geheimnisvollen Traboules – verborgene Passagen, die die Innenhöfe verbinden.',
    textFr:   "Lyon devint le centre européen de l'imprimerie et du commerce. Rabelais y écrivit. Des banquiers de toute l'Europe se retrouvaient aux foires. La ville s'ouvrit au monde. Dans le Vieux-Lyon naquirent les hôtels particuliers Renaissance avec leurs mystérieux traboules — passages secrets reliant les cours intérieures.",
    quoteDe:  'Lyon war die Welt in Miniatur.',
    quoteFr:  'Lyon était le monde en miniature.',
    image:    '/images/alasdair1907-lyon-7875644.jpg',
    imageAlt: 'Vieux-Lyon, Renaissance-Architektur',
  },
  {
    id:       'canuts',
    epochDe:  '18.–19. Jahrhundert',
    epochFr:  'XVIIIe – XIXe siècle',
    titleDe:  'Die Canuts',
    titleFr:  'Les Canuts',
    textDe:   'Die Seidenweber der Croix-Rousse prägten eine eigene Kultur. In engen Werkstätten zwischen Licht und Lärm entstanden die feinsten Seidenstoffe Europas. Ihre Aufstände 1831 und 1834 waren die ersten Arbeiterkämpfe der Neuzeit. Die Croix-Rousse lebt noch heute von diesem Erbe – kreativ, eigensinnig, wach.',
    textFr:   "Les tisserands de soie de la Croix-Rousse ont forgé une culture propre. Dans d'étroits ateliers entre lumière et bruit naissaient les plus belles soieries d'Europe. Leurs révoltes de 1831 et 1834 furent les premières luttes ouvrières des temps modernes. La Croix-Rousse vit encore aujourd'hui de cet héritage — créative, singulière, éveillée.",
    quoteDe:  'Vivre en travaillant ou mourir en combattant.',
    quoteFr:  'Vivre en travaillant ou mourir en combattant.',
    image:    '/images/roses_street-town-6820819_1920.jpg',
    imageAlt: 'Strassen der Croix-Rousse',
  },
  {
    id:       'modern',
    epochDe:  'Heute',
    epochFr:  "Aujourd'hui",
    titleDe:  'Das moderne Lyon',
    titleFr:  'Lyon contemporaine',
    textDe:   'Die Métropole de Lyon ist heute eine der dynamischsten Städte Europas. Architektur, Gastronomie, Biotechnologie und Kultur wachsen zusammen. Die Fête des Lumières erleuchtet jedes Jahr im Dezember die Stadt. Das Quartier Confluence ist eine neue Stadt in der Stadt: nachhaltiges Bauen, zeitgenössische Architektur, Leben am Wasser.',
    textFr:   "La Métropole de Lyon est aujourd'hui l'une des villes les plus dynamiques d'Europe. Architecture, gastronomie, biotechnologie et culture convergent. La Fête des Lumières illumine la ville chaque décembre. Le quartier Confluence est une nouvelle ville dans la ville : construction durable, architecture contemporaine, vie au bord de l'eau.",
    quoteDe:  'Lyon erfindet sich immer neu.',
    quoteFr:  'Lyon se réinvente sans cesse.',
    image:    '/images/tanao68-lyon-7117498_1920.jpg',
    imageAlt: 'Modernes Lyon, Quartier Confluence',
  },
]
