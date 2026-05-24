# ALFHA Soluciones Digitales

Startup landing de estilo moderno con **fondo espacial**, **preloader con cohete** y secciones con estética **glassmorphism**.

---

## Descripción
ALFHA Soluciones Digitales es una landing pensada para portfolio y presentación de servicios: diseño web, sistemas y modernización. La interfaz combina una grilla responsive con **Bootstrap 5**, animaciones 100% CSS y un estilo premium tipo startup.

---

## Tecnologías usadas
- **HTML5**
- **CSS3**
- **Bootstrap 5** (CDN)
- **Google Fonts (Poppins)**

---

## Características principales
- **Hero section** con CTA y animación flotante de imagen.
- **Fondo espacial**: gradiente animado + estrellas (radial-gradient) + halos glow.
- **Preloader de cohete**: overlay fijo que se desvanece con animaciones CSS.
- **Glassmorphism**: tarjetas, navbar y bloques con blur y fondos semitransparentes.
- **Cards y botones** con hover (lift + sombra).
- **Navegación** con anchors y menú colapsable en mobile.

---

## Diseño responsive
El sitio se adapta combinando:
- **Bootstrap grid**: `container`, `row`, `col-lg-6`, `col-md-4`, etc.
- **Media queries CSS** en `styles.css`:
  - `max-width: 992px`: ajusta padding/centrado en el hero.
  - `max-width: 768px`: reduce tipografía del título.
  - `max-width: 480px`: apila botones CTAs en una sola columna.

---

## Animaciones
Todas las animaciones están implementadas en CSS mediante `@keyframes`:
- `bgShift`: movimiento del gradiente de fondo.
- `starsMove`: desplazamiento vertical de estrellas.
- `rocketLaunch`: despega el cohete (transform translateY).
- `loaderFade`: oculta el preloader (opacity + visibility).
- `heroFloat`: flotación suave de la imagen del hero.

---

## Instrucciones para ejecutar
1. Abrí `index.html` en tu navegador.
2. Si querés probar con un servidor local (recomendado para mantener la misma estructura), podés usar cualquier herramienta tipo *Live Server*.

---

## Subir cambios a GitHub
Desde la carpeta del proyecto:

```bash
git status
git add .
git commit -m "docs: update landing comments and add modern README"
git push
```

---

## Créditos
- **Autora:** Vanina Coria
- **Empresa:** ALFHA Soluciones Digitales

---

## Licencia
Proyecto educativo/demostración. Ajustá el contenido según tus necesidades.
