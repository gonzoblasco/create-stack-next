// Setup global para Vitest
// Acá podés agregar mocks, polyfills, o configuración que aplique a todos los tests.

import { afterEach } from 'vitest'

// Si en el futuro agregás @testing-library/react, descomentar:
// import { cleanup } from '@testing-library/react'
// afterEach(() => {
//   cleanup()
// })

// Silenciar warning de "no tests found" si se corre un setup solo
afterEach(() => {
  // Placeholder para futuros hooks
})
