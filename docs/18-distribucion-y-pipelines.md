# 18 · Distribución multiplataforma y automatización (pipelines)

> **Estado: idea, no decidida.** Este documento recoge la intención de distribuir la aplicación
> en **web, Android, iPhone y escritorio Windows**, y de automatizar pruebas y publicación. La
> tecnología de empaquetado **queda por decidir**; aquí se dejan las opciones y sus costos para
> resolverlas cuando exista la aplicación. Hoy la decisión vigente sigue siendo la PWA
> ([ADR-016](adr/ADR-016-flutter-web-pwa.md)); las apps empaquetadas amplían la **idea 30** del
> [roadmap](14-roadmap-e-ideas.md).

---

## 1. Qué se quiere

| Objetivo | Detalle |
|---|---|
| Pipeline de **pruebas** | Que cada cambio se valide solo: formato, tipos, pruebas y build |
| Pipeline de **descarga de versiones** | Generar los instalables de cada plataforma de forma automática |
| Plataformas | **Web**, **Android**, **iPhone (iOS)**, **escritorio Windows** |

---

## 2. Punto de partida

Hoy el producto es una **PWA** construida con Flutter Web (un solo código que se instala desde el
navegador, [ADR-016](adr/ADR-016-flutter-web-pwa.md)). Eso ya cubre «web» y da una instalación
básica en Android, iOS y Windows **sin** tiendas de aplicaciones. Empaquetarla como app nativa
por plataforma es un **salto de alcance** que se documenta aquí como idea, no como compromiso.

---

## 3. Integración continua — el pipeline de pruebas

Sobre GitHub Actions (el repositorio ya vive en GitHub). Se dispara en cada *push* y *pull request*:

| Etapa | Qué hace | Bloquea la fusión si… |
|---|---|---|
| Instalar | Dependencias con caché (`dart pub get`) | — |
| Formato | `dart format --set-exit-if-changed` | El código no está formateado |
| Análisis estático | `dart analyze --fatal-infos` en los dos proyectos | Hay un aviso sin resolver |
| Pruebas unitarias | `dart test` y `flutter test` (dominio financiero, [`12-pruebas-y-calidad.md`](12-pruebas-y-calidad.md)) | Falla una prueba |
| Build | `flutter build web` y compilación de `prisma_api` | No compila |

Este pipeline **se puede crear en cuanto existan los dos `pubspec.yaml`**, incluso antes de tener
apps nativas. Es la primera automatización recomendada.

> **La versión definitiva de este pipeline vive en
> [`19-ambientes-y-entrega.md`](19-ambientes-y-entrega.md) §6.** Allí está lo que aquí no cabe:
> lo que corre en cada empuje, lo que corre en cada promoción contra una base real y las dos
> pruebas que no se pueden saltar. Esta tabla es el resumen; si las dos discrepan, manda el 19.

---

## 4. Entrega continua — el pipeline de descargas por plataforma

| Plataforma | Artefacto | Cómo se genera (previsto) | Publicación |
|---|---|---|---|
| **Web / PWA** | Sitio desplegado | `flutter build web` y promoción del artefacto ([`19-ambientes-y-entrega.md`](19-ambientes-y-entrega.md) §2.3) | Por promoción, no por *push* |
| **Android** | `.apk` / `.aab` | Empaquetar la aplicación (ver §5) y compilar con Gradle | Google Play (cuenta de desarrollador) |
| **iPhone (iOS)** | `.ipa` | Empaquetar la aplicación (ver §5) y compilar con Xcode | App Store (cuenta Apple Developer) |
| **Windows** | `.exe` / `.msi` | Empaquetar como app de escritorio (ver §5) | Descarga directa + firma de código |

---

## 5. Opciones de empaquetado (a decidir)

No hay que elegir hoy, pero estas son las candidatas realistas para reutilizar el código Flutter
Web:

| Tecnología | Cubre | A favor | En contra |
|---|---|---|---|
| **PWA sola** | Web + instalación básica en todas | Cero código extra; ya decidida | Sin tiendas; APIs nativas limitadas (sobre todo iOS) |
| **Capacitor** | Android + iOS | Reusa la web tal cual; acceso a cámara, archivos, etc. | Requiere Xcode/Android Studio y cuentas de tienda |
| **Tauri** | Windows (y más) | Instalable **liviano** (~pocos MB); usa el navegador del sistema | Ecosistema más joven; requiere Rust en el pipeline |
| **Electron** | Windows (y más) | Muy conocido y documentado | Instalable **pesado** (~100 MB) y mayor consumo |

Combinación de referencia (sujeta a decisión): **PWA** para web · **Capacitor** para Android/iOS ·
**Tauri** para Windows. Se registrará en un ADR cuando se decida.

> **Esta sección quedó pendiente de revisión por el cambio de stack.** Flutter compila por sí
> mismo a Android, iOS y Windows, así que envolver la web dejó de ser el único camino. La
> comparación de arriba se escribió para una web empaquetada y hay que rehacerla antes de
> decidir; hoy no se decide nada, igual que antes.

---

## 6. Realidades de publicar (costos que hay que nombrar)

| Plataforma | Costo / requisito real |
|---|---|
| Google Play | Cuenta de desarrollador (pago único) + revisión |
| App Store | Cuenta Apple Developer (**pago anual**) + revisión + un Mac para compilar |
| Windows | **Firma de código** (certificado anual) para que no salte la alerta de "editor desconocido" |
| Secretos en CI | Claves de firma y tokens de tienda guardados como *secrets* del repositorio, nunca en el código |

Estos costos son la razón por la que la PWA fue la decisión inicial: **cero tiendas, cero cuotas,
actualización inmediata**. Las apps empaquetadas se justifican solo si aparece una necesidad que
la PWA no cubra.

---

## 7. Matriz resumen

| | Pipeline de pruebas | Pipeline de descarga | Depende de |
|---|:---:|:---:|---|
| Web / PWA | ✅ | ✅ (promoción) | `pubspec.yaml` |
| Android | ✅ | ⬜ | Empaquetado (§5) + cuenta Play |
| iOS | ✅ | ⬜ | Empaquetado (§5) + cuenta Apple + Mac |
| Windows | ✅ | ⬜ | Empaquetado (§5) + firma |

---

## 8. Estado y siguiente paso

- **Decidido hoy:** nada nuevo. La PWA sigue vigente, ahora sobre Flutter Web
  ([ADR-016](adr/ADR-016-flutter-web-pwa.md)).
- **Primer paso barato cuando exista la app:** el pipeline de pruebas del §3.
- **Pendiente de decisión:** la tecnología de empaquetado del §5, que se registrará en un ADR
  propio, y la apertura de cuentas de tienda del §6.

---

### 🧭 Navegación

**⬅️ Anterior:** [17 · Resiliencia, trabajo sin conexión y caché](17-resiliencia-offline-y-cache.md)  ·  **🗂️ [Índice general](INDICE.md)**  ·  **Siguiente ➡️:** [19 · Ambientes, versionado y entrega](19-ambientes-y-entrega.md)
