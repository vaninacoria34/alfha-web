# Revisión del portfolio

## Fuentes del contenido

Se revisaron las copias locales de los proyectos vecinos, sin modificarlas. La presencia de una función en código no implica que esté desplegada o que un servicio externo esté configurado en producción.

| Proyecto | Evidencia consultada | Contenido respaldado |
| --- | --- | --- |
| Sanbauben | `../Sanbauben-app/README.md`, `package.json`, `vite.config.js`, `src/main.jsx`, `src/pages/Productos.jsx`, `Checkout.jsx`, `admin.jsx`, `src/context/` | React, Vite, JavaScript, CSS, Bootstrap, Firebase/Firestore, catálogo, búsqueda, carrito, pedidos por WhatsApp, autenticación, administración y PWA. El README identifica a Vanina como autora. |
| Bella Imagen | `../BELLA-IMAGEN/bella-imagen/package.json`, `src/main.jsx`, `src/pages/Home.jsx`, `src/components/Checkout.jsx`, `src/context/`, `src/admin/services/productService.js`, `firebaseRepository.js`, `shippingService.js`, `paymentMethodService.js` | React, Vite, Bootstrap, Firebase/Firestore, catálogo, categorías, carrito, checkout, opciones de envío/pago y administración. La selección de un medio de pago no se presenta como una pasarela de cobro implementada. Firebase depende de configuración; algunos servicios tienen almacenamiento local. |
| La Llave del Camino | `../PaginaWeb-LaLlaveDelCamino/README.md`, `packages/frontend/src/index.html`, `js/script.js`, `css/` | Sitio institucional de ONG, trabajo en equipo con Vanina entre sus integrantes, proyectos, talleres, actividades, voluntariado y control de contraste. El README declara «En desarrollo». El HTML utiliza Bootstrap Icons; no se afirma que utilice el framework Bootstrap ni un backend por la sola descripción de carpetas. |
| ALFHA | Historial y código de este repositorio | HTML5, CSS3, JavaScript y Bootstrap; presentación, navegación responsive, filtros, modal, animaciones y contacto. Se presenta como evolución del proyecto propio, sin restaurar cotizador ni precios. |

Los datos de CILSA (Programadora Full Stack, 2024), Maximiliano Bauza (orientador vocacional) y la práctica de desarrollo web/accesibilidad en ADER Santa Fe provienen del pedido de Vanina. No se agregan fechas ni responsabilidades adicionales.

No se incorporan Node.js, Express ni SQLite como conocimientos demostrados: no hay evidencia suficiente en los proyectos revisados. El uso de Node para ejecutar herramientas no demuestra desarrollo de un backend. Vercel se incluye entre las herramientas por la configuración `../BELLA-IMAGEN/bella-imagen/vercel.json` y su registro en el historial; no se afirma un estado de despliegue actual.

## Información por completar

- ADER Santa Fe: tareas concretas, modalidad y fechas, si se desean mostrar. Actualmente solo se expresa la práctica que Vanina confirmó.
- La Llave del Camino: contribuciones individuales. Actualmente se expresa participación en el equipo; no autoría exclusiva.
- LinkedIn: el enlace existente es `https://www.linkedin.com`, no un perfil personal. Se conserva sin inventar una URL y se identifica como sitio general en su nombre accesible.
- Confirmar si se desea precisar el alcance individual del trabajo en Bella Imagen. Su inclusión entre los proyectos propios proviene del pedido; las funcionalidades se verificaron en código.

## Contacto

Se conservan el correo y todos los enlaces de WhatsApp originales. Se añade un enlace `mailto:` al mismo correo y se corrige la respuesta del botón de copia. GitHub pasa de la página genérica al perfil `vaninacoria34`, verificado mediante el remoto existente. Las comprobaciones no envían mensajes ni validan la titularidad o disponibilidad de la cuenta de WhatsApp.

## Verificación realizada

- Chromium: 320, 375, 768 y 1440 px, sin desbordes horizontales, imágenes rotas ni destinos internos inexistentes.
- Consola sin errores y sin solicitudes de recursos fallidas durante la pasada final.
- Menú móvil, cierre al navegar, filtros (incluidos clics rápidos), cuatro modales y cierre con Escape comprobados.
- Copiado del correo comprobado tanto con éxito real en el portapapeles como con permiso denegado.
- Enlace de salto al contenido y foco visible probados con teclado.
- Movimiento reducido: partículas ocultas y animaciones desactivadas; sin JavaScript, la entrada no bloquea el contenido.
- URLs de WhatsApp y su texto comprobados sin enviar mensajes. Se conserva el número original.
- Sintaxis de JavaScript y `git diff --check` correctos. Imágenes originales sin modificaciones.
- La herramienta de navegador y sus capturas se guardaron temporalmente fuera del repositorio; no se añadieron dependencias al sitio.

No se ejecutaron commit, push ni deploy en esta revisión.
- Comprobación adicional de carga lenta: el contenido permanece visible aunque la animación de aparición aún no se haya activado, en los cuatro anchos. Se mantiene la animación al entrar en pantalla y se revisaron capturas finales de escritorio y Sobre mí.
