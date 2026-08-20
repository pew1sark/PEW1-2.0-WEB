# SARK · Kit de transmisión

Una sola plantilla — `sark-stream-kit.html` — con todas las piezas del directo.
No hay que instalar nada: es un archivo HTML suelto que OBS abre como fuente de navegador.

## Cómo empezar

1. Abre `sark-stream-kit.html` en el navegador (doble clic). Verás el **panel de control**
   con todas las piezas, su tamaño recomendado y un botón para copiar la URL de cada una.
2. En OBS: **+ → Fuente de navegador → Archivo local → sark-stream-kit.html**.
3. Pega la URL copiada en el campo de dirección y pon el ancho/alto que indica la tarjeta.
4. Marca **Apagar la fuente cuando no esté visible** y **Actualizar el navegador cuando la
   escena se active**, para que la cuenta atrás y las alertas se reinicien solas.

## Las piezas

| URL | Pieza | Fondo | Tamaño de la fuente |
|---|---|---|---|
| `?p=marco` | Marco de neón + pestaña SARK + EN VIVO + firma | transparente | lienzo completo |
| `?p=cam` | Marco de cámara con la pestaña SARK | transparente | el de tu cámara |
| `?p=titulo` | Título inferior / presentación | transparente | lienzo completo |
| `?p=ticker` | Barra de avisos rotativos | transparente | lienzo completo |
| `?p=chat` | Contenedor de chat | transparente | el de tu panel de chat |
| `?p=alerta` | Alerta de seguidor / suscripción / apoyo / raid | transparente | lienzo completo |
| `?p=intro` | «Comenzamos en» con cuenta regresiva | escena completa | lienzo completo |
| `?p=pausa` | «Ya vuelvo» | escena completa | lienzo completo |
| `?p=fin` | «Gracias por ver» | escena completa | lienzo completo |
| `?p=fondo` | Solo el fondo de marca | escena completa | lienzo completo |

«Lienzo completo» = 1920×1080 en horizontal, 1080×1920 en vertical. La pieza ocupa
todo el lienzo y se coloca sola en su sitio; no hay que moverla ni escalarla en OBS.

## Vertical y horizontal

La misma URL sirve para **1920×1080** y para **1080×1920**. Todo está medido en `vmin`
(el lado corto del lienzo manda), así que las proporciones son idénticas en ambas
orientaciones; en vertical la plantilla además reserva zona segura abajo y reordena
la firma y las redes.

## Personalizar

Todos los textos se cambian por la URL, sin tocar el archivo. La lista completa de
parámetros está en el panel de control; los más usados:

```
?p=marco&t=ART %26 GAMING&sub=Directo de arte
?p=intro&to=21:30
?p=ticker&msg=Encargos abiertos|Nuevo mural|!redes
?p=alerta&k=sub&t=NOMBRE&dur=8
?p=marco&c=FF9800          → recolorea todo el neón
?p=marco&logo=sark-logo.png → usa tu PNG en vez del wordmark dibujado
```

El wordmark SARK va dibujado en SVG dentro del archivo. Si quieres tu logotipo original,
deja el PNG en esta misma carpeta y añade `&logo=<archivo>.png` a cualquier URL.
