import { mondayWeekday } from "./dates";
import type { MealSlot } from "./types";

export type NutritionDayKind = "gym" | "cardio" | "rest";

export type Macros = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealOption = {
  id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  macros: Macros;
  sugarFree: true;
  flourFree: true;
};

export type MealPlan = {
  kind: NutritionDayKind;
  title: string;
  note: string;
  baselineKcal: number;
  slots: Record<MealSlot, MealOption[]>;
};

export const MEAL_SLOTS: MealSlot[] = ["desayuno", "comida", "cena", "snack"];

export const SLOT_LABEL: Record<MealSlot, string> = {
  desayuno: "Desayuno",
  comida: "Comida",
  cena: "Cena",
  snack: "Snacks",
};

export const KIND_LABEL: Record<NutritionDayKind, string> = {
  gym: "Gimnasio · pecho / core",
  cardio: "Saco / cardio",
  rest: "Descanso activo",
};

export const DEFAULT_CALORIE_TARGET = 1900;
export const DEFAULT_CALORIE_RANGE = "1800–2000";
export const DEFAULT_GOAL_LB = 20;
export const DEFAULT_HORIZON_WEEKS = 12;

/** Monday=1 … Sunday=7 — aligned with Core, oblicuos y pecho */
export const WEEKDAY_NUTRITION: Record<number, NutritionDayKind> = {
  1: "gym",
  2: "cardio",
  3: "rest",
  4: "gym",
  5: "rest",
  6: "cardio",
  7: "rest",
};

function macros(kcal: number, protein: number, carbs: number, fat: number): Macros {
  return { kcal, protein, carbs, fat };
}

function recipe(
  id: string,
  name: string,
  ingredients: string[],
  steps: string[],
  m: Macros,
): MealOption {
  return { id, name, ingredients, steps, macros: m, sugarFree: true, flourFree: true };
}

export const MEAL_PLANS: Record<NutritionDayKind, MealPlan> = {
  gym: {
    kind: "gym",
    title: "Día de pecho / core",
    note: "Más proteína y carbohidratos (arroz o papa) para recuperar del suelo y el saco.",
    baselineKcal: 2000,
    slots: {
      desayuno: [
        recipe(
          "gym-des-arroz-huevo",
          "Huevos revueltos con arroz y aguacate",
          [
            "3 huevos",
            "Arroz blanco o integral 70 g (en seco)",
            "Aguacate 1/2",
            "Sal, pimienta, aceite de oliva 1 cucharadita",
          ],
          [
            "Cocina el arroz en agua con un poco de sal.",
            "Bate los huevos y revuélvelos a fuego medio con el aceite.",
            "Sirve el arroz, los huevos y el aguacate en rodajas.",
            "Pimienta al final. Café o té sin azúcar.",
          ],
          macros(560, 30, 58, 22),
        ),
        recipe(
          "gym-des-omelette-papa",
          "Omelette de espinaca con papa asada",
          [
            "3 huevos",
            "Espinaca 80 g",
            "Papa 200 g",
            "Queso fresco o rallado 30 g",
            "Aceite de oliva 1 cucharadita",
          ],
          [
            "Hornea o sartén la papa en cubos hasta que dore (15–20 min).",
            "Saltea la espinaca 1 minuto.",
            "Vierte los huevos batidos, añade queso y dobla el omelette.",
            "Come junto con la papa. Sin salsas dulces.",
          ],
          macros(540, 34, 42, 24),
        ),
        recipe(
          "gym-des-avena-huevos",
          "Avena natural con canela y huevos duros",
          [
            "Avena en hojuelas 70 g (no granola)",
            "Leche o agua 200 ml",
            "Canela",
            "Plátano 1/2",
            "2 huevos duros",
          ],
          [
            "Hierve la avena en agua o leche natural sin azúcar, 5 minutos.",
            "Añade canela y el medio plátano en rodajas.",
            "Come los huevos al lado.",
            "Nada de miel, agave ni endulzante de mesa.",
          ],
          macros(530, 28, 62, 16),
        ),
      ],
      comida: [
        recipe(
          "gym-com-arroz-pollo",
          "Arroz con pollo",
          [
            "Pechuga de pollo 180 g",
            "Arroz 90 g (en seco)",
            "Pimiento, cebolla y ajo",
            "Caldo de pollo natural (sin azúcar)",
            "Aceite de oliva 1 cucharada",
            "Cilantro, sal, comino",
          ],
          [
            "Dora el pollo en trozos con aceite, sal y comino.",
            "Sofríe cebolla, ajo y pimiento.",
            "Añade el arroz, el caldo y el pollo. Tapa 15–18 min.",
            "Cilantro al servir. Sin salsas BBQ ni ketchup dulce.",
          ],
          macros(680, 50, 72, 16),
        ),
        recipe(
          "gym-com-bistec-papa",
          "Bistec con papa y vegetales",
          [
            "Bistec de res magra 180 g",
            "Papa 300 g",
            "Brócoli 150 g",
            "Aceite de oliva 1 cucharada",
            "Ajo, sal, pimienta, limón",
          ],
          [
            "Hierve o asa la papa hasta que esté blanda.",
            "Sella el bistec 3–4 min por lado con ajo y pimienta.",
            "Vaporiza el brócoli 5 minutos.",
            "Limón al plato. Sin aderezos comerciales dulces.",
          ],
          macros(670, 48, 58, 22),
        ),
        recipe(
          "gym-com-carne-frijoles",
          "Carne molida con arroz y frijoles",
          [
            "Carne molida magra 160 g",
            "Arroz 70 g (en seco)",
            "Frijoles negros cocidos 120 g",
            "Tomate, cebolla, comino",
            "Aceite 1 cucharadita",
          ],
          [
            "Cocina el arroz aparte.",
            "Sofríe cebolla y tomate; añade la carne y el comino.",
            "Calienta los frijoles y mézclalos o sírvelos al lado.",
            "Plato único, sin tortillas de harina.",
          ],
          macros(660, 46, 64, 18),
        ),
      ],
      cena: [
        recipe(
          "gym-cen-salmon-arroz",
          "Salmón al horno con arroz y brócoli",
          [
            "Salmón 160 g",
            "Arroz 60 g (en seco)",
            "Brócoli 150 g",
            "Limón, ajo, aceite de oliva 1 cucharadita",
          ],
          [
            "Hornea el salmón 12–14 min a 200 °C con ajo y limón.",
            "Cocina el arroz.",
            "Vaporiza el brócoli.",
            "Sirve todo junto. Sin glaseados dulces.",
          ],
          macros(560, 42, 48, 20),
        ),
        recipe(
          "gym-cen-pollo-batata",
          "Pollo al horno con batata y calabacín",
          [
            "Muslo o pechuga 170 g",
            "Batata 200 g",
            "Calabacín 150 g",
            "Pimentón, sal, aceite 1 cucharadita",
          ],
          [
            "Corta batata y calabacín. Sazona.",
            "Hornea 20 min; añade el pollo y 15 min más.",
            "Comprueba que el pollo esté bien cocido.",
            "Sin miel ni salsa teriyaki.",
          ],
          macros(540, 44, 46, 16),
        ),
        recipe(
          "gym-cen-atun-papa",
          "Atún a la plancha con papa y ensalada",
          [
            "Lomo de atún o lata al natural 160 g",
            "Papa 200 g",
            "Lechuga, tomate, pepino",
            "Aceite de oliva 1 cucharadita, limón",
          ],
          [
            "Hierve la papa.",
            "Sella el atún 2 min por lado o escurre la lata al natural.",
            "Ensalada con aceite y limón (sin aderezo comercial).",
            "Monta el plato y come caliente o tibio.",
          ],
          macros(520, 40, 44, 16),
        ),
      ],
      snack: [
        recipe(
          "gym-sna-yogur-nueces",
          "Yogur natural con nueces",
          ["Yogur natural sin azúcar 200 g", "Nueces o almendras 15 g", "Canela al gusto"],
          [
            "Usa solo yogur natural o griego sin azúcar añadida.",
            "Añade los frutos secos y canela.",
            "Nada de granola, miel ni mermelada.",
          ],
          macros(220, 16, 12, 12),
        ),
        recipe(
          "gym-sna-requeson-fresa",
          "Requesón con fresas",
          ["Requesón o cottage 150 g", "Fresas 80 g"],
          [
            "Sirve el requesón en un bowl.",
            "Corta las fresas encima.",
            "Sin siropes. Fruta al natural.",
          ],
          macros(200, 22, 12, 6),
        ),
        recipe(
          "gym-sna-huevo-manzana",
          "Huevos duros y manzana",
          ["2 huevos duros", "Manzana 1 pequeña"],
          ["Hierve los huevos 10 minutos y pélalos.", "Come la manzana entera al lado."],
          macros(230, 14, 20, 10),
        ),
      ],
    },
  },
  cardio: {
    kind: "cardio",
    title: "Día de saco / más cardio",
    note: "Platos más ligeros y proteína al frente. Arroz o papa en ración corta.",
    baselineKcal: 1800,
    slots: {
      desayuno: [
        recipe(
          "car-des-omelette",
          "Omelette de champiñón y tomate",
          [
            "2 huevos + 2 claras",
            "Champiñones 80 g",
            "Tomate 1",
            "Espinaca 40 g",
            "Aceite 1 cucharadita",
          ],
          [
            "Saltea champiñón y tomate 3 minutos.",
            "Añade espinaca y los huevos batidos.",
            "Cuaja el omelette y dobla.",
            "Café o té sin azúcar.",
          ],
          macros(280, 26, 10, 16),
        ),
        recipe(
          "car-des-yogur-huevo",
          "Yogur natural y huevo a la sartén",
          ["Yogur natural sin azúcar 180 g", "2 huevos", "Pepino en rodajas", "Sal y pimienta"],
          [
            "Fríe o cuece los huevos sin pan.",
            "Sirve el yogur en un vaso aparte.",
            "Pepino al lado. Sin tostada.",
          ],
          macros(340, 28, 14, 18),
        ),
        recipe(
          "car-des-revuelto-aguacate",
          "Revuelto de huevo y aguacate",
          ["3 claras + 1 huevo", "Aguacate 1/4", "Tomate", "Cilantro, limón"],
          [
            "Revuelve claras y huevo a fuego bajo.",
            "Aguacate y tomate crudos al plato.",
            "Limón y cilantro. Sin tortillas de harina.",
          ],
          macros(300, 24, 8, 18),
        ),
      ],
      comida: [
        recipe(
          "car-com-pollo-ensalada",
          "Pollo a la plancha con ensalada y arroz corto",
          [
            "Pechuga 160 g",
            "Arroz 50 g (en seco)",
            "Lechuga, tomate, pepino, cebolla",
            "Aceite 1 cucharadita, limón",
          ],
          [
            "Cocina el arroz en ración corta.",
            "Sella la pechuga 5–6 min por lado.",
            "Ensalada grande con aceite y limón.",
            "Sin aderezos cream o BBQ.",
          ],
          macros(520, 46, 42, 14),
        ),
        recipe(
          "car-com-steak-ensalada",
          "Steak con vegetales salteados",
          [
            "Bistec 150 g",
            "Calabacín, pimiento y champiñón 250 g en total",
            "Aceite 1 cucharadita",
            "Ajo, sal, pimienta",
          ],
          [
            "Sella el steak al punto que prefieras.",
            "Saltea los vegetales a fuego alto 4–5 min.",
            "Descansa la carne 3 minutos y corta.",
            "Plato ligero, sin papa si quieres aún menos carb.",
          ],
          macros(480, 42, 14, 26),
        ),
        recipe(
          "car-com-pescado-verdura",
          "Filete de pescado con judías y limón",
          [
            "Filete blanco (tilapia, merluza o similar) 180 g",
            "Judías verdes 200 g",
            "Aceite 1 cucharadita, ajo, limón",
          ],
          [
            "Hornea o sartén el pescado 8–10 min.",
            "Cocina las judías al vapor o salteadas con ajo.",
            "Limón abundante. Sin empanizado (eso es harina).",
          ],
          macros(400, 40, 16, 16),
        ),
      ],
      cena: [
        recipe(
          "car-cen-salmon-verdura",
          "Salmón con vegetales al vapor",
          ["Salmón 140 g", "Brócoli y coliflor 200 g", "Limón, eneldo o perejil", "Aceite 1 cucharadita"],
          [
            "Hornea el salmón 12 min.",
            "Vaporiza brócoli y coliflor.",
            "Aceite y limón al final, no salsas dulces.",
          ],
          macros(420, 36, 12, 24),
        ),
        recipe(
          "car-cen-pavo-calabacin",
          "Pavo salteado con calabacín",
          ["Pechuga de pavo 160 g", "Calabacín 200 g", "Cebolla, ajo", "Aceite 1 cucharadita"],
          [
            "Corta el pavo en tiras y sella.",
            "Añade calabacín y cebolla 5 minutos.",
            "Sazona. Sin soya azucarada.",
          ],
          macros(360, 40, 12, 14),
        ),
        recipe(
          "car-cen-sopa-huevo",
          "Caldo de verduras con huevo",
          [
            "Caldo de pollo o verdura natural 400 ml",
            "Zanahoria, apio, calabacín",
            "2 huevos",
            "Cilantro, limón",
          ],
          [
            "Hierve las verduras en el caldo 10 min.",
            "Rompe los huevos en el caldo o sírvelos duros.",
            "Cilantro y limón. Sin fideos ni pan.",
          ],
          macros(320, 22, 16, 16),
        ),
      ],
      snack: [
        recipe(
          "car-sna-atun-pepino",
          "Atún al natural con pepino",
          ["Atún al natural 80 g", "Pepino 1", "Limón, pimienta"],
          ["Escurre el atún (agua, no aceite azucarado).", "Corta el pepino y mezcla con limón."],
          macros(140, 18, 6, 4),
        ),
        recipe(
          "car-sna-queso-tomate",
          "Queso fresco con tomate",
          ["Queso fresco 80 g", "Tomate 1", "Orégano, aceite 1/2 cucharadita"],
          ["Rodaja de tomate y queso.", "Orégano. Sin galletas ni pan."],
          macros(180, 14, 6, 12),
        ),
        recipe(
          "car-sna-huevo-zanahoria",
          "Huevo duro y zanahoria",
          ["1 huevo duro", "Zanahoria 1 grande"],
          ["Hierve el huevo.", "Zanahoria cruda en palitos. Sin hummus comercial dulce."],
          macros(150, 8, 12, 6),
        ),
      ],
    },
  },
  rest: {
    kind: "rest",
    title: "Día de descanso",
    note: "Raciones moderadas dentro del déficit. Comida de verdad, sin premio ni castigo.",
    baselineKcal: 1900,
    slots: {
      desayuno: [
        recipe(
          "rest-des-huevos-frijoles",
          "Huevos con frijoles y aguacate",
          [
            "2 huevos",
            "Frijoles de la olla 120 g",
            "Aguacate 1/4",
            "Salsa mexicana natural (jitomate, chile, cilantro — sin azúcar)",
          ],
          [
            "Calienta los frijoles.",
            "Fríe o cuece los huevos.",
            "Aguacate y salsa casera. Si usas tortilla, que sea de maíz, no de harina (máx. 1).",
          ],
          macros(430, 24, 32, 22),
        ),
        recipe(
          "rest-des-avena-cinnamon",
          "Avena con canela y arándanos",
          ["Avena 50 g", "Agua o leche natural 180 ml", "Arándanos o fresas 60 g", "Canela"],
          [
            "Cocina la avena 5 minutos.",
            "Fruta arriba y canela.",
            "Sin miel, maple ni azúcar.",
          ],
          macros(320, 12, 52, 6),
        ),
        recipe(
          "rest-des-yogurt-bowl",
          "Bowl de yogur, pepita y fruta",
          ["Yogur natural 200 g", "Pepitas de calabaza 10 g", "Kiwi o fresas 80 g"],
          [
            "Yogur solo, sin versiones ‘con sabor’.",
            "Pepitas y fruta.",
            "No uses granola (lleva azúcar y a menudo harina).",
          ],
          macros(340, 20, 28, 14),
        ),
      ],
      comida: [
        recipe(
          "rest-com-lentejas",
          "Lentejas guisadas con verdura",
          [
            "Lentejas 90 g (en seco)",
            "Zanahoria, apio, cebolla, ajo",
            "Tomate triturado natural",
            "Aceite 1 cucharadita, laurel, sal",
          ],
          [
            "Sofríe la verdura 5 min.",
            "Añade lentejas, tomate y agua. 25–30 min.",
            "Sin chorizo dulce ni azúcar en el sofrito.",
            "Opcional: un huevo duro encima.",
          ],
          macros(520, 30, 74, 10),
        ),
        recipe(
          "rest-com-pollo-arroz",
          "Pollo deshebrado con arroz y ensalada",
          [
            "Pollo cocido 150 g",
            "Arroz 70 g (en seco)",
            "Lechuga y tomate",
            "Limón, aceite 1 cucharadita",
          ],
          [
            "Cocina el arroz.",
            "Deshebra el pollo y caliéntalo con limón y sal.",
            "Ensalada al lado.",
          ],
          macros(540, 40, 58, 12),
        ),
        recipe(
          "rest-com-maiz-pescado",
          "Pescado a la plancha con elote y ensalada",
          [
            "Pescado blanco 160 g",
            "Elote (maíz en grano o mazorca) 1",
            "Ensalada verde",
            "Limón, chile en polvo sin azúcar, aceite 1 cucharadita",
          ],
          [
            "Sella el pescado.",
            "Hierve o asa el elote (maíz entero, no harina).",
            "Ensalada con limón.",
          ],
          macros(500, 38, 44, 14),
        ),
      ],
      cena: [
        recipe(
          "rest-cen-revuelto-verdura",
          "Revuelto de calabacín y huevo",
          ["2 huevos", "Calabacín 200 g", "Cebolla", "Aceite 1 cucharadita"],
          [
            "Saltea cebolla y calabacín 6 min.",
            "Añade los huevos y revuelve.",
            "Sin tortillas de harina.",
          ],
          macros(320, 18, 14, 20),
        ),
        recipe(
          "rest-cen-bistec-ensalada",
          "Bistec fino con ensalada",
          ["Bistec 140 g", "Ensalada mixta grande", "Aceite 1 cucharadita, vinagre de manzana, sal"],
          [
            "Sella el bistec 2–3 min por lado.",
            "Ensalada con aceite y vinagre (lee la etiqueta: 0 azúcar).",
            "Sin pan para ‘acompañar’.",
          ],
          macros(420, 36, 8, 26),
        ),
        recipe(
          "rest-cen-sopa-pollo",
          "Sopa de pollo y verduras (sin fideos)",
          ["Caldo 400 ml", "Pollo 100 g", "Zanahoria, chayote o calabacín, apio", "Cilantro, limón"],
          [
            "Hierve verdura y pollo en el caldo 15 min.",
            "Nada de pasta, fideos ni arroz inflado.",
            "Cilantro y limón al servir.",
          ],
          macros(300, 28, 16, 10),
        ),
      ],
      snack: [
        recipe(
          "rest-sna-manzana-almendra",
          "Manzana y almendras",
          ["Manzana 1", "Almendras 12 g"],
          ["Lava la manzana.", "Cuenta las almendras (un puñado pequeño)."],
          macros(190, 4, 24, 10),
        ),
        recipe(
          "rest-sna-yogur",
          "Yogur natural solo",
          ["Yogur natural o griego sin azúcar 170 g", "Canela opcional"],
          ["Abre el vaso y come.", "Si dice ‘azúcar añadida’ en la etiqueta, no vale."],
          macros(130, 12, 10, 4),
        ),
        recipe(
          "rest-sna-pepino-guacamole",
          "Pepino con guacamole casero",
          ["Pepino 1", "Aguacate 1/3", "Limón, sal, cilantro"],
          [
            "Machaca el aguacate con limón y sal.",
            "Usa el pepino como cuchara.",
            "Guacamole sin mix dulce ni totopos de harina.",
          ],
          macros(180, 4, 12, 14),
        ),
      ],
    },
  },
};

export function kindForDate(dateKey: string): NutritionDayKind {
  return WEEKDAY_NUTRITION[mondayWeekday(dateKey)] ?? "rest";
}

export function planForDate(dateKey: string): MealPlan {
  return MEAL_PLANS[kindForDate(dateKey)];
}

export function kindDayTarget(kind: NutritionDayKind, userTarget: number): number {
  if (kind === "gym") return userTarget + 100;
  if (kind === "cardio") return userTarget - 100;
  return userTarget;
}

export function scaleMacros(macrosValue: Macros, factor: number): Macros {
  return {
    kcal: Math.round(macrosValue.kcal * factor),
    protein: Math.round(macrosValue.protein * factor),
    carbs: Math.round(macrosValue.carbs * factor),
    fat: Math.round(macrosValue.fat * factor),
  };
}

export function planScale(plan: MealPlan, userTarget: number): number {
  return kindDayTarget(plan.kind, userTarget) / plan.baselineKcal;
}

export function sumMacros(items: Macros[]): Macros {
  return items.reduce(
    (acc, item) => ({
      kcal: acc.kcal + item.kcal,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    macros(0, 0, 0, 0),
  );
}

export function findOption(plan: MealPlan, slot: MealSlot, id?: string): MealOption {
  const list = plan.slots[slot];
  return list.find((item) => item.id === id) ?? list[0];
}

export function lbToKg(lb: number): number {
  return Math.round(lb * 0.453592 * 10) / 10;
}

export function formatLbKg(lb: number): string {
  if (!lb) return "—";
  return `${lb.toFixed(1)} lb · ${lbToKg(lb)} kg`;
}

export function assertCleanBank(): void {
  for (const plan of Object.values(MEAL_PLANS)) {
    for (const slot of MEAL_SLOTS) {
      for (const meal of plan.slots[slot]) {
        if (!meal.sugarFree || !meal.flourFree) {
          throw new Error(`Receta sucia: ${meal.id}`);
        }
      }
    }
  }
}
