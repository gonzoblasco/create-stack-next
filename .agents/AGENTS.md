# Workspace Rules para create-stack-next

## Regla de Publicación en NPM (Field "files")
**CRÍTICO:** Cada vez que se agregue un nuevo directorio al root del proyecto que forme parte del código final generado por el scaffolder (como `template/`, `template-api/`, etc.), el agente **DEBE** asegurarse de agregarlo inmediatamente al array `"files"` del `package.json` principal del repositorio. 

### Razón
Si no se hace esto, NPM ignorará la nueva carpeta al hacer `npm publish`, y los usuarios descargarán un paquete roto al cual le faltan templates. 

### Ejemplo
Si creás `template-astro/`, debes actualizar `package.json` así:
```json
"files": ["dist", "template", "template-api", "template-astro"]
```
