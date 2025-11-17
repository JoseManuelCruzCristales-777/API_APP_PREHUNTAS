import mongoose from "mongoose";
import dotenv from "dotenv";
import Subject from "./models/Subject";
import Topic from "./models/Topic";
import Subtopic from "./models/Subtopic";
import User from "./models/User";
import bcrypt from 'bcrypt'

dotenv.config();

const MONGO_URI = process.env.DATABASE_URL!;

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpieza previa
    await Subject.deleteMany({});
    await Topic.deleteMany({});
    await Subtopic.deleteMany({});
    await User.deleteMany({})
    console.log("🧹 Colecciones limpiadas");

    /*
     * =====================================
     * FUNDAMENTOS DE PROGRAMACIÓN EN JAVASCRIPT
     * =====================================
     */

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash('1234', salt);

    const admin = new User({
      email: "admin@system.com",
      username: "Admin",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

// ===== SEMILLA: FUNDAMENTOS DE PROGRAMACIÓN EN JAVA =====

const fundamentos = await Subject.create({
  name: "Fundamentos de Programación en Java",
  description:
    "Aprende los principios básicos de la programación estructurada y el diseño algorítmico aplicados con el lenguaje Java.",
});

// Subtemas que no requieren ejercicios prácticos
const nonExerciseSubtopics = [
  "Conceptos básicos",
  "Representación de algoritmos: gráfica y pseudocódigo",
  "Traducción de un programa: compilación, enlace, ejecución y errores",
  "Características del lenguaje de programación",
];

// TEMAS Y SUBTEMAS (según temario oficial)
const temasFundamentos = [
  {
    title: "Diseño Algorítmico",
    subtopics: [
      "Conceptos básicos",
      "Representación de algoritmos: gráfica y pseudocódigo",
      "Diseño de algoritmos",
      "Diseño de funciones",
    ],
  },
  {
    title: "Introducción a la Programación",
    subtopics: [
      "Conceptos básicos",
      "Características del lenguaje de programación",
      "Estructura básica de un programa",
      "Elementos del lenguaje: tipos de datos, literales, constantes, variables, identificadores, parámetros, operadores y salida de datos",
      "Traducción de un programa: compilación, enlace, ejecución y errores",
    ],
  },
  {
    title: "Control de Flujo",
    subtopics: [
      "Estructuras secuenciales",
      "Estructuras selectivas: simple, doble y múltiple",
      "Estructuras iterativas: repetir, mientras, hasta, desde",
    ],
  },
  {
    title: "Organización de Datos",
    subtopics: [
      "Arreglos",
      "Unidimensionales: conceptos básicos, operaciones y aplicaciones",
      "Multidimensionales: conceptos básicos, operaciones y aplicaciones",
      "Estructuras o registros",
    ],
  },
  {
    title: "Modularidad",
    subtopics: [
      "Declaración y uso de módulos",
      "Paso de parámetros o argumentos",
      "Implementación",
    ],
  },
];

// CONTENIDOS Y EJEMPLOS DE SUBTEMAS
const subtopicContents1 = {
  // --- Diseño Algorítmico ---
  "Conceptos básicos": {
    content: `
Un **algoritmo** es un conjunto finito y ordenado de pasos que permiten resolver un problema o realizar una tarea.  
Debe ser **preciso**, **finito** y **definido**.

En programación, los algoritmos son la base para desarrollar programas.  
Se pueden representar mediante **diagramas de flujo**, **pseudocódigo** o directamente en un lenguaje como Java.
    `,
    examples: [
      `// Ejemplo: algoritmo para determinar si un número es par o impar
int numero = 6;
if (numero % 2 == 0) {
    System.out.println("El número es par");
} else {
    System.out.println("El número es impar");
}`,
    ],
  },

  "Representación de algoritmos: gráfica y pseudocódigo": {
    content: `
La representación gráfica de un algoritmo se realiza mediante **diagramas de flujo**, donde cada símbolo representa una acción o decisión.

El **pseudocódigo**, en cambio, describe los pasos usando lenguaje natural estructurado.

Ambos ayudan a comprender la lógica antes de escribir código real en Java.
    `,
    examples: [
      `// Pseudocódigo:
INICIO
  LEER numero
  SI numero MOD 2 = 0 ENTONCES
    ESCRIBIR "Par"
  SINO
    ESCRIBIR "Impar"
FIN`,
    ],
  },

  "Diseño de algoritmos": {
    content: `
El diseño de un algoritmo implica **identificar entradas, procesos y salidas**.  
Un buen algoritmo debe ser eficiente, claro y escalable.

El proceso incluye:
1. Comprender el problema.
2. Definir datos de entrada y salida.
3. Elaborar los pasos necesarios.
4. Validar la solución con ejemplos.
    `,
    examples: [
      `// Algoritmo para calcular el área de un triángulo
double base = 5.0;
double altura = 3.0;
double area = (base * altura) / 2;
System.out.println("Área del triángulo: " + area);`,
    ],
  },

  "Diseño de funciones": {
    content: `
Las **funciones** (en Java llamadas **métodos**) permiten dividir un programa en partes más pequeñas y reutilizables.  
Cada función debe realizar una única tarea bien definida.
    `,
    examples: [
      `public static int sumar(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    System.out.println("Suma: " + sumar(5, 3));
}`,
    ],
  },

  // --- Introducción a la Programación ---
  "Estructura básica de un programa": {
    content: `
En Java, todo programa se organiza dentro de **clases** y métodos.  
El método principal es \`main\`, donde inicia la ejecución.
    `,
    examples: [
      `public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("¡Hola, mundo!");
    }
}`,
    ],
  },

  "Elementos del lenguaje: tipos de datos, literales, constantes, variables, identificadores, parámetros, operadores y salida de datos": {
    content: `
Java es un lenguaje **fuertemente tipado**, lo que significa que cada variable debe tener un tipo definido.

Ejemplos de tipos de datos:
- int, double, boolean, char, String

Los operadores permiten realizar cálculos y comparaciones, y la salida se realiza con \`System.out.println()\`.
    `,
    examples: [
      `int edad = 20;
double precio = 99.99;
boolean activo = true;
char letra = 'A';
String nombre = "Java";

System.out.println("Nombre: " + nombre + ", Edad: " + edad);`,
    ],
  },

  "Traducción de un programa: compilación, enlace, ejecución y errores": {
    content: `
El proceso de ejecución en Java incluye:

1. **Compilación:** el código fuente (.java) se convierte en bytecode (.class) mediante el compilador javac.
2. **Ejecución:** la Máquina Virtual de Java (JVM) interpreta el bytecode.
3. **Errores:** pueden ser de compilación, de tiempo de ejecución o lógicos.
    `,
    examples: [
      `// Compilación:
javac HolaMundo.java

// Ejecución:
java HolaMundo`,
    ],
  },

  // --- Control de Flujo ---
  "Estructuras secuenciales": {
    content: `
Una estructura secuencial ejecuta las instrucciones en el orden en que se escriben, de arriba hacia abajo.
    `,
    examples: [
      `int a = 5;
int b = 10;
int suma = a + b;
System.out.println("Resultado: " + suma);`,
    ],
  },

  "Estructuras selectivas: simple, doble y múltiple": {
    content: `
Permiten tomar decisiones según una condición lógica:
- **Simple:** if
- **Doble:** if-else
- **Múltiple:** switch
    `,
    examples: [
      `int edad = 18;
if (edad >= 18) {
    System.out.println("Mayor de edad");
} else {
    System.out.println("Menor de edad");
}

int dia = 3;
switch (dia) {
    case 1: System.out.println("Lunes"); break;
    case 2: System.out.println("Martes"); break;
    default: System.out.println("Otro día");
}`,
    ],
  },

  "Estructuras iterativas: repetir, mientras, hasta, desde": {
    content: `
Las estructuras iterativas permiten repetir instrucciones:
- **while**: mientras se cumpla una condición.
- **do-while**: al menos una vez.
- **for**: número conocido de repeticiones.
    `,
    examples: [
      `for (int i = 1; i <= 5; i++) {
    System.out.println("Iteración " + i);
}

int j = 1;
while (j <= 3) {
    System.out.println("Contador: " + j);
    j++;
}`,
    ],
  },

  // --- Organización de Datos ---
  "Arreglos": {
    content: `
Un **arreglo** almacena múltiples valores del mismo tipo en una sola variable.  
Su tamaño es fijo y los elementos se acceden por índice.
    `,
    examples: [
      `int[] numeros = {1, 2, 3, 4, 5};
System.out.println(numeros[2]); // 3`,
    ],
  },

  "Multidimensionales: conceptos básicos, operaciones y aplicaciones": {
    content: `
Los **arreglos multidimensionales** permiten almacenar datos en más de una dimensión, como matrices.
    `,
    examples: [
      `int[][] matriz = {
    {1, 2},
    {3, 4}
};
System.out.println(matriz[1][0]); // 3`,
    ],
  },

  "Estructuras o registros": {
    content: `
En Java, las estructuras de datos más complejas se representan mediante **clases** o **objetos**, que agrupan atributos y métodos.
    `,
    examples: [
      `class Persona {
    String nombre;
    int edad;
}

Persona p = new Persona();
p.nombre = "Luis";
p.edad = 25;
System.out.println(p.nombre + " tiene " + p.edad + " años.");`,
    ],
  },

  // --- Modularidad ---
  "Declaración y uso de módulos": {
    content: `
La **modularidad** permite dividir un programa en partes más pequeñas (métodos o clases) para mejorar su organización y mantenimiento.
    `,
    examples: [
      `public static void saludar() {
    System.out.println("Hola desde un módulo");
}`,
    ],
  },

  "Paso de parámetros o argumentos": {
    content: `
Los métodos pueden recibir valores llamados **parámetros**, y devolver resultados mediante \`return\`.
    `,
    examples: [
      `public static int cuadrado(int x) {
    return x * x;
}

System.out.println(cuadrado(4)); // 16`,
    ],
  },
};

// Crear temas y subtemas en base de datos
for (const t of temasFundamentos) {
  const topic = await Topic.create({
    subject: fundamentos._id,
    title: t.title,
    description: `Tema del curso ${fundamentos.name}: ${t.title}`,
  });

  for (const s of t.subtopics) {
    const data = subtopicContents1[s] || {
      content: "Contenido pendiente de redacción.",
      examples: [],
    };

    await Subtopic.create({
      topic: topic._id,
      title: s,
      ...data,
      requiresExercise: !nonExerciseSubtopics.includes(s),
    });
  }
}



/*
 * =====================================
 * PROGRAMACIÓN ORIENTADA A OBJETOS
 * =====================================
 */
const poo = await Subject.create({
  name: "Programación Orientada a Objetos",
  description:
    "Estudia los fundamentos del paradigma orientado a objetos: clases, herencia, polimorfismo, encapsulamiento, abstracción, excepciones y manejo de archivos.",
});

const temasPOO = [
  {
    title: "Introducción al paradigma de la programación orientada a objetos",
    subtopics: [
      "Elementos del modelo de objetos: clases, objetos, abstracción, modularidad, encapsulamiento, herencia y polimorfismo",
      "Lenguaje de modelado unificado: diagrama de clases",
    ],
  },
  {
    title: "Clases y objetos",
    subtopics: [
      "Declaración de clases: atributos, métodos y encapsulamiento",
      "Instanciación de una clase",
      "Referencia al objeto actual",
      "Métodos: declaración, paso de parámetros, retorno de valores",
      "Constructores y destructores: declaración, uso y aplicaciones",
      "Sobrecarga de métodos",
      "Sobrecarga de operadores: concepto y utilidad, operadores unarios y binarios",
    ],
  },
  {
    title: "Herencia",
    subtopics: [
      "Definición: clase base y clase derivada",
      "Clasificación: herencia simple y herencia múltiple",
      "Reutilización de miembros heredados",
      "Referencia al objeto de la clase base",
      "Constructores y destructores en clases derivadas",
      "Redefinición de métodos en clases derivadas",
    ],
  },
  {
    title: "Polimorfismo",
    subtopics: [
      "Definición",
      "Clases abstractas: definición, métodos abstractos, implementación y modelado",
      "Interfaces: definición, implementación y herencia de interfaces",
      "Variables polimórficas (plantillas): definición, uso y aplicaciones",
      "Reutilización de código",
    ],
  },
  {
    title: "Excepciones",
    subtopics: [
      "Definición",
      "Tipos de excepciones",
      "Propagación de excepciones",
      "Gestión de excepciones: manejo y lanzamiento de excepciones",
      "Creación y manejo de excepciones definidas por el usuario",
    ],
  },
  {
    title: "Flujos y archivos",
    subtopics: [
      "Definición",
      "Clasificación: archivos de texto y binarios",
      "Operaciones básicas y tipos de acceso",
      "Manejo de objetos persistentes",
    ],
  },
];

// =====================================
// CONTENIDO DE LOS SUBTEMAS
// =====================================
const subtopicContents = {
  // Introducción
  "Elementos del modelo de objetos: clases, objetos, abstracción, modularidad, encapsulamiento, herencia y polimorfismo": {
    content: `
La **Programación Orientada a Objetos (POO)** se basa en organizar el código mediante **clases y objetos**, donde una clase define las características y comportamientos, y los objetos son sus instancias.

**Elementos principales:**
- **Clase:** Plantilla que define atributos y métodos.
- **Objeto:** Instancia concreta de una clase.
- **Abstracción:** Representar solo lo esencial.
- **Encapsulamiento:** Ocultar los detalles internos.
- **Herencia:** Reutilizar código de una clase base.
- **Polimorfismo:** Permitir diferentes comportamientos con la misma interfaz.
    `,
    examples: [
      `class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    console.log("Hola, soy " + this.nombre);
  }
}

const p = new Persona("Ana");
p.saludar();`,
    ],
  },

  "Lenguaje de modelado unificado: diagrama de clases": {
    content: `
El **UML (Lenguaje de Modelado Unificado)** se usa para representar visualmente sistemas orientados a objetos.

El **diagrama de clases** muestra las clases, sus atributos, métodos y las relaciones entre ellas: herencia, asociación y composición.

Ejemplo (notación textual UML):

\`\`\`
+------------------+
|     Persona      |
+------------------+
| - nombre: string |
| - edad: int      |
+------------------+
| + saludar()      |
+------------------+
\`\`\`
    `,
    examples: [],
  },

  // Clases y objetos
  "Declaración de clases: atributos, métodos y encapsulamiento": {
    content: `
Las **clases** agrupan datos (atributos) y comportamientos (métodos).  
El **encapsulamiento** protege los datos usando propiedades privadas o controladas por getters y setters.
    `,
    examples: [
      `class Rectangulo {
  #base;
  #altura;

  constructor(base, altura) {
    this.#base = base;
    this.#altura = altura;
  }

  get area() {
    return this.#base * this.#altura;
  }
}

const figura = new Rectangulo(5, 3);
console.log(figura.area);`,
    ],
  },

  "Instanciación de una clase": {
    content: `
**Instanciar** es crear un objeto a partir de una clase.  
Cada instancia tiene sus propios valores de atributos.
    `,
    examples: [
      `class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

const p1 = new Producto("Laptop", 1200);
const p2 = new Producto("Mouse", 25);`,
    ],
  },

  "Referencia al objeto actual": {
    content: `
La palabra clave **this** se refiere al objeto actual dentro de su contexto.  
Permite acceder a atributos y métodos de la misma instancia.
    `,
    examples: [
      `class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    console.log("Hola, soy " + this.nombre);
  }
}`,
    ],
  },

  "Métodos: declaración, paso de parámetros, retorno de valores": {
    content: `
Los **métodos** son funciones dentro de las clases.  
Pueden recibir parámetros y retornar valores.
    `,
    examples: [
      `class Calculadora {
  sumar(a, b) {
    return a + b;
  }
}

const calc = new Calculadora();
console.log(calc.sumar(3, 5)); // 8`,
    ],
  },

  "Constructores y destructores: declaración, uso y aplicaciones": {
    content: `
El **constructor** inicializa los atributos de un objeto.  
JavaScript no tiene destructores explícitos, pero se puede usar lógica de limpieza con métodos personalizados.
    `,
    examples: [
      `class Archivo {
  constructor(nombre) {
    this.nombre = nombre;
    console.log("Archivo creado:", nombre);
  }

  cerrar() {
    console.log("Archivo cerrado:", this.nombre);
  }
}

const a = new Archivo("datos.txt");
a.cerrar();`,
    ],
  },

  "Sobrecarga de métodos": {
    content: `
JavaScript no permite sobrecarga real, pero se puede simular validando el número de argumentos o sus tipos.
    `,
    examples: [
      `class Operaciones {
  sumar(a, b, c) {
    if (c !== undefined) return a + b + c;
    return a + b;
  }
}

const op = new Operaciones();
console.log(op.sumar(2, 3)); // 5
console.log(op.sumar(1, 2, 3)); // 6`,
    ],
  },

  "Sobrecarga de operadores: concepto y utilidad, operadores unarios y binarios": {
    content: `
La **sobrecarga de operadores** no está disponible directamente en JavaScript, pero puede simularse mediante métodos especiales o funciones.
    `,
    examples: [
      `class Numero {
  constructor(valor) {
    this.valor = valor;
  }

  sumar(otro) {
    return new Numero(this.valor + otro.valor);
  }
}

const n1 = new Numero(5);
const n2 = new Numero(3);
console.log(n1.sumar(n2).valor); // 8`,
    ],
  },

  // Herencia
  "Definición: clase base y clase derivada": {
    content: `
La **herencia** permite que una clase (derivada) adquiera atributos y métodos de otra (base).  
Se usa la palabra clave **extends**.
    `,
    examples: [
      `class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log("Sonido genérico");
  }
}

class Perro extends Animal {
  hablar() {
    console.log("Guau!");
  }
}

const p = new Perro("Rex");
p.hablar();`,
    ],
  },

  "Clasificación: herencia simple y herencia múltiple": {
    content: `
JavaScript solo admite **herencia simple**, pero puede simular herencia múltiple mediante **mixins**.
    `,
    examples: [
      `const Volador = (Base) =>
  class extends Base {
    volar() {
      console.log("Volando...");
    }
  };

class Animal {}
class Pajaro extends Volador(Animal) {}

new Pajaro().volar();`,
    ],
  },

  "Reutilización de miembros heredados": {
    content: `
Las clases hijas heredan métodos y propiedades de las clases base, los cuales pueden reutilizar o sobrescribir.
    `,
    examples: [
      `class Vehiculo {
  arrancar() {
    console.log("Vehículo encendido");
  }
}

class Coche extends Vehiculo {}

new Coche().arrancar();`,
    ],
  },

  "Referencia al objeto de la clase base": {
    content: `
La palabra clave **super** permite llamar métodos del padre desde una clase hija.
    `,
    examples: [
      `class Animal {
  hablar() {
    console.log("Sonido genérico");
  }
}

class Gato extends Animal {
  hablar() {
    super.hablar();
    console.log("Miau");
  }
}

new Gato().hablar();`,
    ],
  },

  "Constructores y destructores en clases derivadas": {
    content: `
En clases derivadas, el **constructor** debe llamar a **super()** antes de usar **this**.  
JavaScript no tiene destructores, pero se pueden definir métodos de limpieza.
    `,
    examples: [
      `class Base {
  constructor() {
    console.log("Base creada");
  }
}

class Hija extends Base {
  constructor() {
    super();
    console.log("Hija creada");
  }
}

new Hija();`,
    ],
  },

  "Redefinición de métodos en clases derivadas": {
    content: `
La **redefinición** (override) ocurre cuando una clase hija implementa un método con el mismo nombre que uno del padre.
    `,
    examples: [
      `class Figura {
  area() {
    return 0;
  }
}

class Cuadrado extends Figura {
  constructor(lado) {
    super();
    this.lado = lado;
  }

  area() {
    return this.lado ** 2;
  }
}

console.log(new Cuadrado(4).area());`,
    ],
  },

  // Polimorfismo
  "Definición": {
    content: `
El **polimorfismo** permite que distintos objetos respondan de manera diferente al mismo mensaje o método.
    `,
    examples: [
      `const figuras = [
  { area: () => 10 },
  { area: () => 20 },
];

for (const f of figuras) console.log(f.area());`,
    ],
  },

  "Clases abstractas: definición, métodos abstractos, implementación y modelado": {
    content: `
JavaScript no tiene clases abstractas nativas, pero se pueden simular lanzando errores si se intenta instanciar una clase base.
    `,
    examples: [
      `class Figura {
  constructor() {
    if (new.target === Figura)
      throw new Error("Clase abstracta no instanciable");
  }

  area() {
    throw new Error("Método abstracto");
  }
}`,
    ],
  },

  "Interfaces: definición, implementación y herencia de interfaces": {
    content: `
JavaScript no tiene interfaces nativas (sí en TypeScript), pero pueden simularse usando comentarios o comprobaciones.
    `,
    examples: [
      `// "Interface" simulada
class Imprimible {
  imprimir() {
    throw new Error("Debe implementar imprimir()");
  }
}

class Factura extends Imprimible {
  imprimir() {
    console.log("Factura impresa");
  }
}`,
    ],
  },

  "Variables polimórficas (plantillas): definición, uso y aplicaciones": {
    content: `
Las variables polimórficas pueden referirse a objetos de distintas clases con una misma interfaz.  
En JavaScript esto se logra dinámicamente.
    `,
    examples: [
      `const animales = [
  { hablar: () => console.log("Guau!") },
  { hablar: () => console.log("Miau!") },
];

animales.forEach((a) => a.hablar());`,
    ],
  },

  "Reutilización de código": {
    content: `
El polimorfismo y la herencia fomentan la reutilización de código, reduciendo la duplicación y mejorando el mantenimiento.
    `,
    examples: [],
  },
};

for (const t of temasPOO) {
  const topic = await Topic.create({
    subject: poo._id,
    title: t.title,
    description: `Tema del curso ${poo.name}: ${t.title}`,
  });

  for (const s of t.subtopics) {
    const data = subtopicContents[s] || {
      content: "Contenido pendiente de redacción.",
      examples: [],
    };
    await Subtopic.create({
      topic: topic._id,
      title: s,
      ...data,
      requiresExercise: false,
    });
  }
}



    console.log("✅ Seed completado exitosamente");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    process.exit(1);
  }
}

seedData();
