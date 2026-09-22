# Vanina Coria — Programadora Full Stack

Portfolio personal con HTML5, CSS3, JavaScript y Bootstrap 5. Conserva la entrada animada con `</>`, el fondo de partículas, las tarjetas de proyectos y el diseño responsive.

## Ejecutar localmente

Desde esta carpeta, ejecutar `python -m http.server 8000` y abrir <http://localhost:8000>.
También se puede usar Live Server. Bootstrap, los iconos y las fuentes requieren conexión a Internet porque se cargan desde CDN.

## Archivos

- `index.html`: contenido, contacto y tarjetas. El modal reutiliza el contenido de cada tarjeta.
- `styles.css`: identidad visual, adaptación a pantallas pequeñas, foco de teclado y movimiento reducido.
- `script.js`: entrada, partículas, filtros, modal, navegación y copia del correo.
- `image/`: imágenes originales, conservadas.
- `qa-check.mjs`: comprobación de desplazamiento para un navegador controlado externamente.
- `REVISION.md`: evidencias de contenido y datos pendientes de completar.

## Revisión visual

Probar en 320, 375, 768 y 1440 píxeles: menú móvil, tarjetas, filtros, modal, contacto y navegación por teclado. Activar la preferencia de movimiento reducido del sistema para comprobar la alternativa sin animación.

Esta revisión se mantiene local hasta que Vanina confirme los cambios. No requiere compilación ni nuevas dependencias de producción.
