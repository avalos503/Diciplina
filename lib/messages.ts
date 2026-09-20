export const DAILY_AFFIRMATION =
  "I always have more money than what I need. I cannot help but to attract a lot of money to my life.";

export const DAILY_AFFIRMATION_ES =
  "Siempre tengo más dinero del que necesito. No puedo evitar atraer abundancia a mi vida.";

export type DailyMessage = {
  id: string;
  theme: "confianza" | "disciplina" | "enfoque" | "gratitud" | "constancia" | "calma" | "accion" | "coraje";
  text: string;
};

export const DAILY_MESSAGES: DailyMessage[] = [
  {
    id: "confianza-1",
    theme: "confianza",
    text: "Ya tienes más capacidad de la que usas. Hoy basta con usarla un poco.",
  },
  {
    id: "confianza-2",
    theme: "confianza",
    text: "No necesitas sentirte listo. Necesitas dar el siguiente paso limpio.",
  },
  {
    id: "confianza-3",
    theme: "confianza",
    text: "Confías en el proceso cuando dejas de discutir contigo mismo.",
  },
  {
    id: "confianza-4",
    theme: "confianza",
    text: "Tu palabra interna importa. Habla como alguien que se sostiene.",
  },
  {
    id: "disciplina-1",
    theme: "disciplina",
    text: "La disciplina no grita. Se nota en lo que no negocias.",
  },
  {
    id: "disciplina-2",
    theme: "disciplina",
    text: "Hazlo corto si hace falta. No lo canceles.",
  },
  {
    id: "disciplina-3",
    theme: "disciplina",
    text: "Un cierre vale más que diez planes perfectos.",
  },
  {
    id: "disciplina-4",
    theme: "disciplina",
    text: "Hoy no pides permiso. Hoy entrenas lo que dijiste que importa.",
  },
  {
    id: "disciplina-5",
    theme: "disciplina",
    text: "La constancia aburrida es la que cambia el piso.",
  },
  {
    id: "enfoque-1",
    theme: "enfoque",
    text: "Una cosa a la vez. Lo demás puede esperar su turno.",
  },
  {
    id: "enfoque-2",
    theme: "enfoque",
    text: "Quita ruido. Deja una acción visible.",
  },
  {
    id: "enfoque-3",
    theme: "enfoque",
    text: "Elige el siguiente minuto, no toda la vida.",
  },
  {
    id: "enfoque-4",
    theme: "enfoque",
    text: "Si está escrito, se puede marcar. Márcalo y sigue.",
  },
  {
    id: "gratitud-1",
    theme: "gratitud",
    text: "Hay más de una cosa que ya funciona. Nómbrala antes de pedir más.",
  },
  {
    id: "gratitud-2",
    theme: "gratitud",
    text: "Agradece el cuerpo que hoy puede moverse. Eso también es fortuna.",
  },
  {
    id: "gratitud-3",
    theme: "gratitud",
    text: "La gratitud no niega el trabajo. Le da suelo firme.",
  },
  {
    id: "gratitud-4",
    theme: "gratitud",
    text: "Empieza por lo que no te falta. Desde ahí se construye mejor.",
  },
  {
    id: "constancia-1",
    theme: "constancia",
    text: "Los días normales son los que cuentan. Este es uno.",
  },
  {
    id: "constancia-2",
    theme: "constancia",
    text: "Volver hoy es más fuerte que empezar perfecto ayer.",
  },
  {
    id: "constancia-3",
    theme: "constancia",
    text: "La racha no te define. El siguiente acto sí.",
  },
  {
    id: "constancia-4",
    theme: "constancia",
    text: "Repite lo simple. El nivel sube después.",
  },
  {
    id: "calma-1",
    theme: "calma",
    text: "La calma también es disciplina. Respira y elige.",
  },
  {
    id: "calma-2",
    theme: "calma",
    text: "No hay prisa en el pánico. Hay prisa en la claridad.",
  },
  {
    id: "calma-3",
    theme: "calma",
    text: "Baja los hombros. El siguiente combo nace de ahí.",
  },
  {
    id: "calma-4",
    theme: "calma",
    text: "Aquí no hay castigo. Hay práctica.",
  },
  {
    id: "accion-1",
    theme: "accion",
    text: "Menos intención. Más un acto que se pueda tachar.",
  },
  {
    id: "accion-2",
    theme: "accion",
    text: "Empieza donde estás. El escenario perfecto no llega.",
  },
  {
    id: "accion-3",
    theme: "accion",
    text: "Si lo puedes hacer en cinco minutos, no lo pospongas a mañana.",
  },
  {
    id: "accion-4",
    theme: "accion",
    text: "El cuerpo entiende mejor que la mente. Muévelo.",
  },
  {
    id: "coraje-1",
    theme: "coraje",
    text: "El coraje no es no tener miedo. Es no dejar que el miedo decida.",
  },
  {
    id: "coraje-2",
    theme: "coraje",
    text: "Sé firme. Sé breve. Sigue.",
  },
  {
    id: "coraje-3",
    theme: "coraje",
    text: "Hoy no abandonas el set. Eso basta.",
  },
  {
    id: "coraje-4",
    theme: "coraje",
    text: "Tu futuro yo no pide drama. Pide que no te eches atrás.",
  },
];

const THEME_LABEL: Record<DailyMessage["theme"], string> = {
  confianza: "Confianza",
  disciplina: "Disciplina",
  enfoque: "Enfoque",
  gratitud: "Gratitud",
  constancia: "Constancia",
  calma: "Calma",
  accion: "Acción",
  coraje: "Coraje",
};

export function themeLabel(theme: DailyMessage["theme"]): string {
  return THEME_LABEL[theme];
}

export function messageForDate(dateKey: string): DailyMessage {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) {
    hash = (hash * 33 + dateKey.charCodeAt(i) + 17) >>> 0;
  }
  return DAILY_MESSAGES[hash % DAILY_MESSAGES.length];
}
